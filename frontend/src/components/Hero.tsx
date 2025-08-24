import React from 'react';
import { Leaf, Shield, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-200/30 to-emerald-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-lg">
            <Leaf className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-emerald-700 font-semibold text-sm">Certified Organic & Natural</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Pure <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Ayurvedic</span>
            <br />
            <span className="text-4xl md:text-6xl">Wellness</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Discover the power of traditional Ayurvedic medicine with our premium collection 
            of <span className="text-emerald-600 font-semibold">natural products, herbs, and supplements</span> for holistic health and wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Shop Now
            </button>
            <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-emerald-700 font-semibold py-4 px-10 rounded-2xl text-lg transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Leaf className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Natural</h3>
            <p className="text-gray-600 leading-relaxed">Pure ingredients sourced from nature without any artificial additives or preservatives</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lab Tested</h3>
            <p className="text-gray-600 leading-relaxed">Every product is rigorously tested for purity, potency, and safety standards</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Award className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Certified Quality</h3>
            <p className="text-gray-600 leading-relaxed">Manufactured in GMP certified facilities with international quality assurance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;