import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getNewInProducts } from "@/data/products";

export function NewInSection() {
  const newProducts = getNewInProducts().slice(0, 4);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F8F5EF] border-t border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5DDD2] gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
              JUST DROPPED
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
              NEW IN
            </h2>
            <p className="text-xs text-[#555555]">
              The latest pieces from AUREN.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D] hover:opacity-70 transition-opacity flex items-center gap-1.5"
          >
            <span>VIEW ALL NEW IN</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={newProducts} columns={2} />
      </div>
    </section>
  );
}
