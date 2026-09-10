"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Mobile Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // 1. DERIVE ACTIVE FILTERS DIRECTLY FROM URL SEARCH PARAMS
  const selectedCategories = useMemo<CategorySlug[]>(() => {
    if (initialCategory) return [initialCategory];
    const catParam = searchParams.get("category");
    if (!catParam) return [];
    return catParam.split(",").filter(Boolean) as CategorySlug[];
  }, [searchParams, initialCategory]);

  const selectedSizes = useMemo<GarmentSize[]>(() => {
    const sizeParam = searchParams.get("size");
    if (!sizeParam) return [];
    return sizeParam
      .split(",")
      .map((s) => s.toUpperCase() as GarmentSize)
      .filter(Boolean);
  }, [searchParams]);

  const selectedColors = useMemo<string[]>(() => {
    const colorParam = searchParams.get("color");
    if (!colorParam) return [];
    return colorParam.split(",").filter(Boolean);
  }, [searchParams]);

  const selectedFits = useMemo<FitType[]>(() => {
    const fitParam = searchParams.get("fit");
    if (!fitParam) return [];
    return fitParam
      .split(",")
      .map((f) => f.toUpperCase() as FitType)
      .filter(Boolean);
  }, [searchParams]);

  const selectedStyles = useMemo<StyleTag[]>(() => {
    const styleParam = searchParams.get("style");
    if (!styleParam) return [];
    return styleParam
      .split(",")
      .map((s) => s.toUpperCase() as StyleTag)
      .filter(Boolean);
  }, [searchParams]);

  const maxPrice = useMemo<number>(() => {
    const priceParam = searchParams.get("maxPrice") || searchParams.get("price");
    if (!priceParam) return 150;
    const parsed = Number(priceParam);
    return isNaN(parsed) ? 150 : parsed;
  }, [searchParams]);

  const priceRange = useMemo<[number, number]>(() => [0, maxPrice], [maxPrice]);

  const sortBy = useMemo<string>(() => {
    return searchParams.get("sort") || "featured";
  }, [searchParams]);

  const searchQuery = useMemo<string>(() => {
    return searchParams.get("search") || searchParams.get("q") || "";
  }, [searchParams]);

  // 2. CENTRALIZED URL UPDATE FUNCTION
  const updateUrlFilters = useCallback(
    (updates: {
      categories?: CategorySlug[];
      sizes?: GarmentSize[];
      colors?: string[];
      fits?: FitType[];
      styles?: StyleTag[];
      maxPrice?: number;
      sort?: string;
      clearAll?: boolean;
    }) => {
      const params = new URLSearchParams();

      if (updates.clearAll) {
        if (sortBy && sortBy !== "featured") params.set("sort", sortBy);
        if (searchQuery) params.set("search", searchQuery);
        const queryStr = params.toString();
        router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
        return;
      }

      const newCats = updates.categories !== undefined ? updates.categories : selectedCategories;
      const newSizes = updates.sizes !== undefined ? updates.sizes : selectedSizes;
      const newColors = updates.colors !== undefined ? updates.colors : selectedColors;
      const newFits = updates.fits !== undefined ? updates.fits : selectedFits;
      const newStyles = updates.styles !== undefined ? updates.styles : selectedStyles;
      const newPrice = updates.maxPrice !== undefined ? updates.maxPrice : maxPrice;
      const newSort = updates.sort !== undefined ? updates.sort : sortBy;

      if (!initialCategory && newCats.length > 0) {
        params.set("category", newCats.map((c) => c.toLowerCase()).join(","));
      }
      if (newSizes.length > 0) {
        params.set("size", newSizes.map((s) => s.toLowerCase()).join(","));
      }
      if (newColors.length > 0) {
        params.set("color", newColors.map((c) => c.toLowerCase()).join(","));
      }
      if (newFits.length > 0) {
        params.set("fit", newFits.map((f) => f.toLowerCase()).join(","));
      }
      if (newStyles.length > 0) {
        params.set("style", newStyles.map((s) => s.toLowerCase()).join(","));
      }
      if (newPrice < 150) {
        params.set("maxPrice", String(newPrice));
      }
      if (newSort && newSort !== "featured") {
        params.set("sort", newSort);
      }
      if (searchQuery) {
        params.set("search", searchQuery);
      }

      const queryStr = params.toString();
      router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
    },
    [
      pathname,
      router,
      initialCategory,
      selectedCategories,
      selectedSizes,
      selectedColors,
      selectedFits,
      selectedStyles,
      maxPrice,
      sortBy,
      searchQuery,
    ]
  );

  // 3. TOGGLE / ACTION HANDLERS
  const handleToggleCategory = (cat: CategorySlug) => {
    if (initialCategory) return;
    const catLower = cat.toLowerCase() as CategorySlug;
    const updated = selectedCategories.some((c) => c.toLowerCase() === catLower)
      ? selectedCategories.filter((c) => c.toLowerCase() !== catLower)
      : [...selectedCategories, catLower];
    updateUrlFilters({ categories: updated });
  };

  const handleToggleSize = (size: GarmentSize) => {
    const sizeUpper = size.toUpperCase() as GarmentSize;
    const updated = selectedSizes.some((s) => s.toUpperCase() === sizeUpper)
      ? selectedSizes.filter((s) => s.toUpperCase() !== sizeUpper)
      : [...selectedSizes, sizeUpper];
    updateUrlFilters({ sizes: updated });
  };

  const handleToggleColor = (colorName: string) => {
    const updated = selectedColors.some((c) => c.toLowerCase() === colorName.toLowerCase())
      ? selectedColors.filter((c) => c.toLowerCase() !== colorName.toLowerCase())
      : [...selectedColors, colorName];
    updateUrlFilters({ colors: updated });
  };

  const handleToggleFit = (fit: FitType) => {
    const fitUpper = fit.toUpperCase() as FitType;
    const updated = selectedFits.some((f) => f.toUpperCase() === fitUpper)
      ? selectedFits.filter((f) => f.toUpperCase() !== fitUpper)
      : [...selectedFits, fitUpper];
    updateUrlFilters({ fits: updated });
  };

  const handleToggleStyle = (style: StyleTag) => {
    const styleUpper = style.toUpperCase() as StyleTag;
    const updated = selectedStyles.some((s) => s.toUpperCase() === styleUpper)
      ? selectedStyles.filter((s) => s.toUpperCase() !== styleUpper)
      : [...selectedStyles, styleUpper];
    updateUrlFilters({ styles: updated });
  };

  const handlePriceChange = (range: [number, number]) => {
    updateUrlFilters({ maxPrice: range[1] });
  };

  const handleResetPrice = () => {
    updateUrlFilters({ maxPrice: 150 });
  };

  const handleSortChange = (newSort: string) => {
    updateUrlFilters({ sort: newSort });
  };

  const handleResetFilters = () => {
    updateUrlFilters({ clearAll: true });
  };

  // 4. FILTER COMBINATION & SORTING LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Size Filter (OR within sizes)
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Color Filter (OR within colors)
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) => sc.toLowerCase() === c.name.toLowerCase())
        )
      );
    }

    // Fit Filter (OR within fits)
    if (selectedFits.length > 0) {
      result = result.filter((p) => selectedFits.includes(p.fit));
    }

    // Style Mood Filter (OR within styles)
    if (selectedStyles.length > 0) {
      result = result.filter((p) =>
        p.styleTags.some((tag) => selectedStyles.includes(tag))
      );
    }

    // Price Filter
    if (maxPrice < 4500) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // Search Query (if passed)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

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
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  const hasActiveFilters =
    (!initialCategory && selectedCategories.length > 0) ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFits.length > 0 ||
    selectedStyles.length > 0 ||
    maxPrice < 4500;

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
              <label htmlFor="shop-sort-select" className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase text-[#8C8C8C]">
                SORT:
              </label>
              <div className="relative">
                <select
                  id="shop-sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-[#F1ECE3] border border-[#E5DDD2] text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 pr-7 focus:outline-none focus:border-[#0D0D0D] cursor-pointer"
                  aria-label="Sort collection pieces"
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
            priceRange={priceRange}
            onResetPrice={handleResetPrice}
            onClearAll={handleResetFilters}
            initialCategory={initialCategory}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-2">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F1ECE3] border border-[#E5DDD2] text-xs font-semibold tracking-wider uppercase hover:border-[#0D0D0D] transition-colors cursor-pointer"
            aria-label="Open mobile filter options"
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
              onPriceChange={handlePriceChange}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
              initialCategory={initialCategory}
            />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            <ProductGrid
              products={filteredProducts}
              columns={2}
              onClearFilters={hasActiveFilters ? handleResetFilters : undefined}
            />
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
        onPriceChange={handlePriceChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={filteredProducts.length}
        initialCategory={initialCategory}
      />
    </div>
  );
}
