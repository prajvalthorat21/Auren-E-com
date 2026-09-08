"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { GarmentSize, ProductColor } from "@/lib/types";

export function QuickAddModal() {
  const { quickAddProduct, setQuickAddProduct, showToast } = useUI();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<GarmentSize | null>(null);

  useEffect(() => {
    if (quickAddProduct) {
      setSelectedColor(quickAddProduct.colors[0] || null);
      setSelectedSize(quickAddProduct.sizes[1] || quickAddProduct.sizes[0] || "M");
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    addItem(quickAddProduct, selectedColor, selectedSize, 1);
    setQuickAddProduct(null);
    showToast(`Added ${quickAddProduct.name} (${selectedSize}) to bag`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#F8F5EF] border border-[#E5DDD2] p-6 shadow-2xl space-y-6 text-[#0D0D0D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 p-1 text-[#0D0D0D] hover:opacity-60 transition-opacity"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex gap-5">
          {/* Product Thumbnail */}
          <div className="relative w-24 h-32 flex-shrink-0 bg-[#F1ECE3] overflow-hidden">
            <Image
              src={quickAddProduct.images[0]}
              alt={quickAddProduct.name}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8C8C]">
              {quickAddProduct.categoryName}
            </p>
            <h3 className="text-sm font-medium leading-snug">{quickAddProduct.name}</h3>
            <p className="text-sm font-semibold pt-1">{formatPrice(quickAddProduct.price)}</p>
            <p className="text-[11px] text-[#555555] uppercase tracking-wider pt-0.5">
              FIT: <span className="font-medium text-[#0D0D0D]">{quickAddProduct.fit}</span>
            </p>
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="tracking-wider uppercase text-[#8C8C8C]">COLOR</span>
            <span className="font-medium">{selectedColor?.name}</span>
          </div>
          <div className="flex gap-2">
            {quickAddProduct.colors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isSelected ? "ring-2 ring-[#0D0D0D] ring-offset-2 border-[#0D0D0D]" : "border-[#C9B8A7]"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      className={color.hex.toLowerCase() === "#ffffff" || color.hex.toLowerCase().startsWith("#f") ? "text-black" : "text-white"}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="tracking-wider uppercase text-[#8C8C8C]">SIZE</span>
            <span className="font-medium">{selectedSize}</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {quickAddProduct.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-medium tracking-wider uppercase border transition-all ${
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
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize}
          className="w-full py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors disabled:opacity-50"
        >
          ADD TO BAG • {formatPrice(quickAddProduct.price)}
        </button>
      </div>
    </div>
  );
}
