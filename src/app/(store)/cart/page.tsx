"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-serif font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="inline-block bg-brand-black text-brand-cream px-8 py-4 font-bold tracking-wide hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items */}
        <div className="lg:col-span-7">
          <ul className="border-t border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-6 flex sm:py-10">
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 border border-gray-200 bg-white rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link href={`/product/${item.productId}`} className="font-bold text-gray-900 hover:text-brand-gold">
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-serif font-medium text-gray-900">
                        Rs. {item.price.toLocaleString()}
                      </p>
                      {item.variant && (
                        <p className="mt-1 text-sm text-gray-500">{item.variant}</p>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center border border-gray-300 rounded-md w-max">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-600 hover:text-brand-black"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-brand-black"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="absolute top-0 right-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-16 bg-white border border-gray-200 rounded-md shadow-sm p-6 lg:col-span-5 lg:mt-0">
          <h2 className="text-lg font-bold text-gray-900 font-serif mb-6">Order Summary</h2>
          <dl className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900 font-serif">Rs. {total.toLocaleString()}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center">
                <span>Shipping estimate</span>
              </dt>
              <dd className="font-medium text-gray-900 font-serif">Rs. 200</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-bold text-gray-900">Order Total</dt>
              <dd className="text-base font-bold text-brand-gold font-serif">Rs. {(total + 200).toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <Link
              href="/checkout"
              className="w-full flex justify-center items-center bg-brand-gold text-brand-black px-4 py-4 font-bold tracking-wide hover:bg-brand-gold-light transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
