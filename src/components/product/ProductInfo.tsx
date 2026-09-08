"use client";

import React, { useState } from "react";
import { Heart, Star, ChevronDown, Check, ShieldCheck, RefreshCw, Truck } from "lucide-react";
import { Product, ProductColor, GarmentSize } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Badge } from "@/components/common/Badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<GarmentSize>(product.sizes[1] || product.sizes[0] || "M");
  const [openAccordion, setOpenAccordion] = useState<string | null>("desc");

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setIsSizeGuideOpen, showToast } = useUI();

  const isLiked = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

  const handleAddToBag = () => {
    addItem(product, selectedColor, selectedSize, 1);
    showToast(`Added ${product.name} (${selectedSize}) to bag`);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex flex-col space-y-6 text-[#0D0D0D]">
      {/* Category & Badges */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8C8C] uppercase">
            {product.categoryName}
          </span>
          {product.isNew && <Badge variant="new">NEW IN</Badge>}
          {product.isTrending && <Badge variant="trending">TRENDING</Badge>}
        </div>

        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
          {product.name}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 pt-1 text-xs text-[#555555]">
          <div className="flex items-center text-[#0D0D0D]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.floor(product.rating) ? "fill-[#0D0D0D]" : "text-[#C9B8A7]"}
              />
            ))}
          </div>
          <span className="font-medium text-[#0D0D0D]">{product.rating}</span>
          <span className="text-[#8C8C8C]">({product.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-3 pb-3 border-b border-[#E5DDD2]">
        <span className="font-semibold text-xl sm:text-2xl tracking-wider text-[#0D0D0D]">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <>
            <span className="text-sm text-[#8C8C8C] line-through tracking-wider">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase">
              ({discount}% OFF)
            </span>
          </>
        )}
        <span className="text-[11px] text-[#8C8C8C] ml-auto">INCL. OF ALL TAXES</span>
      </div>

      {/* COLOR SELECTION */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="tracking-widest uppercase font-semibold text-[#555555]">
            COLOR: <span className="text-[#0D0D0D] font-normal">{selectedColor.name}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? "ring-2 ring-[#0D0D0D] ring-offset-2 border-[#0D0D0D]"
                    : "border-[#C9B8A7] hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              >
                {isSelected && (
                  <Check
                    size={14}
                    className={
                      color.hex.toLowerCase() === "#ffffff" || color.hex.toLowerCase().startsWith("#f")
                        ? "text-black"
                        : "text-white"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE SELECTION & SIZE GUIDE */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="tracking-widest uppercase font-semibold text-[#555555]">
            SELECT SIZE: <span className="text-[#0D0D0D] font-normal">{selectedSize}</span>
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[11px] uppercase tracking-wider text-[#0D0D0D] font-medium underline hover:opacity-70 transition-opacity"
          >
            SIZE GUIDE
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 text-xs font-semibold tracking-wider uppercase border transition-all ${
                  isSelected
                    ? "bg-[#0D0D0D] text-[#F8F5EF] border-[#0D0D0D]"
                    : "bg-[#F1ECE3] text-[#0D0D0D] border-[#E5DDD2] hover:border-[#0D0D0D]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-[#8C8C8C] tracking-wide">
          FIT: <span className="text-[#0D0D0D] font-medium">{product.fit}</span> (Unisex silhouette)
        </p>
      </div>

      {/* CTA BUTTONS */}
      <div className="space-y-3 pt-3">
        <button
          onClick={handleAddToBag}
          className="w-full py-4 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>ADD TO BAG</span>
          <span>•</span>
          <span>{formatPrice(product.price)}</span>
        </button>

        <button
          onClick={() => toggleWishlist(product)}
          className="w-full py-3.5 bg-transparent border border-[#0D0D0D] text-[#0D0D0D] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#F1ECE3] transition-colors flex items-center justify-center gap-2"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isLiked ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-[#0D0D0D]"}
          />
          <span>{isLiked ? "SAVED IN WISHLIST" : "ADD TO WISHLIST"}</span>
        </button>
      </div>

      {/* Value Badges */}
      <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E5DDD2] text-center text-[10px] text-[#555555] tracking-wider uppercase">
        <div className="flex flex-col items-center gap-1.5">
          <Truck size={16} className="text-[#0D0D0D]" />
          <span>FREE SHIPPING &gt; ₹999</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <RefreshCw size={16} className="text-[#0D0D0D]" />
          <span>7-DAY DOORSTEP RETURNS</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <ShieldCheck size={16} className="text-[#0D0D0D]" />
          <span>100% AUTHENTIC AUREN</span>
        </div>
      </div>

      {/* ACCORDIONS */}
      <div className="divide-y divide-[#E5DDD2] border-b border-[#E5DDD2]">
        {/* Description Accordion */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion("desc")}
            className="w-full flex justify-between items-center text-xs font-semibold tracking-[0.2em] uppercase text-left text-[#0D0D0D]"
          >
            <span>DESCRIPTION & SILHOUETTE</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                openAccordion === "desc" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "desc" && (
            <div className="pt-3 space-y-3 text-xs text-[#555555] leading-relaxed animate-fade-in">
              <p>{product.description}</p>
              {product.details && product.details.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 text-[#555555]">
                  {product.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Material & Care */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion("care")}
            className="w-full flex justify-between items-center text-xs font-semibold tracking-[0.2em] uppercase text-left text-[#0D0D0D]"
          >
            <span>MATERIAL & GARMENT CARE</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                openAccordion === "care" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "care" && (
            <div className="pt-3 space-y-3 text-xs text-[#555555] leading-relaxed animate-fade-in">
              <p>
                <strong className="text-[#0D0D0D] uppercase font-semibold">Composition: </strong>
                {product.material}
              </p>
              {product.careInstructions && (
                <ul className="list-disc pl-4 space-y-1">
                  {product.careInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion("ship")}
            className="w-full flex justify-between items-center text-xs font-semibold tracking-[0.2em] uppercase text-left text-[#0D0D0D]"
          >
            <span>SHIPPING & EASY 7-DAY RETURNS</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                openAccordion === "ship" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "ship" && (
            <div className="pt-3 space-y-2 text-xs text-[#555555] leading-relaxed animate-fade-in">
              <p>• Standard Express Delivery: 2-4 business days across India.</p>
              <p>• Complimentary express shipping on all orders over ₹999.</p>
              <p>• Hassle-free 7-day doorstep exchange and return policy on unworn items with tags intact.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
