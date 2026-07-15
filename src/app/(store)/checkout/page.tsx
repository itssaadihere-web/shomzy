"use client";

import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  if (!mounted || items.length === 0) return null;

  const subtotal = getTotal();
  const shipping = 200;
  const totalAmount = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        router.push(`/order-tracking?orderNumber=${data.orderNumber}`);
      } else {
        alert("Error processing checkout: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input required type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input required type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Complete Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === "COD"} onChange={handleChange} className="text-brand-gold focus:ring-brand-gold h-4 w-4" />
                  <div className="ml-3">
                    <span className="block text-sm font-medium">Cash on Delivery (COD)</span>
                    <span className="block text-xs text-gray-500 mt-1">Pay when your order arrives. Required manual confirmation.</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <input type="radio" name="paymentMethod" value="BOP" checked={formData.paymentMethod === "BOP"} onChange={handleChange} className="text-brand-gold focus:ring-brand-gold h-4 w-4" />
                  <div className="ml-3">
                    <span className="block text-sm font-medium">Bank of Punjab (Online Payment)</span>
                    <span className="block text-xs text-gray-500 mt-1">Secure payment via BOP Gateway.</span>
                  </div>
                </label>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-brand-black text-brand-cream py-4 font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="mt-16 lg:col-span-5 lg:mt-0 sticky top-24">
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold font-serif mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="relative w-16 h-16 border border-gray-200 dark:border-gray-800 bg-white flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="ml-4 text-sm font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <dl className="space-y-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">Rs. {subtotal.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">Rs. {shipping.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                <dt className="text-base font-bold text-gray-900 dark:text-gray-100">Total</dt>
                <dd className="text-base font-bold text-brand-gold font-serif">Rs. {totalAmount.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
