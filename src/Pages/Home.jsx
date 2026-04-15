import React from 'react';
import Logo from '../assets/logo.svg'; 

const Home = ({ onStart }) => {
  return (
    /* 1. Container: px-6 for better padding on small screens, flex-grow to push footer down */
    <div className="relative w-full max-w-5xl mx-auto px-6 py-10 md:py-20 min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
      
      {/* 2. Content Wrapper: Ensures text doesn't hit screen edges */}
      <div className="z-10 text-center space-y-6 md:space-y-8">
        
        {/* Title: 
            text-4xl for mobile (~36px)
            md:text-6xl for tablet/laptop (~60px)
            lg:text-7xl for large screens (~72px) 
        */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight animate-fade-in-up opacity-0">
          RS <span className="text-[#D70F64]">Earnings Hub</span>
        </h1>

        {/* Description: 
            Max-width ensures the text doesn't span the whole width on desktop (hard to read)
        */}
        <p className="max-w-md md:max-w-2xl mx-auto text-base md:text-xl text-gray-200 leading-relaxed animate-fade-in-up animation-delay-200 opacity-0">
          The tool for Rider Service Agents to verify monthly payouts, 
          calculate KPIs, and track overtime with precision.
        </p>
        
        {/* Button: 
            w-full on mobile (easy to tap)
            md:w-auto on desktop
        */}
        <div className="animate-fade-in-up animation-delay-400 opacity-0 pt-4">
          <button 
            onClick={onStart}
            className="w-full md:w-auto bg-[#D70F64] text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl 
                       hover:bg-[#b00d52] hover:shadow-lg hover:shadow-pink-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Start Calculation
          </button>
        </div>
      </div>

      {/* 3. Decorative Elements: Hidden on very small screens to avoid layout shifts */}
      
      <div className="absolute bottom-10 w-28 h-28 -z-10 animate-bounce">
        <img 
          src={Logo}
          alt="Panda Logo" 
          className="w-full h-auto object-contain opacity-20 hover:opacity-100 transition-opacity duration-500" 
        />
      </div>
    </div>
  );
};

export default Home;