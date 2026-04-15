import React from 'react';
import logo from '../assets/logo.svg';

const NavBar = ({ onLogoClick }) => {
  return (
    <nav className="bg-transparent border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Clickable Logo Area */}
      <div 
        className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95" 
        onClick={onLogoClick}
      >
        <div className="w-8 h-8 bg-[#D70F64] rounded-lg flex items-center justify-center p-1 shadow-sm">
           <img 
             src={logo} 
             className="brightness-0 invert" 
             alt="logo" 
           />
        </div>
        <span className="font-black text-xl tracking-tighter text-[#D70F64]">RS Earns</span>
      </div>

      {/* Tagline - Hidden on small mobile screens */}
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Rider Service Agent Portal
        </span>
        <div className="h-1 w-12 bg-[#D70F64] rounded-full mt-0.5"></div>
      </div>
    </nav>
  );
};

export default NavBar;