import { prisma } from "@/lib/prisma";
import { confirmOrder, updateOrderStatus } from "./actions";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Order Management</h1>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">Rs. {order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.paymentMethod === 'COD' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Pending Confirmation' ? 'bg-red-100 text-red-700' :
                      order.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {order.status === "Pending Confirmation" && order.paymentMethod === "COD" && (
                      <form action={confirmOrder.bind(null, order.id)} className="inline">
                        <button className="bg-brand-black text-white px-3 py-1 text-xs font-bold rounded hover:bg-gray-800 transition-colors">
                          Confirm COD
                        </button>
                      </form>
                    )}
                    {order.status !== "Pending Confirmation" && order.status !== "Delivered" && order.status !== "Cancelled" && (
                      <form action={updateOrderStatus.bind(null, order.id, "Shipped")} className="inline">
                        <button className="bg-gray-200 text-gray-800 px-3 py-1 text-xs font-bold rounded hover:bg-gray-300 transition-colors ml-2">
                          Mark Shipped
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
