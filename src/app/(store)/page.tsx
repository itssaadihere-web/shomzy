import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Smartphone, Camera, Laptop, Watch, Headphones, Gamepad, Monitor, Speaker } from "lucide-react";
import { prisma } from "@/lib/prisma";
import fs from 'fs/promises';
import path from 'path';

async function getMarketingConfig() {
  try {
    const filePath = path.join(process.cwd(), 'src/config/marketing.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    return {
      heroBanner: { title: "Be At One With Your Music", subtitle: "Experience high-fidelity sound with our premium selection of noise-cancelling headphones.", buttonText: "Discover Now", buttonLink: "/category/electronics", image: "/images/hero_headphones.png" },
      promo1: { title: "Features", subtitle: "Gimbal", image: "/images/gimbal_promo.png" },
      promo2: { title: "Pro 16-inch", subtitle: "MacBook", image: "/images/laptop_promo.png" },
      promo3: { title: "Watch", subtitle: "Smart", image: "/images/watch_promo.png" }
    };
  }
}

export default async function Home() {
  const products = await prisma.product.findMany({ 
    take: 8, 
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  
  const marketing = await getMarketingConfig();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#f5f7f9] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 pt-10 pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              {marketing.heroBanner.title}
            </h1>
            <p className="text-gray-500 mb-8 max-w-md text-lg">{marketing.heroBanner.subtitle}</p>
            <Link href={marketing.heroBanner.buttonLink} className="inline-flex items-center bg-brand-blue text-white px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#153a99] transition-colors">
              {marketing.heroBanner.buttonText}
            </Link>
          </div>
          <div className="md:w-1/2 absolute md:relative right-[-20%] md:right-0 opacity-20 md:opacity-100 h-[600px] w-[600px]">
            {/* Headphones Image */}
            <Image src={marketing.heroBanner.image} alt="Hero Product" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>
      </section>

      {/* 3 Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f6f6f6] p-8 flex items-center justify-between rounded-sm">
            <div>
              <p className="text-gray-500 text-sm mb-1">{marketing.promo1.subtitle}</p>
              <h3 className="font-bold text-xl mb-4">{marketing.promo1.title}</h3>
              <Link href="/category/electronics" className="text-sm font-bold text-brand-blue hover:underline">Shop Now</Link>
            </div>
            <div className="w-24 h-24 relative"><Image src={marketing.promo1.image} alt={marketing.promo1.title} fill className="object-contain drop-shadow-lg" /></div>
          </div>
          <div className="bg-[#f9f5f0] p-8 flex items-center justify-between rounded-sm">
            <div>
              <p className="text-gray-500 text-sm mb-1">{marketing.promo2.subtitle}</p>
              <h3 className="font-bold text-xl mb-4">{marketing.promo2.title}</h3>
              <Link href="/category/electronics" className="text-sm font-bold text-brand-blue hover:underline">Shop Now</Link>
            </div>
            <div className="w-32 h-24 relative"><Image src={marketing.promo2.image} alt={marketing.promo2.title} fill className="object-contain drop-shadow-lg" /></div>
          </div>
          <div className="bg-[#f4f7f6] p-8 flex items-center justify-between rounded-sm">
            <div>
              <p className="text-gray-500 text-sm mb-1">{marketing.promo3.subtitle}</p>
              <h3 className="font-bold text-xl mb-4">{marketing.promo3.title}</h3>
              <Link href="/category/electronics" className="text-sm font-bold text-brand-blue hover:underline">Shop Now</Link>
            </div>
            <div className="w-20 h-24 relative"><Image src={marketing.promo3.image} alt={marketing.promo3.title} fill className="object-contain drop-shadow-lg" /></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
          <div className="flex space-x-8 mt-4 md:mt-0 overflow-x-auto w-full md:w-auto">
            <button className="text-brand-blue font-bold border-b-2 border-brand-blue pb-4 -mb-[18px] whitespace-nowrap">All Items</button>
            <button className="text-gray-500 font-medium hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap">Cameras</button>
            <button className="text-gray-500 font-medium hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap">Laptops</button>
            <button className="text-gray-500 font-medium hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap">Accessories</button>
            <button className="text-gray-500 font-medium hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap">Speakers</button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map(product => {
            const images = JSON.parse(product.images);
            return (
              <Link href={`/product/${product.slug}`} key={product.id} className="group flex flex-col">
                <div className="relative aspect-square bg-gray-50 mb-4 overflow-hidden rounded-md border border-gray-100 flex items-center justify-center">
                  <Image src={images[0] || "/images/hero_banner.png"} alt={product.name} fill className="object-cover p-8 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs text-gray-400 mb-1 font-medium">{product.category.name}</p>
                <h3 className="font-bold text-gray-900 mb-1 truncate group-hover:text-brand-blue transition-colors text-sm">{product.name}</h3>
                <p className="font-bold text-gray-900 mb-4">Rs. {product.price.toLocaleString()}</p>
                <div className="mt-auto">
                   <button className="flex items-center text-brand-blue text-sm font-bold group-hover:underline">
                     Add to Cart <ShoppingCart className="ml-1 h-4 w-4" />
                   </button>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Categories</h2>
          <Link href="/category/electronics" className="text-sm text-brand-blue font-bold hover:underline flex items-center">
            View All Categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t border-gray-200">
          {[
            { name: "Smartphones", icon: Smartphone },
            { name: "Cameras", icon: Camera },
            { name: "Laptops", icon: Laptop },
            { name: "Watches", icon: Watch },
            { name: "Speakers", icon: Speaker },
            { name: "Headphones", icon: Headphones },
            { name: "Accessories", icon: Monitor },
            { name: "Gaming", icon: Gamepad },
            { name: "Electronics", icon: Monitor },
            { name: "More", icon: ArrowRight },
          ].map((cat, idx) => (
            <div key={idx} className="border-r border-b border-gray-200 p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <cat.icon className="h-10 w-10 text-gray-400 group-hover:text-brand-blue mb-4 transition-colors stroke-[1]" />
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Drone Banner */}
      <section className="w-full bg-[#f4f7f9] py-20 relative flex items-center overflow-hidden min-h-[400px] my-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between relative z-10">
           <div className="max-w-sm">
             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Hasselblad Camera, Create to Inspire</h2>
           </div>
         </div>
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-30 md:opacity-100">
            <Image src="/images/drone_banner.png" alt="Drone" fill className="object-cover md:object-contain drop-shadow-2xl" />
         </div>
      </section>
      
      {/* Recommended For You */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Recommended For You</h2>
          <Link href="/category/electronics" className="text-sm text-brand-blue font-bold hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tall Promo Block */}
          <div className="lg:col-span-1 bg-[#90a2a5] p-8 text-white flex flex-col justify-between h-[600px] rounded-sm relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-xl font-medium mb-2">New Arrivals</h3>
              <p className="text-3xl font-bold">Smart Watches</p>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center text-sm font-bold border-b border-white pb-1 group-hover:border-transparent transition-colors">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
          
          {/* 3 Products */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => {
              const images = JSON.parse(product.images);
              return (
                <Link href={`/product/${product.slug}`} key={`rec-${product.id}`} className="group flex flex-col">
                  <div className="relative aspect-square bg-gray-50 mb-4 overflow-hidden rounded-md border border-gray-100">
                    <Image src={images[0] || "/images/hero_banner.png"} alt={product.name} fill className="object-cover p-8 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1 font-medium">{product.category.name}</p>
                  <h3 className="font-bold text-gray-900 mb-1 truncate group-hover:text-brand-blue transition-colors text-sm">{product.name}</h3>
                  <p className="font-bold text-gray-900 mb-4">Rs. {product.price.toLocaleString()}</p>
                  <div className="mt-auto">
                     <button className="flex items-center text-brand-blue text-sm font-bold group-hover:underline">
                       Add to Cart <ShoppingCart className="ml-1 h-4 w-4" />
                     </button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* PS5 Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#f3f4f6] rounded-md h-[300px] relative overflow-hidden flex items-center px-12">
          <h2 className="text-4xl font-bold text-gray-900 relative z-10">PlayStation 5 Console</h2>
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <Image src="/images/ps5_banner.png" alt="PS5" fill className="object-cover md:object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
