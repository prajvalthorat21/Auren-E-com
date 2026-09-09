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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setQuickAddProduct } = useUI();

  const isLiked = isInWishlist(product.id);
  const primaryImg = product.images[0] || "/images/placeholder.jpg";
  const hoverImg = product.images[1] || primaryImg;
  const hasSecondary = hoverImg && hoverImg !== primaryImg;

  return (
    <div className="group relative flex flex-col w-full max-w-[440px] mx-auto text-left">
      {/* Product Image Container (3:4 Vertical Photography Aspect Ratio) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F1ECE3] flex items-center justify-center">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative focus:outline-hidden"
          tabIndex={0}
          aria-label={product.name}
        >
          {/* Primary On-Model Photograph (Always default; cross-fades out strictly on desktop hover) */}
          <Image
            src={primaryImg}
            alt={`${product.name} — On-Model Editorial`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 600px"
            className={`object-contain object-center absolute inset-0 w-full h-full transition-opacity duration-400 ease-in-out ${
              hasSecondary ? "opacity-100 md:group-hover:opacity-0" : "opacity-100"
            }`}
          />

          {/* Secondary Product-Only Photograph (Hidden by default; cross-fades in strictly on desktop hover) */}
          {hasSecondary && (
            <Image
              src={hoverImg}
              alt={`${product.name} — Product Flat Lay`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 600px"
              className="object-contain object-center absolute inset-0 w-full h-full opacity-0 transition-opacity duration-400 ease-in-out md:group-hover:opacity-100 pointer-events-none"
            />
          )}
        </Link>

        {/* Minimal Badges (Positioned in upper-left corner clear of model face and hair) */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          {!product.isNew && product.isTrending && <Badge variant="trending">TRENDING</Badge>}
          {!product.isNew && !product.isTrending && product.compareAtPrice && product.compareAtPrice > product.price && (
            <Badge variant="sale">SALE</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 bg-[#F8F5EF]/90 hover:bg-[#F8F5EF] text-[#0D0D0D] transition-all duration-200 shadow-2xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#0D0D0D]"
          aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={isLiked ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-[#0D0D0D]"}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickAddProduct(product);
            }}
            className="w-full py-2.5 px-3 bg-[#0D0D0D] text-[#F8F5EF] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer focus:outline-hidden"
            aria-label={`Quick add ${product.name} to bag`}
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
          <div className="flex items-center gap-1.5 pb-0.5" role="group" aria-label="Available colors">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-all ${
                  selectedColorIndex === index
                    ? "ring-1 ring-[#0D0D0D] ring-offset-1 border-[#0D0D0D]"
                    : "border-[#C9B8A7] hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color option ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C8C8C] pl-1 tracking-wider uppercase font-light">
              {product.colors.length} {product.colors.length === 1 ? "Color" : "Colors"}
            </span>
          </div>
        )}

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-medium text-[#0D0D0D] tracking-wide hover:opacity-75 transition-opacity line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-[#0D0D0D] tracking-wider">
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
