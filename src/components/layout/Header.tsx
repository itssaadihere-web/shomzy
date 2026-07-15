"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 -ml-2 mr-2 md:hidden text-brand-black dark:text-brand-cream">
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-brand-black dark:text-brand-cream">
              SHOMZY.PK
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/category/fashion" className="text-sm font-medium hover:text-brand-gold transition-colors">Fashion</Link>
            <Link href="/category/electronics" className="text-sm font-medium hover:text-brand-gold transition-colors">Electronics</Link>
            <Link href="/category/beauty" className="text-sm font-medium hover:text-brand-gold transition-colors">Beauty</Link>
            <Link href="/category/home" className="text-sm font-medium hover:text-brand-gold transition-colors">Home & Lifestyle</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-brand-black dark:text-brand-cream hover:text-brand-gold transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="p-2 text-brand-black dark:text-brand-cream hover:text-brand-gold transition-colors relative flex items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
