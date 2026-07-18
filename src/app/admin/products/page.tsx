import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Catalog Management</h1>
        <Link href="/admin/products/new" className="bg-brand-blue text-white px-4 py-2 font-bold hover:bg-blue-700 transition-colors flex items-center rounded">
          <Plus className="h-5 w-5 mr-2" /> Add Product
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const images = JSON.parse(product.images) as string[];
              const mainImage = images[0] || "/images/hero_banner.png";
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 bg-gray-100 flex-shrink-0 mr-3">
                        <Image src={mainImage} alt={product.name} fill className="object-cover rounded border border-gray-200" />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.category.name}</td>
                  <td className="px-6 py-4 font-medium">Rs. {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock > 10 ? "text-green-600 font-medium" : "text-red-600 font-bold"}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-brand-blue hover:underline font-medium">Edit</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
