"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, User, Heart, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="w-full bg-white flex flex-col relative z-50 shadow-sm">
      {/* Top Header - Logo, Search, Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center lg:w-1/4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 mr-2 lg:hidden text-brand-black"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Shomzy" width={150} height={40} className="object-contain" priority />
            </Link>
          </div>

          {/* Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl px-8">
            <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
              <div className="flex-shrink-0 bg-gray-50 border-r border-gray-300 flex items-center px-4 text-sm text-gray-600">
                All Categories <ChevronDown className="ml-1 h-4 w-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full px-4 py-2 text-sm focus:outline-none"
              />
              <button className="px-4 text-gray-500 hover:text-brand-blue transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-6 lg:w-1/4">
            <Link href="#" className="hidden lg:block text-gray-700 hover:text-brand-blue transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="#" className="hidden lg:block text-gray-700 hover:text-brand-blue transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-brand-blue transition-colors relative flex items-center">
              <ShoppingCart className="h-6 w-6" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Header - Navigation Ribbon */}
      <div className="hidden lg:block w-full bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center">
            
            {/* All Categories Button */}
            <div className="w-1/4 h-full">
              <div className="h-full bg-[#163ca0] flex items-center px-4 cursor-pointer font-medium hover:bg-[#123185] transition-colors">
                <Menu className="h-5 w-5 mr-2" />
                All Categories
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex justify-center space-x-8">
              <Link href="/" className="text-sm font-semibold hover:text-gray-200 transition-colors uppercase tracking-wider">Home</Link>
              <Link href="/" className="text-sm font-semibold hover:text-gray-200 transition-colors uppercase tracking-wider">Shop</Link>
              <Link href="/" className="text-sm font-semibold hover:text-gray-200 transition-colors uppercase tracking-wider">Products</Link>
            </nav>

            {/* Right Promo Text */}
            <div className="w-1/4 flex justify-end">
              <span className="text-xs font-semibold text-yellow-300">SPECIAL OFFER TODAY!</span>
            </div>

          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-50">
          <nav className="flex flex-col py-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 border-b text-gray-800 font-medium">Home</Link>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 border-b text-gray-800 font-medium">Shop</Link>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 border-b text-gray-800 font-medium">Products</Link>
            <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 text-brand-blue font-bold">View Cart ({cartItemsCount})</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
