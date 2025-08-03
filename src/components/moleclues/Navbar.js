"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import SidebarMobileMenu from './SidebarMobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className='flex w-full px-4 py-3 md:px-6 md:py-4 justify-between items-center z-50 bg-neutral-800/95 backdrop-blur-lg fixed text-white shadow-lg border-b border-neutral-700'>
        {/* Logo */}
        <div>
          <Link href={"/"} className='flex items-center gap-x-2'>
            <h1 className='text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f7f789] to-[#58ef53]'>
              Crypto Coins
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-x-8'>
          <Link 
            href={"/"} 
            className='hover:text-green-400 transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-green-400'
          >
            Home
          </Link>
          <Link 
            href={"/watchlist"} 
            className='flex items-center gap-1 hover:text-yellow-400 transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-yellow-400'
          >
            <span>Watchlist</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className='md:hidden p-2 rounded-lg hover:bg-neutral-700 transition-colors text-neutral-300'
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      <SidebarMobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </>
  );
};

export default Navbar;