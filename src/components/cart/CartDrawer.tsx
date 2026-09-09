"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    isFreeShipping,
    remainingForFreeShipping,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      {/* Backdrop click */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-out Panel */}
      <div className="w-full max-w-md bg-[#F8F5EF] border-l border-[#E5DDD2] h-full flex flex-col justify-between shadow-2xl animate-slide-right text-[#0D0D0D]">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DDD2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-xl tracking-wide">YOUR BAG</h2>
            <span className="text-xs text-[#8C8C8C] tracking-widest">({totalItems})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#0D0D0D] hover:opacity-60 transition-opacity"
            aria-label="Close Bag"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3.5 bg-[#F1ECE3] border-b border-[#E5DDD2] space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium tracking-wider uppercase">
            <span>
              {isFreeShipping ? (
                <span className="text-[#0D0D0D] font-semibold">✨ UNLOCKED FREE EXPRESS SHIPPING</span>
              ) : (
                <span>ADD {formatPrice(remainingForFreeShipping)} MORE FOR FREE SHIPPING</span>
              )}
            </span>
            <span className="text-[#8C8C8C]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1 bg-[#E5DDD2] overflow-hidden">
            <div
              className="h-full bg-[#0D0D0D] transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-12 h-12 rounded-full bg-[#F1ECE3] flex items-center justify-center text-[#8C8C8C]">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
              <p className="font-editorial text-lg tracking-wide">YOUR BAG IS EMPTY</p>
              <p className="text-xs text-[#555555] max-w-xs">
                Explore our modern unisex essentials and build your everyday rotation.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#333333] transition-colors"
              >
                EXPLORE SHOP
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-[#E5DDD2] last:border-b-0"
              >
                {/* Image */}
                <div className="relative w-20 h-24 flex-shrink-0 bg-[#F1ECE3] overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-medium hover:opacity-75 transition-opacity line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#8C8C8C] hover:text-[#0D0D0D] transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#555555] tracking-wider uppercase">
                      <span>{item.selectedColor.name}</span>
                      <span>•</span>
                      <span>SIZE {item.selectedSize}</span>
                    </div>

                    <p className="text-xs font-semibold text-[#0D0D0D] pt-0.5">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Adjuster */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-[#E5DDD2] bg-[#F1ECE3]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#E5DDD2] transition-colors text-[#0D0D0D]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2.5 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#E5DDD2] transition-colors text-[#0D0D0D]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-[#0D0D0D]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F1ECE3] border-t border-[#E5DDD2] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <span className="tracking-wider uppercase text-[#555555]">SUBTOTAL</span>
                <span className="font-semibold text-sm text-[#0D0D0D]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#8C8C8C] text-[11px]">
                <span>SHIPPING</span>
                <span>{isFreeShipping ? "FREE" : "CALCULATED AT CHECKOUT"}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={15} />
              </Link>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-[#555555] hover:text-[#0D0D0D] transition-colors text-center"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
