// components/moleclues/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { Home, Star, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f7f789] to-[#58ef53]">
                Crypto Coins
              </h2>
            </Link>
            <p className="text-neutral-400 max-w-xs">
              Track your favorite cryptocurrencies with real-time data and market insights.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-green-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-green-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-green-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:contact@cryptocoins.com" 
                className="text-neutral-400 hover:text-green-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-200 mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/watchlist" 
                  className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors"
                >
                  <Star size={16} />
                  <span>Watchlist</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-200 mb-4">Resources</h3>
            <ul className="space-y-3 text-neutral-400">
              <li>
                <a 
                  href="https://www.coingecko.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  CoinGecko API
                </a>
              </li>
              <li>
                <a 
                  href="https://nextjs.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Next.js Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://tailwindcss.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-neutral-800 mb-6"></div>
        
        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            © {currentYear} Crypto Coins. All rights reserved.
          </p>
          <div className="flex space-x-6 text-neutral-500 text-sm">
            <Link href="/privacy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-green-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;