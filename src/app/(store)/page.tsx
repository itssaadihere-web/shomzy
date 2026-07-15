import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center">
        <Image
          src="/images/hero_banner.png"
          alt="Luxury lifestyle products"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Elevate Your Everyday
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-sans">
              Discover a curated selection of premium fashion, electronics, and lifestyle essentials designed for the modern connoisseur.
            </p>
            <Link
              href="#categories"
              className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-brand-gold-light transition-colors"
            >
              Shop the Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-24 bg-brand-cream dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Categories</h2>
            <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.name} className="group relative h-96 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-2xl font-serif font-bold tracking-wider mb-2">{category.name}</h3>
                  <span className="text-brand-gold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium flex items-center">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-24 bg-brand-black text-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">The Shomzy Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Excellence</h3>
              <p className="text-gray-400 text-sm">Every product is meticulously selected to ensure premium quality and unparalleled design.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Seamless checkout with Bank of Punjab or Cash on Delivery for your convenience.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Concierge</h3>
              <p className="text-gray-400 text-sm">Our AI shopping assistant is always available to guide you through our collections.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { name: "Fashion", slug: "fashion", image: "/images/fashion.png" },
  { name: "Electronics", slug: "electronics", image: "/images/electronics.png" },
  { name: "Beauty", slug: "beauty", image: "/images/beauty.png" },
  { name: "Home & Lifestyle", slug: "home", image: "/images/home.png" },
];
