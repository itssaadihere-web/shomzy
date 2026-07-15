import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/product/AddToCartButton";
import { ChevronRight } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0] || "/images/hero_banner.png";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8 font-medium">
        <Link href="/" className="hover:text-brand-gold">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/category/${product.category.slug}`} className="hover:text-brand-gold">
          {product.category.name}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Image */}
        <div className="relative aspect-[4/5] bg-white border border-gray-100 rounded-md shadow-sm mb-8 lg:mb-0">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-brand-gold font-serif mb-6">Rs. {product.price.toLocaleString()}</p>
          
          <div className="prose prose-sm sm:prose text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-bold text-gray-900">Availability</span>
              <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-200">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: mainImage,
                stock: product.stock
              }} 
            />
          </div>

          {/* Delivery Info */}
          <div className="mt-8 space-y-4 text-sm text-gray-500 border border-gray-200 p-6 rounded-md bg-white shadow-sm">
            <div className="flex">
              <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Cash on Delivery Available (Requires manual confirmation call)</span>
            </div>
            <div className="flex">
              <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Secure Online Payments via Bank of Punjab</span>
            </div>
            <div className="flex">
              <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>7-Day Return Policy on eligible items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
