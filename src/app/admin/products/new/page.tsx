import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";

export default async function NewProduct() {
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-8">Add New Product</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <form action={createProduct} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="categoryId" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue bg-white">
              <option value="">Select a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
              <input type="number" name="price" step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input type="number" name="stock" required defaultValue="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" name="image" accept="image/*" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue bg-white" />
            <p className="mt-1 text-sm text-gray-500">Upload a high-quality product image.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-700">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
