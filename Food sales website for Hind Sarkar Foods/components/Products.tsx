import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import popcornImage from 'figma:asset/b6ae9a2a8bc2811ba018706a457fe4fb85930cff.png';
import chikkiImage from 'figma:asset/2f5ccc7ba2cd74c9a74f3a53f9ba231c1db16569.png';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  flavors?: string[];
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'Microwave Popcorn',
      category: 'popcorn',
      description: 'Convenient microwave popcorn in multiple delicious flavors',
      image: popcornImage,
      flavors: ['Butter', 'Cheese', 'Chilli Tomato', 'Cream & Onion']
    },
    {
      id: '2',
      name: 'Peanut Chikki',
      category: 'chikki',
      description: 'Traditional peanut chikki in various exciting flavors',
      image: chikkiImage,
      flavors: ['Peanut Crush', 'Peanut Butter', 'Chocolate', 'Dryfruit Coconut', 'Rajgira', 'Sesame', 'Coconut']
    },
    {
      id: '3',
      name: 'Peanut Butter',
      category: 'spreads',
      description: 'Creamy and crunchy peanut butter made from premium peanuts',
      image: 'https://images.unsplash.com/photo-1558022032-1356636a26ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcGVhbnV0c3xlbnwxfHx8fDE3NTk0NzA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      name: 'Celebration Pack',
      category: 'combo',
      description: 'Perfect combo pack for parties and celebrations',
      image: chikkiImage
    },
    {
      id: '5',
      name: 'Dryfruit Burfi',
      category: 'sweets',
      description: 'Rich and nutritious dryfruit burfi made with premium ingredients',
      image: 'https://images.unsplash.com/photo-1558022032-1356636a26ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcGVhbnV0c3xlbnwxfHx8fDE3NTk0NzA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '6',
      name: 'Spicy Snacks',
      category: 'spicy',
      description: 'Variety of spicy snacks for those who love heat',
      image: 'https://images.unsplash.com/photo-1568041327767-d6a7883f5f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBvcGNvcm4lMjBzbmFja3N8ZW58MXx8fHwxNzU5NDcwODI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      flavors: ['Jingle', 'Panipuri', 'Kolhapuri Bhel', 'Khajapur', 'Chhatani Imli Goli']
    },
    {
      id: '7',
      name: 'Protein Bar',
      category: 'healthy',
      description: 'High-protein bars perfect for fitness enthusiasts',
      image: 'https://images.unsplash.com/photo-1597776776796-092650d7afed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwYmFycyUyMHNuYWNrc3xlbnwxfHx8fDE3NTk0NzA4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '8',
      name: 'Multigrain Cookies',
      category: 'healthy',
      description: 'Nutritious multigrain cookies baked to perfection',
      image: 'https://images.unsplash.com/photo-1589358161406-a632fc9bcbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtdWx0aWdyYWluJTIwY29va2llcyUyMGhlYWx0aHl8ZW58MXx8fHwxNzU5NDcwODMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '9',
      name: 'Corn on Cob - Sweetcorn',
      category: 'healthy',
      description: 'Fresh and sweet corn kernels, perfect for healthy snacking',
      image: 'https://images.unsplash.com/photo-1595303499965-ae390aee5cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGNvcm4lMjBrZXJuZWxzfGVufDF8fHx8MTc1OTQ3MDgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'popcorn', name: 'Popcorn' },
    { id: 'chikki', name: 'Chikki' },
    { id: 'healthy', name: 'Healthy Snacks' },
    { id: 'spicy', name: 'Spicy Snacks' },
    { id: 'sweets', name: 'Sweets' },
    { id: 'combo', name: 'Combo Packs' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of delicious and healthy snacks, perfect for every occasion
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-100 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {product.flavors && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Flavors:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((flavor, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products Carousel */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Products</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Hind Sarkar Popcorn Combo</h4>
              <p className="mb-6">Get all your favorite popcorn flavors in one convenient pack. Perfect for movie nights and parties!</p>
              <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Healthy Snack Pack</h4>
              <p className="mb-6">A nutritious combination of protein bars, multigrain cookies, and sweetcorn for guilt-free snacking.</p>
              <button className="bg-white text-green-500 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}