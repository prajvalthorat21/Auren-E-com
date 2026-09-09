"use client";

import React from "react";
import { X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { CategorySlug, GarmentSize, FitType, StyleTag } from "@/lib/types";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
  totalResults: number;
  initialCategory?: CategorySlug;
}

export function FilterDrawer({
  isOpen,
  onClose,
  totalResults,
  initialCategory,
  ...sidebarProps
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in lg:hidden">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-xs sm:max-w-sm bg-[#F8F5EF] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto animate-slide-right">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD2]">
          <h3 className="font-editorial text-xl tracking-wide">FILTERS</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#0D0D0D] hover:opacity-60 transition-opacity"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-6 flex-1 overflow-y-auto">
          <FilterSidebar initialCategory={initialCategory} {...sidebarProps} />
        </div>

        <div className="pt-4 border-t border-[#E5DDD2]">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors text-center"
          >
            SHOW {totalResults} RESULTS
          </button>
        </div>
      </div>
    </div>
  );
}
