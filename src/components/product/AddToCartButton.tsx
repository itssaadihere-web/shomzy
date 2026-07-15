"use client";

import { useCartStore } from "@/lib/store";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock <= 0) {
    return (
      <button disabled className="w-full py-4 bg-gray-200 text-gray-500 font-bold uppercase tracking-wide cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-4 flex items-center justify-center font-bold tracking-wide transition-colors ${
        added ? "bg-green-600 text-white" : "bg-brand-black text-brand-cream hover:bg-gray-800"
      }`}
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </>
      )}
    </button>
  );
}
