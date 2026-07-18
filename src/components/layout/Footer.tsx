import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col">
      {/* Newsletter Bar */}
      <div className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-white mb-6 md:mb-0">
            <Send className="h-8 w-8 mr-4 opacity-80" />
            <div>
              <h3 className="font-bold text-xl">Sign up for Newsletter</h3>
              <p className="text-blue-100 text-sm mt-1">Receive recommendations & exclusive offers, straight to your inbox.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md ml-0 md:ml-12">
            <form className="flex w-full bg-white rounded-md overflow-hidden">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 focus:outline-none text-sm text-gray-800" 
              />
              <button className="bg-gray-100 text-gray-800 px-6 font-bold text-sm hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="mb-6 block inline-block rounded max-w-[180px]">
                <Image src="/images/logo.png" alt="Shomzy" width={160} height={45} className="object-contain" />
              </Link>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex">
                  <span className="font-medium mr-2">Address:</span>
                  1234 Fashion Street, Gulberg, Lahore, Pakistan
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">Phone:</span>
                  +92 300 1234567
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">Email:</span>
                  noreply@shomzy.pk
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Categories</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/category/fashion" className="hover:text-brand-blue transition-colors">Fashion</Link></li>
                <li><Link href="/category/electronics" className="hover:text-brand-blue transition-colors">Electronics</Link></li>
                <li><Link href="/category/beauty" className="hover:text-brand-blue transition-colors">Beauty</Link></li>
                <li><Link href="/category/home" className="hover:text-brand-blue transition-colors">Home & Lifestyle</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Information</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link></li>
                <li><Link href="/terms" className="hover:text-brand-blue transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/returns" className="hover:text-brand-blue transition-colors">Returns & Exchanges</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Useful Links</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/store-location" className="hover:text-brand-blue transition-colors">Store Location</Link></li>
                <li><Link href="/order-tracking" className="hover:text-brand-blue transition-colors">Order Tracking</Link></li>
                <li><Link href="/faqs" className="hover:text-brand-blue transition-colors">FAQs</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shomzy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <span className="cursor-pointer hover:text-brand-blue">Privacy Policy</span>
            <span className="cursor-pointer hover:text-brand-blue">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
