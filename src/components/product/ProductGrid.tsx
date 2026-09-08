import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <p className="font-editorial text-2xl text-[#0D0D0D]">NO PIECES MATCH YOUR CRITERIA</p>
        <p className="text-xs text-[#555555]">Try clearing some filters or exploring another category.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${
        columns === 4
          ? "md:grid-cols-3 lg:grid-cols-4"
          : columns === 3
          ? "md:grid-cols-3"
          : "md:grid-cols-2"
      }`}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
