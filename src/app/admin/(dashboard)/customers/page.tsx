import { prisma } from "@/lib/prisma";
import { Mail, Phone, ShoppingBag } from "lucide-react";

export default async function AdminCustomers() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Group orders by email to get unique customers
  const customerMap = new Map<string, any>();

  orders.forEach(order => {
    if (customerMap.has(order.customerEmail)) {
      const existing = customerMap.get(order.customerEmail);
      existing.orderCount += 1;
      existing.lifetimeSpend += order.totalAmount;
      // keep the most recent phone/address
    } else {
      customerMap.set(order.customerEmail, {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: order.address,
        city: order.city,
        orderCount: 1,
        lifetimeSpend: order.totalAmount,
        firstOrderDate: order.createdAt,
      });
    }
  });

  const customers = Array.from(customerMap.values()).sort((a, b) => b.lifetimeSpend - a.lifetimeSpend);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Customer Directory</h1>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          Total Unique Customers: <span className="font-bold text-brand-blue">{customers.length}</span>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-right">Lifetime Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Since {customer.firstOrderDate.toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Mail className="h-3 w-3 mr-2" /> {customer.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-3 w-3 mr-2" /> {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <p>{customer.city}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[200px]">{customer.address}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <ShoppingBag className="h-3 w-3 mr-1" /> {customer.orderCount}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="font-black text-brand-blue">Rs. {customer.lifetimeSpend.toLocaleString()}</p>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
