"use client";

import React from "react";
import { X } from "lucide-react";
import { CategorySlug, GarmentSize, FitType, StyleTag } from "@/lib/types";

interface ActiveFiltersProps {
  selectedCategories: CategorySlug[];
  onRemoveCategory: (cat: CategorySlug) => void;
  selectedSizes: GarmentSize[];
  onRemoveSize: (size: GarmentSize) => void;
  selectedColors: string[];
  onRemoveColor: (color: string) => void;
  selectedFits: FitType[];
  onRemoveFit: (fit: FitType) => void;
  selectedStyles: StyleTag[];
  onRemoveStyle: (style: StyleTag) => void;
  priceRange: [number, number];
  onResetPrice?: () => void;
  onClearAll: () => void;
  initialCategory?: CategorySlug;
}

const CATEGORY_LABELS: Record<CategorySlug, string> = {
  "t-shirts": "T-SHIRTS",
  shirts: "SHIRTS",
  jeans: "JEANS",
  "track-pants": "TRACK PANTS",
};

export function ActiveFilters({
  selectedCategories,
  onRemoveCategory,
  selectedSizes,
  onRemoveSize,
  selectedColors,
  onRemoveColor,
  selectedFits,
  onRemoveFit,
  selectedStyles,
  onRemoveStyle,
  priceRange,
  onResetPrice,
  onClearAll,
  initialCategory,
}: ActiveFiltersProps) {
  // Only count categories as active removable filters if they are manually selected on /shop
  const activeCategories = initialCategory
    ? selectedCategories.filter((c) => c !== initialCategory)
    : selectedCategories;

  const hasPriceFilter = priceRange[1] < 4500;

  const totalAppliedCount =
    activeCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedFits.length +
    selectedStyles.length +
    (hasPriceFilter ? 1 : 0);

  if (totalAppliedCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2" role="region" aria-label="Active filters">
      <span className="text-[10px] tracking-widest uppercase text-[#8C8C8C] mr-1 font-semibold">
        APPLIED ({totalAppliedCount}):
      </span>

      {/* Categories (if manually filtered on /shop) */}
      {activeCategories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onRemoveCategory(cat)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label={`Remove ${CATEGORY_LABELS[cat] || cat} category filter`}
        >
          <span>{CATEGORY_LABELS[cat] || cat}</span>
          <X size={11} />
        </button>
      ))}

      {/* Sizes */}
      {selectedSizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onRemoveSize(size)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label={`Remove size ${size} filter`}
        >
          <span>SIZE: {size}</span>
          <X size={11} />
        </button>
      ))}

      {/* Colors */}
      {selectedColors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onRemoveColor(color)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label={`Remove color ${color} filter`}
        >
          <span>COLOR: {color}</span>
          <X size={11} />
        </button>
      ))}

      {/* Fits */}
      {selectedFits.map((fit) => (
        <button
          key={fit}
          type="button"
          onClick={() => onRemoveFit(fit)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label={`Remove fit ${fit} filter`}
        >
          <span>FIT: {fit}</span>
          <X size={11} />
        </button>
      ))}

      {/* Styles */}
      {selectedStyles.map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => onRemoveStyle(style)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label={`Remove style ${style} filter`}
        >
          <span>STYLE: {style}</span>
          <X size={11} />
        </button>
      ))}

      {/* Price */}
      {hasPriceFilter && onResetPrice && (
        <button
          type="button"
          onClick={onResetPrice}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors cursor-pointer"
          aria-label="Remove price filter"
        >
          <span>PRICE: ≤ ₹{priceRange[1]}</span>
          <X size={11} />
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="text-[10px] text-[#8C8C8C] hover:text-[#0D0D0D] uppercase font-medium tracking-wider ml-2 underline cursor-pointer"
        aria-label="Clear all active filters"
      >
        CLEAR ALL
      </button>
    </div>
  );
}
