"use client"
import React from 'react';
import Link from 'next/link';
import { X, Star, Home } from 'lucide-react';

const SidebarMobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div 
      className={`md:hidden block fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      aria-hidden={!isMenuOpen}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
        aria-label="Close menu"
      />
      
      {/* Sidebar Content */}
      <div 
        className={`absolute right-0 top-0 h-full w-64 bg-neutral-900 border-l border-neutral-700 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-neutral-700">
          <div className="p-2">
            <Link href={"/"} className='flex items-center gap-x-2' onClick={() => setIsMenuOpen(false)}>
              <h1 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f7f789] to-[#58ef53]'>
                Crypto Coins
              </h1>
            </Link>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col px-4 py-8 ">
          <Link 
            href={"/"} 
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-800 text-neutral-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={15} className="text-green-400" />
            <span className="text-md">Home</span>
          </Link>
          
          <Link 
            href={"/watchlist"} 
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-800 text-neutral-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Star size={15} className="text-yellow-400" />
            <span className="text-md">Watchlist</span>
          </Link>
        </div>
        
        <div className="absolute bottom-0 w-full p-6 text-center text-neutral-400 text-sm border-t border-neutral-800">
          © {new Date().getFullYear()} Crypto Coins
        </div>
      </div>
    </div>
  );
};

export default SidebarMobileMenu;