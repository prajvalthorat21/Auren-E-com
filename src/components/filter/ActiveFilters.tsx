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
  onClearAll: () => void;
  totalCount: number;
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
  onClearAll,
  totalCount,
}: ActiveFiltersProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFits.length > 0 ||
    selectedStyles.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2">
      <span className="text-[10px] tracking-widest uppercase text-[#8C8C8C] mr-1">
        APPLIED ({totalCount}):
      </span>

      {selectedCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onRemoveCategory(cat)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors"
        >
          <span>{CATEGORY_LABELS[cat] || cat}</span>
          <X size={11} />
        </button>
      ))}

      {selectedSizes.map((size) => (
        <button
          key={size}
          onClick={() => onRemoveSize(size)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors"
        >
          <span>SIZE: {size}</span>
          <X size={11} />
        </button>
      ))}

      {selectedColors.map((color) => (
        <button
          key={color}
          onClick={() => onRemoveColor(color)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors"
        >
          <span>COLOR: {color}</span>
          <X size={11} />
        </button>
      ))}

      {selectedFits.map((fit) => (
        <button
          key={fit}
          onClick={() => onRemoveFit(fit)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors"
        >
          <span>FIT: {fit}</span>
          <X size={11} />
        </button>
      ))}

      {selectedStyles.map((style) => (
        <button
          key={style}
          onClick={() => onRemoveStyle(style)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F1ECE3] border border-[#E5DDD2] text-[10px] uppercase font-medium tracking-wider text-[#0D0D0D] hover:bg-[#E5DDD2] transition-colors"
        >
          <span>STYLE: {style}</span>
          <X size={11} />
        </button>
      ))}

      <button
        onClick={onClearAll}
        className="text-[10px] text-[#8C8C8C] hover:text-[#0D0D0D] uppercase font-medium tracking-wider ml-2 underline cursor-pointer"
      >
        CLEAR ALL
      </button>
    </div>
  );
}
