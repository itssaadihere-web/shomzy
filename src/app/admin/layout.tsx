import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, PackageOpen, Users, Megaphone } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-brand-blue text-white flex flex-col shadow-xl z-10">
        <div className="p-6">
          <Link href="/">
            <h2 className="text-2xl font-black tracking-tight text-white">SHOMZY</h2>
          </Link>
          <p className="text-sm text-blue-200 mt-1 font-medium">Admin Workspace</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          <Link href="/admin/products" className="flex items-center px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all">
            <PackageOpen className="h-5 w-5 mr-3" />
            Catalog
          </Link>
          <Link href="/admin/customers" className="flex items-center px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          <Link href="/admin/marketing" className="flex items-center px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-all">
            <Megaphone className="h-5 w-5 mr-3" />
            Marketing
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 text-gray-900">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
