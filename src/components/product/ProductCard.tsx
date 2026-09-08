"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/common/Badge";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setQuickAddProduct } = useUI();

  const isLiked = isInWishlist(product.id);
  const primaryImg = product.images[0] || "/images/placeholder.jpg";
  const hoverImg = product.images[1] || primaryImg;

  return (
    <div
      className="group relative flex flex-col w-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F1ECE3]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          {/* Primary Image */}
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.03] ${
              isHovered && hoverImg !== primaryImg ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Hover Image Cross-Fade */}
          {hoverImg !== primaryImg && (
            <Image
              src={hoverImg}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.03] absolute inset-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Minimal Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          {product.isTrending && !product.isNew && <Badge variant="trending">TRENDING</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 bg-[#F8F5EF]/85 hover:bg-[#F8F5EF] text-[#0D0D0D] transition-all duration-200 rounded-none shadow-2xs"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={isLiked ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-[#0D0D0D]"}
          />
        </button>

        {/* Subtle Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickAddProduct(product);
            }}
            className="w-full py-2.5 px-3 bg-[#0D0D0D] text-[#F8F5EF] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer"
          >
            <Plus size={13} />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>

      {/* Product Card Details */}
      <div className="pt-2.5 pb-1 flex flex-col space-y-1">
        {/* Subtle Color Swatch Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1 pb-0.5">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColorIndex(index);
                }}
                className={`w-2 h-2 rounded-full border transition-all ${
                  selectedColorIndex === index
                    ? "ring-1 ring-[#0D0D0D] ring-offset-1 border-[#0D0D0D]"
                    : "border-[#C9B8A7]"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              />
            ))}
            <span className="text-[9px] text-[#8C8C8C] pl-1 tracking-wider uppercase">
              {product.colors.length} {product.colors.length === 1 ? "Color" : "Colors"}
            </span>
          </div>
        )}

        <Link
          href={`/product/${product.slug}`}
          className="text-xs font-medium text-[#0D0D0D] tracking-wide hover:opacity-75 transition-opacity line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0D0D0D] tracking-wider">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[11px] text-[#8C8C8C] line-through tracking-wider">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
