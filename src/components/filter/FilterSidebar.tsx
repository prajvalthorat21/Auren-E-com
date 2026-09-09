"use client";

import React from "react";
import { CategorySlug, GarmentSize, FitType, StyleTag } from "@/lib/types";

interface FilterSidebarProps {
  selectedCategories: CategorySlug[];
  onToggleCategory: (cat: CategorySlug) => void;
  selectedSizes: GarmentSize[];
  onToggleSize: (size: GarmentSize) => void;
  selectedColors: string[];
  onToggleColor: (colorName: string) => void;
  selectedFits: FitType[];
  onToggleFit: (fit: FitType) => void;
  selectedStyles: StyleTag[];
  onToggleStyle: (style: StyleTag) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  initialCategory?: CategorySlug;
}

const CATEGORIES: { slug: CategorySlug; name: string }[] = [
  { slug: "t-shirts", name: "T-Shirts" },
  { slug: "shirts", name: "Shirts" },
  { slug: "jeans", name: "Jeans" },
  { slug: "track-pants", name: "Track Pants" },
];

const SIZES: GarmentSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

const FITS: FitType[] = ["REGULAR", "RELAXED", "OVERSIZED"];

const STYLES: StyleTag[] = ["MINIMAL", "RELAXED", "STREET", "EVERYDAY", "MONOCHROME"];

const AVAILABLE_COLORS = [
  { name: "Black", hex: "#0D0D0D" },
  { name: "Charcoal", hex: "#333333" },
  { name: "Ivory", hex: "#F8F5EF" },
  { name: "Taupe", hex: "#C9B8A7" },
  { name: "Stone", hex: "#E5DDD2" },
  { name: "Indigo", hex: "#162032" },
  { name: "Olive", hex: "#3F453B" },
];

export function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  selectedSizes,
  onToggleSize,
  selectedColors,
  onToggleColor,
  selectedFits,
  onToggleFit,
  selectedStyles,
  onToggleStyle,
  priceRange,
  onPriceChange,
  onResetFilters,
  hasActiveFilters,
  initialCategory,
}: FilterSidebarProps) {
  return (
    <aside aria-label="Filters" className="w-full space-y-8 text-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD2]">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0D0D0D]">
          FILTERS
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] text-[#8C8C8C] hover:text-[#0D0D0D] uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* CATEGORY (Only show selectable checkboxes on /shop) */}
      {!initialCategory && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
            CATEGORY
          </h4>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isChecked = selectedCategories.includes(cat.slug);
              return (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2.5 text-xs text-[#0D0D0D] cursor-pointer hover:opacity-80 transition-opacity select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCategory(cat.slug)}
                    className="rounded-none border-[#C9B8A7] text-[#0D0D0D] focus:ring-0 w-3.5 h-3.5 accent-[#0D0D0D]"
                  />
                  <span className={isChecked ? "font-medium" : ""}>{cat.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* SIZES */}
      <div className="space-y-3 pt-2 border-t border-[#E5DDD2]">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
          SIZE
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = selectedSizes.some((s) => s.toUpperCase() === size.toUpperCase());
            return (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`py-1.5 text-xs font-medium tracking-wider uppercase border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0D0D0D] text-[#F8F5EF] border-[#0D0D0D]"
                    : "bg-[#F8F5EF] text-[#0D0D0D] border-[#E5DDD2] hover:border-[#0D0D0D]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* FIT */}
      <div className="space-y-3 pt-2 border-t border-[#E5DDD2]">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
          FIT
        </h4>
        <div className="space-y-2">
          {FITS.map((fit) => {
            const isChecked = selectedFits.some((f) => f.toUpperCase() === fit.toUpperCase());
            return (
              <label
                key={fit}
                className="flex items-center gap-2.5 text-xs text-[#0D0D0D] cursor-pointer hover:opacity-80 transition-opacity select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFit(fit)}
                  className="rounded-none border-[#C9B8A7] text-[#0D0D0D] focus:ring-0 w-3.5 h-3.5 accent-[#0D0D0D] cursor-pointer"
                />
                <span className={isChecked ? "font-medium" : ""}>{fit}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* COLORS (Circular swatches) */}
      <div className="space-y-3 pt-2 border-t border-[#E5DDD2]">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
          COLOR
        </h4>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((col) => {
            const isSelected = selectedColors.some((c) => c.toLowerCase() === col.name.toLowerCase());
            return (
              <button
                key={col.name}
                onClick={() => onToggleColor(col.name)}
                className={`w-6 h-6 rounded-full border transition-all relative cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-[#0D0D0D] ring-offset-2 border-[#0D0D0D]"
                    : "border-[#C9B8A7] hover:scale-110"
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Filter by ${col.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* STYLE DISCOVERY TAGS */}
      <div className="space-y-3 pt-2 border-t border-[#E5DDD2]">
        <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
          STYLE MOOD
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((style) => {
            const isSelected = selectedStyles.some((s) => s.toUpperCase() === style.toUpperCase());
            return (
              <button
                key={style}
                onClick={() => onToggleStyle(style)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0D0D0D] text-[#F8F5EF] border-[#0D0D0D]"
                    : "bg-[#F1ECE3] text-[#333333] border-[#E5DDD2] hover:border-[#0D0D0D]"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="space-y-3 pt-2 border-t border-[#E5DDD2]">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#555555]">
            PRICE
          </h4>
          <span className="text-xs font-medium">UP TO ₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="4000"
          step="200"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-1 bg-[#E5DDD2] rounded-none appearance-none cursor-pointer accent-[#0D0D0D]"
        />
        <div className="flex justify-between text-[10px] text-[#8C8C8C] tracking-wider">
          <span>₹1,000</span>
          <span>₹4,000+</span>
        </div>
      </div>
    </aside>
  );
}
