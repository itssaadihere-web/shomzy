import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 text-brand-gold">SHOMZY.PK</h3>
            <p className="text-sm text-gray-400">
              Your premium destination for fashion, electronics, beauty, and lifestyle in Pakistan.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/category/fashion" className="hover:text-brand-gold transition-colors">Fashion</Link></li>
              <li><Link href="/category/electronics" className="hover:text-brand-gold transition-colors">Electronics</Link></li>
              <li><Link href="/category/beauty" className="hover:text-brand-gold transition-colors">Beauty</Link></li>
              <li><Link href="/category/home" className="hover:text-brand-gold transition-colors">Home & Lifestyle</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/order-tracking" className="hover:text-brand-gold transition-colors">Track Your Order</Link></li>
              <li><Link href="/returns" className="hover:text-brand-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">Shipping Information</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-gold" />
              <button className="bg-brand-gold text-brand-black px-4 py-2 font-medium hover:bg-brand-gold-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shomzy.pk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
