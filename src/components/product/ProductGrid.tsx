import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  onClearFilters?: () => void;
}

export function ProductGrid({ products, columns = 2, onClearFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto">
        <h3 className="font-editorial text-2xl tracking-wide text-[#0D0D0D]">NO PIECES FOUND</h3>
        <p className="text-xs text-[#555555] leading-relaxed">
          Try adjusting your filters or clearing one of your selections.
        </p>
        {onClearFilters && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onClearFilters}
              className="px-6 py-3 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14 ${
        columns === 4
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : columns === 3
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2"
      }`}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
