<h1> <b>Supplier Analytics Dashboard – Rajaram Solvex Limited 📊 </b></h1>


A <b>real-time Data Science dashboard</b> developed for <b>Rajaram Solvex Limited</b>, a <b>Solvent Extraction Company</b>.<br>
It helps monitor <b>supplier performance</b>, visualize <b>seed quality metrics</b>, and <b>predict oil content</b> using a <b>machine learning model</b>.<br>
<br>
<b>Live App:</b>  
<a href="https://supplier-analytics-dashboard.streamlit.app/" target="_blank">https://supplier-analytics-dashboard.streamlit.app/</a>

<h1>📌 Context</h1>

This dashboard was developed as part of a small-scale consultancy effort to help a local industry digitalize their supplier evaluation process.
The goal was to convert a fully manual workflow into a data-driven dashboard that delivers clarity, insights, and better decision-making.
<hr>
Demo Video:


https://github.com/user-attachments/assets/8cbea16f-3ff3-44ed-9af7-d723a8c43cb5


<h2>🧭 <b>Project Overview</b></h2>
<p>
This <b>Streamlit-based web app</b> provides an interactive and data-driven interface for:
<ul>
<li>📊 <b>Monitoring Supplier Performance</b> – Analyze delivery quantity, oil content, and quality trends.</li>
<li>⚖️ <b>Comparing Suppliers</b> – Evaluate and visualize supplier efficiency using radar charts.</li>
<li>🌱 <b>Seed Quality Analysis</b> – Study correlations between moisture, refraction, and damage with oil yield.</li>
<li>🤖 <b>Oil Content Prediction</b> – Predict expected oil content using a trained Random Forest Regression model.</li>
<li>🧾 <b>Data Upload & Export</b> – Upload seed data (CSV/XLSX) and export filtered analytics.</li>
</ul>
</p>

<hr>

<h2>⚙️ <b>Key Features</b></h2>
<ul>
<li>📈 <b>Dashboard KPIs</b> – Total Deliveries, Unique Suppliers, Total Quantity, Avg Oil %, Avg Damage %</li>
<li>🔍 <b>Filtering</b> – Filter data by date range and supplier</li>
<li>⚖️ <b>Supplier Comparison</b> – Compare two suppliers using radar-like visualizations</li>
<li>🧪 <b>Quality Insights</b> – Explore correlations like Oil Content vs Damage</li>
<li>🤖 <b>Machine Learning Model</b> – Predict oil content using Random Forest</li>
<li>📤 <b>Data Export</b> – Download filtered data as CSV</li>
<li>💾 <b>Model Persistence</b> – Automatically saves and reuses trained model (<code>seed_oil_model.pkl</code>)</li>
</ul>

<hr>

<h2>🧠 <b>Machine Learning Component</b></h2>
<p>
The dashboard integrates a <b>Random Forest Regressor</b> to predict oil content based on:
<ul>
<li>🌾 Moisture (%)</li>
<li>💧 Refraction</li>
<li>🧬 Damage (%)</li>
<li>⚖️ Weigh Quantity</li>
</ul>
The model is trained within the app and saved locally for reuse.
</p>

<hr>

<h2>🚀 <b>Deployment</b></h2>
<p>
🔗 <b>Live App:</b>  
<a href="https://supplier-analytics-dashboard.streamlit.app/" target="_blank">https://supplier-analytics-dashboard.streamlit.app/</a>
</p>

<hr>

<h2>🛠 <b>Tech Stack</b></h2>
<ul>
<li><b>Language:</b> Python</li>
<li><b>Framework:</b> Streamlit</li>
<li><b>Libraries:</b> Pandas, NumPy, Plotly, Scikit-learn, Joblib</li>
<li><b>Model:</b> Random Forest Regressor</li>
<li><b>Deployment:</b> Streamlit Cloud</li>
</ul>

<hr>

<h2><b>👥 Contributors</b></h2><br>

Vedika Sardeshmukh
- Responsible for core code logic
- Managed the overall project planning & structure

Sakshi More
- Handled company search work
- Took care of all external communication tasks

 
