"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/filter/FilterSidebar";
import { FilterDrawer } from "@/components/filter/FilterDrawer";
import { ActiveFilters } from "@/components/filter/ActiveFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { CategorySlug, GarmentSize, FitType, StyleTag } from "@/lib/types";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface ShopClientProps {
  initialCategory?: CategorySlug;
  pageTitle?: string;
  pageSubtitle?: string;
}

export function ShopClient({
  initialCategory,
  pageTitle = "ALL COLLECTIONS",
  pageSubtitle = "Considered silhouettes and timeless unisex essentials designed for daily rotation.",
}: ShopClientProps) {
  const searchParams = useSearchParams();

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<GarmentSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<FitType[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<StyleTag[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4500]);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Mobile Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category when navigating to a new category route
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [initialCategory]);

  // Sync URL query params
  useEffect(() => {
    const styleParam = searchParams.get("style");
    if (styleParam) {
      const match = styleParam.toUpperCase() as StyleTag;
      setSelectedStyles([match]);
    }
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortBy(sortParam);
    }
    const searchParam = searchParams.get("search");
    if (searchParam) {
      // If search query is passed via URL
      const q = searchParam.toLowerCase().trim();
      const matchedColors = ["black", "charcoal", "ivory", "taupe", "stone", "indigo", "olive"].filter(
        (c) => q.includes(c)
      );
      if (matchedColors.length > 0) {
        setSelectedColors(matchedColors.map((c) => c.charAt(0).toUpperCase() + c.slice(1)));
      }
    }
  }, [searchParams]);

  // Toggle Handlers
  const handleToggleCategory = (cat: CategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleSize = (size: GarmentSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleToggleFit = (fit: FitType) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const handleToggleStyle = (style: StyleTag) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFits([]);
    setSelectedStyles([]);
    setPriceRange([0, 4500]);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Color (matching exact color names)
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some(
            (sc) => c.name.toLowerCase() === sc.toLowerCase()
          )
        )
      );
    }

    // Fit
    if (selectedFits.length > 0) {
      result = result.filter((p) => selectedFits.includes(p.fit));
    }

    // Style Tags
    if (selectedStyles.length > 0) {
      result = result.filter((p) =>
        p.styleTags.some((tag) => selectedStyles.includes(tag))
      );
    }

    // Price
    result = result.filter((p) => p.price <= priceRange[1]);

    // Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedFits,
    selectedStyles,
    priceRange,
    sortBy,
  ]);

  const hasActiveFilters =
    (initialCategory ? selectedCategories.length > 1 || !selectedCategories.includes(initialCategory) : selectedCategories.length > 0) ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFits.length > 0 ||
    selectedStyles.length > 0 ||
    priceRange[1] < 4500;

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 bg-[#F8F5EF] text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Compact Collection Header */}
        <div className="space-y-1 pb-3 border-b border-[#E5DDD2]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-3">
              <h1 className="font-editorial text-2xl sm:text-3xl tracking-tight text-[#0D0D0D]">
                {pageTitle}
              </h1>
              <span className="text-xs font-medium tracking-widest text-[#8C8C8C] uppercase">
                ({filteredProducts.length} {filteredProducts.length === 1 ? "PIECE" : "PIECES"})
              </span>
            </div>

            {/* Sort Dropdown on Header Toolbar */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase text-[#8C8C8C]">
                SORT:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#F1ECE3] border border-[#E5DDD2] text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 pr-7 focus:outline-none focus:border-[#0D0D0D] cursor-pointer"
                >
                  <option value="featured">FEATURED</option>
                  <option value="newest">NEWEST</option>
                  <option value="popular">MOST POPULAR</option>
                  <option value="price-low-high">PRICE: LOW TO HIGH</option>
                  <option value="price-high-low">PRICE: HIGH TO LOW</option>
                  <option value="rating">HIGHEST RATED</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#555555]"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-[#555555] font-light max-w-xl">
            {pageSubtitle}
          </p>

          {/* Active Filter Chips */}
          <ActiveFilters
            selectedCategories={selectedCategories}
            onRemoveCategory={handleToggleCategory}
            selectedSizes={selectedSizes}
            onRemoveSize={handleToggleSize}
            selectedColors={selectedColors}
            onRemoveColor={handleToggleColor}
            selectedFits={selectedFits}
            onRemoveFit={handleToggleFit}
            selectedStyles={selectedStyles}
            onRemoveStyle={handleToggleStyle}
            onClearAll={handleResetFilters}
            totalCount={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-2">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F1ECE3] border border-[#E5DDD2] text-xs font-semibold tracking-wider uppercase hover:border-[#0D0D0D] transition-colors"
          >
            <SlidersHorizontal size={13} />
            <span>FILTERS</span>
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]" />}
          </button>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Left Filter Sidebar on Desktop */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 max-h-[85vh] overflow-y-auto pr-4">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedColors={selectedColors}
              onToggleColor={handleToggleColor}
              selectedFits={selectedFits}
              onToggleFit={handleToggleFit}
              selectedStyles={selectedStyles}
              onToggleStyle={handleToggleStyle}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        selectedSizes={selectedSizes}
        onToggleSize={handleToggleSize}
        selectedColors={selectedColors}
        onToggleColor={handleToggleColor}
        selectedFits={selectedFits}
        onToggleFit={handleToggleFit}
        selectedStyles={selectedStyles}
        onToggleStyle={handleToggleStyle}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={filteredProducts.length}
      />
    </div>
  );
}
