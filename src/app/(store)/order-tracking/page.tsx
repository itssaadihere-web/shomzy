import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function OrderTrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber?: string; email?: string }>;
}) {
  const resolvedParams = await searchParams;
  const orderNumber = resolvedParams.orderNumber;
  const email = resolvedParams.email;

  let order = null;
  let error = null;

  if (orderNumber) {
    order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      error = "Order not found. Please check your order number.";
    } else if (email && order.customerEmail !== email) {
      // Optional security check if they provided an email
      error = "Email does not match the order.";
      order = null;
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-500">Enter your order number to check the current status of your shipment.</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-12">
        <form className="flex flex-col sm:flex-row gap-4" action="/order-tracking" method="GET">
          <input
            type="text"
            name="orderNumber"
            defaultValue={orderNumber || ""}
            placeholder="Order Number (e.g., SHM-123456)"
            required
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
          />
          <button type="submit" className="bg-brand-black text-brand-cream px-8 py-3 font-bold tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            Track
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
      </div>

      {order && (
        <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-black flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <h2 className="text-xl font-bold font-serif">{order.orderNumber}</h2>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-gold/20 text-brand-gold">
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold font-serif mb-4">Order Details</h3>
            <div className="space-y-4 mb-8">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</span>
                    <span className="text-gray-500 ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-medium">Rs. {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold font-serif text-brand-gold text-lg">Rs. {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
