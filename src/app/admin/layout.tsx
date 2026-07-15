import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, PackageOpen, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-brand-black text-white flex flex-col">
        <div className="p-6">
          <Link href="/">
            <h2 className="font-serif text-2xl font-bold text-brand-gold">SHOMZY.PK</h2>
          </Link>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          <Link href="/admin/products" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
            <PackageOpen className="h-5 w-5 mr-3" />
            Catalog
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 text-brand-black">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
