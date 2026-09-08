"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, totalWishlistItems } = useWishlist();
  const { setQuickAddProduct } = useUI();

  return (
    <div className="w-full min-h-screen py-10 sm:py-16 bg-[#F8F5EF] text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-1 pb-6 border-b border-[#E5DDD2] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
              SAVED PIECES
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl tracking-tight">
              YOUR WISHLIST
            </h1>
          </div>
          <span className="text-xs font-medium tracking-widest text-[#8C8C8C] uppercase">
            {totalWishlistItems} {totalWishlistItems === 1 ? "ITEM" : "ITEMS"}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F1ECE3] flex items-center justify-center text-[#8C8C8C] mx-auto">
              <Heart size={22} strokeWidth={1.5} />
            </div>
            <h2 className="font-editorial text-2xl tracking-wide">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-xs text-[#555555]">
              Save your favorite unisex essentials as you browse to keep them in one place.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#333333] transition-colors"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-[#F8F5EF] border border-[#E5DDD2] text-left"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full bg-[#F1ECE3] overflow-hidden">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 bg-[#F8F5EF]/90 hover:bg-[#F8F5EF] text-[#0D0D0D] transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-widest text-[#8C8C8C] uppercase">
                      {product.categoryName}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-xs font-medium text-[#0D0D0D] line-clamp-1 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs font-semibold text-[#0D0D0D]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => setQuickAddProduct(product)}
                    className="w-full py-2.5 bg-[#0D0D0D] text-[#F8F5EF] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#333333] transition-colors text-center"
                  >
                    MOVE TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
