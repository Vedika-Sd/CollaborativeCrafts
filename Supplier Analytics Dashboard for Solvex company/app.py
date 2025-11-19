# streamlit_seed_dashboard_app.py
# Deploy-ready Streamlit app for Seed Quality & Supplier Analytics
# Save this file and run: streamlit run streamlit_seed_dashboard_app.py

"""
Requirements (put in requirements.txt or install manually):
streamlit
pandas
numpy
scikit-learn
joblib
plotly
matplotlib
seaborn
openpyxl

pip install streamlit pandas numpy scikit-learn joblib plotly matplotlib seaborn openpyxl
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import io
import os
from datetime import datetime

MODEL_PATH = "seed_oil_model.pkl"

st.set_page_config(page_title="Supplier Analytics Dashboard", page_icon="📊", layout="wide")

# ------------------------- Utility functions -------------------------
@st.cache_data
def load_data_from_file(uploaded_file):
    try:
        if uploaded_file.name.endswith(".csv"):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)
    except Exception as e:
        st.error(f"Failed to read uploaded file: {e}")
        return None
    return df

@st.cache_data
def load_default_data(path='/mnt/data/SEED1_main_sheet.csv'):
    # fallback path (if the user has pre-uploaded file on the server)
    if os.path.exists(path):
        try:
            return pd.read_csv(path)
        except Exception:
            try:
                return pd.read_excel(path)
            except Exception:
                return None
    return None


def clean_and_prepare(df):
    df = df.copy()
    # Normalize column names
    df.columns = [c.strip() for c in df.columns]
    colmap = {"WEIGH QTY":"WEIGH_QTY", "WEIGH QT":"WEIGH_QTY", "WEIGH_QT":"WEIGH_QTY",
              "GATE DATE":"GATE_DATE", "GATE_DATE":"GATE_DATE", "SUPPLIER":"SUPPLIER",
              "Moisture":"Moisture", "Refraction":"Refraction", "Refreactor":"Refraction",
              "Damage":"Damage", "Oil Content":"Oil_Content", "Oil_Content":"Oil_Content"}
    for k,v in colmap.items():
        if k in df.columns and v not in df.columns:
            df.rename(columns={k:v}, inplace=True)
    # Ensure expected columns exist
    expected = ["GATE_DATE","SUPPLIER","WEIGH_QTY","Moisture","Refraction","Damage","Oil_Content"]
    for c in expected:
        if c not in df.columns:
            df[c] = np.nan
    # Parse dates
    try:
        df['GATE_DATE'] = pd.to_datetime(df['GATE_DATE'], errors='coerce')
    except Exception:
        df['GATE_DATE'] = pd.to_datetime(df['GATE_DATE'], format='%d-%b-%y', errors='coerce')
    # Numeric conversions
    for c in ['WEIGH_QTY','Moisture','Refraction','Damage','Oil_Content']:
        df[c] = pd.to_numeric(df[c], errors='coerce')
    # Create derived fields
    df['YearMonth'] = df['GATE_DATE'].dt.to_period('M').astype(str)
    # Fill minor missing numeric values with column median (but keep NaNs where too many missing)
    for c in ['WEIGH_QTY','Moisture','Refraction','Damage','Oil_Content']:
        if df[c].isna().mean() < 0.5:
            df[c] = df[c].fillna(df[c].median())
    # Clean supplier whitespace
    df['SUPPLIER'] = df['SUPPLIER'].astype(str).str.strip()
    return df


def compute_kpis(df):
    kpis = {}
    kpis['total_deliveries'] = int(df.shape[0])
    kpis['unique_suppliers'] = int(df['SUPPLIER'].nunique())
    kpis['total_quantity'] = float(df['WEIGH_QTY'].sum())
    kpis['avg_oil_content'] = float(df['Oil_Content'].mean())
    kpis['avg_damage'] = float(df['Damage'].mean())
    return kpis


def train_or_load_model(df, force_retrain=False):
    # Train a simple RandomForest regressor to predict Oil_Content from Moisture, Refraction, Damage, WEIGH_QTY
    features = ['Moisture','Refraction','Damage','WEIGH_QTY']
    df_model = df.dropna(subset=features + ['Oil_Content'])
    if df_model.shape[0] < 10:
        return None, None, None
    X = df_model[features]
    y = df_model['Oil_Content']
    if (not force_retrain) and os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            return model, None, None
        except Exception:
            pass
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    # Save
    try:
        joblib.dump(model, MODEL_PATH)
    except Exception:
        pass
    metrics = {'mse':mse, 'r2':r2}
    return model, metrics, features


# ------------------------- App layout -------------------------
st.subheader("RAJARAM SOLVEX LIMITED 🏭 - Solvent Extraction Company")
st.title("📊Supplier Performance & Analytics Dashboard")
st.markdown(
    "Use this dashboard to monitor supplier performance, visualize seed quality metrics, and predict oil content for new lots."
)

# Sidebar: data upload and filters
st.sidebar.header("Data Input & Settings")
uploaded_file = st.sidebar.file_uploader("Upload seed dataset (CSV or XLSX)", type=['csv','xlsx','xls'])
use_sample = False
if uploaded_file is not None:
    raw_df = load_data_from_file(uploaded_file)
else:
    raw_df = load_default_data()
    if raw_df is None:
        st.sidebar.info("No dataset found. Upload a file to proceed.")
        use_sample = True

if use_sample:
    st.warning("🎉 Welcome to Supplier Analytics Dashboard 📊. Please upload your dataset 📂")
    st.stop()

# Clean
df = clean_and_prepare(raw_df)

# Filters
st.sidebar.subheader("Filters")
min_date = df['GATE_DATE'].min()
max_date = df['GATE_DATE'].max()
if pd.isna(min_date):
    min_date = None
if pd.isna(max_date):
    max_date = None

date_range = st.sidebar.date_input("Date range", value=(min_date if min_date else datetime.today(), max_date if max_date else datetime.today()))
selected_suppliers = st.sidebar.multiselect("Suppliers", options=sorted(df['SUPPLIER'].unique()), default=None)

# Apply filters
df_filtered = df.copy()
if isinstance(date_range, tuple) and len(date_range) == 2:
    start, end = date_range
    if start:
        df_filtered = df_filtered[df_filtered['GATE_DATE'] >= pd.to_datetime(start)]
    if end:
        df_filtered = df_filtered[df_filtered['GATE_DATE'] <= pd.to_datetime(end)]
if selected_suppliers:
    df_filtered = df_filtered[df_filtered['SUPPLIER'].isin(selected_suppliers)]

# Compute KPIs
kpis = compute_kpis(df_filtered)

# Top row KPIs
kpi1, kpi2, kpi3, kpi4, kpi5 = st.columns(5)
with kpi1:
    st.metric("Total Deliveries", f"{kpis['total_deliveries']}")
with kpi2:
    st.metric("Unique Suppliers", f"{kpis['unique_suppliers']}")
with kpi3:
    st.metric("Total Quantity", f"{kpis['total_quantity']:.2f}")
with kpi4:
    st.metric("Avg Oil Content", f"{kpis['avg_oil_content']:.2f}%")
with kpi5:
    st.metric("Avg Damage %", f"{kpis['avg_damage']:.2f}%")

# ------------------------- Main Tabs -------------------------
tabs = st.tabs(["Overview","Supplier Comparison","Quality Insights","Model & Prediction","Data & Export"])

# ------------------------- Tab: Overview -------------------------
with tabs[0]:
    st.header("Overview")
    col1, col2 = st.columns([2,3])
    with col1:
        st.subheader("Quantity by Supplier")
        qty_by_supplier = df_filtered.groupby('SUPPLIER', as_index=False)['WEIGH_QTY'].sum().sort_values('WEIGH_QTY', ascending=False)
        fig1 = px.bar(qty_by_supplier, x='SUPPLIER', y='WEIGH_QTY', title='Total Quantity Supplied by Supplier', labels={'WEIGH_QTY':'Total Quantity','SUPPLIER':'Supplier'})
        fig1.update_layout(xaxis_tickangle=-45, height=400)
        st.plotly_chart(fig1, use_container_width=True)
    with col2:
        st.subheader("Average Oil Content by Supplier")
        oil_by_supplier = df_filtered.groupby('SUPPLIER', as_index=False)['Oil_Content'].mean().sort_values('Oil_Content', ascending=False)
        fig2 = px.bar(oil_by_supplier.head(20), x='SUPPLIER', y='Oil_Content', title='Avg Oil Content (Top 20 Suppliers)', labels={'Oil_Content':'Avg Oil Content (%)'})
        fig2.update_layout(xaxis_tickangle=-45, height=400)
        st.plotly_chart(fig2, use_container_width=True)
    st.divider()
    st.subheader("Time Series: Delivery Quantity & Avg Oil Content")
    ts = df_filtered.groupby('GATE_DATE').agg({'WEIGH_QTY':'sum','Oil_Content':'mean'}).reset_index()
    if not ts.empty:
        fig_ts = go.Figure()
        fig_ts.add_trace(go.Bar(x=ts['GATE_DATE'], y=ts['WEIGH_QTY'], name='Quantity'))
        fig_ts.add_trace(go.Line(x=ts['GATE_DATE'], y=ts['Oil_Content'], name='Avg Oil Content', yaxis='y2'))
        fig_ts.update_layout(title='Daily Quantity & Avg Oil Content', xaxis_title='Date', yaxis_title='Quantity', yaxis2=dict(title='Avg Oil Content', overlaying='y', side='right'))
        st.plotly_chart(fig_ts, use_container_width=True)
    else:
        st.info("No time series data available for selected filters.")

# ------------------------- Tab: Supplier Comparison -------------------------
with tabs[1]:
    st.header("Supplier Comparison")
    suppliers = sorted(df['SUPPLIER'].unique())
    s1 = st.selectbox('Select first supplier', suppliers, index=0)
    s2 = st.selectbox('Select second supplier', suppliers, index=1 if len(suppliers)>1 else 0)
    comp_cols = ['WEIGH_QTY','Moisture','Refraction','Damage','Oil_Content']
    comp_df = df_filtered[df_filtered['SUPPLIER'].isin([s1,s2])]
    if comp_df.empty:
        st.info('No data for selected suppliers with current filters.')
    else:
        summary = comp_df.groupby('SUPPLIER')[comp_cols].agg(['count','mean','std']).T
        st.dataframe(summary)
        # Radar-like comparison using normalized scores
        def norm_series(ser):
            return (ser - ser.min()) / (ser.max() - ser.min() + 1e-9)
        metrics = comp_df.groupby('SUPPLIER').agg({'WEIGH_QTY':'sum','Moisture':'mean','Refraction':'mean','Damage':'mean','Oil_Content':'mean'})
        normed = metrics.apply(norm_series)
        fig_radar = go.Figure()
        for sup in normed.index:
            fig_radar.add_trace(go.Scatterpolar(r=normed.loc[sup].values, theta=normed.columns, fill='toself', name=sup))
        fig_radar.update_layout(polar=dict(radialaxis=dict(visible=True)), showlegend=True, title='Normalized Supplier Profile')
        st.plotly_chart(fig_radar, use_container_width=True)

# ------------------------- Tab: Quality Insights -------------------------
with tabs[2]:
    st.header("Quality Insights & Correlations")
    # Scatter: Oil Content vs Damage
    st.subheader("Oil Content vs Damage (color by supplier)")
    if df_filtered.shape[0] > 0:
        fig_scatter = px.scatter(df_filtered, x='Damage', y='Oil_Content', color='SUPPLIER', hover_data=['WEIGH_QTY','GATE_DATE'], title='Oil Content vs Damage')
        st.plotly_chart(fig_scatter, use_container_width=True)

    # Top quality lots
    st.subheader('Top Quality Lots (High Oil Content & Low Damage)')
    top_quality = df_filtered.sort_values(['Oil_Content','Damage'], ascending=[False,True]).head(20)
    st.dataframe(top_quality[['GATE_DATE','VEHICLE NO' if 'VEHICLE NO' in top_quality.columns else 'VEHICLE NO','SUPPLIER','WEIGH_QTY','Moisture','Refraction','Damage','Oil_Content']].rename(columns=lambda x: x.strip()), height=300)

# ------------------------- Tab: Model & Prediction -------------------------
with tabs[3]:
    st.header("Model: Predict Oil Content")
    st.markdown("Train a RandomForest regression model to predict Oil Content from Moisture, Refraction, Damage and Quantity.")
    col_train, col_info = st.columns([2,1])
    with col_info:
        st.write("Model file:")
        st.code(MODEL_PATH)
        if os.path.exists(MODEL_PATH):
            st.success("Model file exists. You can use it to predict.")
        else:
            st.info("Model not trained yet.")
    with col_train:
        if st.button("Train / Retrain Model"):
            with st.spinner('Training model...'):
                model, metrics, features = train_or_load_model(df, force_retrain=True)
                if model is None:
                    st.error('Not enough data to train model (need at least 10 rows with Oil_Content).')
                else:
                    st.success('Model trained and saved.')
                    st.write(metrics)
                    # Feature importance
                    importances = pd.Series(model.feature_importances_, index=features).sort_values(ascending=False)
                    st.subheader('Feature Importances')
                    st.bar_chart(importances)
    st.divider()
    st.subheader('Predict for a new lot')
    with st.form('predict_form'):
        m = st.number_input('Moisture (%)', min_value=0.0, max_value=100.0, value=10.0, step=0.1)
        r = st.number_input('Refraction', min_value=0.0, max_value=100.0, value=2.0, step=0.01)
        d = st.number_input('Damage (%)', min_value=0.0, max_value=100.0, value=2.0, step=0.1)
        q = st.number_input('Weigh Qty', min_value=0.0, value=10.0, step=0.1)
        submitted = st.form_submit_button('Predict Oil Content')
    if submitted:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            x = np.array([[m,r,d,q]])
            pred = model.predict(x)[0]
            st.metric('Predicted Oil Content (%)', f"{pred:.2f}")
            # simple quality class
            if pred >= df['Oil_Content'].quantile(0.75):
                cls = 'Excellent'
            elif pred >= df['Oil_Content'].quantile(0.5):
                cls = 'Good'
            elif pred >= df['Oil_Content'].quantile(0.25):
                cls = 'Fair'
            else:
                cls = 'Poor'
            st.write(f"Quality class (based on dataset quartiles): **{cls}**")
        else:
            st.error('No trained model found. Train the model first.')

# ------------------------- Tab: Data & Export -------------------------
with tabs[4]:
    st.header('Data & Export')
    st.subheader('Filtered Data')
    st.dataframe(df_filtered, use_container_width=True)
    csv = df_filtered.to_csv(index=False).encode('utf-8')
    st.download_button(label='Download filtered data as CSV', data=csv, file_name='seed_filtered.csv', mime='text/csv')

st.sidebar.markdown('---')
st.sidebar.write('Made by Sakshi — Analytics Dashboard')

