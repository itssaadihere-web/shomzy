import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany()
  ]);

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0] || "";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-8">Edit Product</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <form action={updateProduct.bind(null, product.id)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" defaultValue={product.name} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="categoryId" defaultValue={product.categoryId} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue bg-white">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
              <input type="number" name="price" defaultValue={product.price} step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input type="number" name="stock" defaultValue={product.stock} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center space-x-6">
              {mainImage && (
                <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image src={mainImage} alt="Current product image" fill className="object-contain" />
                </div>
              )}
              <div className="flex-1">
                <input type="file" name="image" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100" />
                <p className="mt-2 text-sm text-gray-500">Upload a new image to replace the current one, or leave blank to keep it.</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" defaultValue={product.description} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-700">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
