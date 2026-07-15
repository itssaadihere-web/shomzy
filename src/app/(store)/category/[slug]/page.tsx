import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      products: true,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-500 dark:text-gray-400 text-lg">{category.description}</p>
        )}
      </div>

      {category.products.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {category.products.map((product) => {
            const images = JSON.parse(product.images) as string[];
            const mainImage = images[0] || '/images/hero_banner.png';

            return (
              <Link href={`/product/${product.slug}`} key={product.id} className="group">
                <div className="relative aspect-[4/5] mb-4 bg-gray-100 overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.stock <= 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 uppercase font-bold">
                      Sold Out
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                <p className="text-brand-gray dark:text-gray-300 font-serif">Rs. {product.price.toLocaleString()}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}
