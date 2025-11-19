import { ImageWithFallback } from './figma/ImageWithFallback';
import chikkiPacksImage from 'figma:asset/2f5ccc7ba2cd74c9a74f3a53f9ba231c1db16569.png';
import popcornPacksImage from 'figma:asset/b6ae9a2a8bc2811ba018706a457fe4fb85930cff.png';

export function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 pt-20 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Hind Sarkar Agro Foods
              </h1>
              <p className="text-2xl lg:text-3xl text-orange-600 font-semibold">
                The world of delicious popcorn and Peanut Chikki
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Perfect Partner for All Your Moods – Premium Popcorn & Snacks
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Products
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Our Story
              </button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🌱</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Healthy</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">😋</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Tasty</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏠</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Hygienic</p>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <ImageWithFallback 
                  src={chikkiPacksImage} 
                  alt="Hind Sarkar Agro Foods Peanut Chikki varieties" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <ImageWithFallback 
                  src={popcornPacksImage} 
                  alt="Hind Sarkar Agro Foods Gourmet Popcorn varieties" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}