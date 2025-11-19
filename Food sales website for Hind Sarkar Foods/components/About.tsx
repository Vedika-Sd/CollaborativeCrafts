import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a passion for creating healthy, delicious snacks that bring people together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Founded in 2011</h3>
              <p className="text-gray-600 leading-relaxed">
                Started in Mumbai by Sharif aka Azad, Hind Sarkar Agro Foods began with a simple mission: 
                to provide healthy, tasty, and hygienic popcorn for every mood. What started as a small 
                venture has grown into a beloved brand that brings joy to families across India.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide healthy, tasty, and hygienic popcorn and snacks for every mood, 
                bringing families and friends together through the joy of delicious food.
              </p>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1558022032-1356636a26ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcGVhbnV0c3xlbnwxfHx8fDE3NTk0NzA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Healthy snacks and peanuts" 
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Health</h3>
            <p className="text-gray-600">
              We prioritize your well-being with natural ingredients and nutritious snacks 
              that fuel your body and mind.
            </p>
          </div>

          <div className="text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Fun</h3>
            <p className="text-gray-600">
              Every bite is designed to bring joy and excitement to your day, 
              making snack time a celebration.
            </p>
          </div>

          <div className="text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Togetherness</h3>
            <p className="text-gray-600">
              Our snacks are perfect for sharing, bringing families and friends 
              together for memorable moments.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-semibold italic">
              "Perfect Partner for All Your Moods – Hind Sarkar Agro Foods"
            </blockquote>
            <p className="mt-4 text-orange-100">- Our Promise to You</p>
          </div>
        </div>
      </div>
    </section>
  );
}