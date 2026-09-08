import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getTrendingProducts } from "@/data/products";

export function TrendingSection() {
  const trendingProducts = getTrendingProducts().slice(0, 8);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E5DDD2] gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
              COMMUNITY FAVORITES
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
              TRENDING NOW
            </h2>
            <p className="text-xs text-[#555555]">
              Most coveted silhouettes in high rotation.
            </p>
          </div>

          <Link
            href="/shop?sort=popular"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D] hover:opacity-70 transition-opacity flex items-center gap-1.5"
          >
            <span>VIEW ALL TRENDING</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={trendingProducts} columns={4} />
      </div>
    </section>
  );
}
