import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductRecommendationsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function ProductRecommendations({
  currentProduct,
  allProducts,
}: ProductRecommendationsProps) {
  // Complete the look: different category
  const completeTheLook = allProducts
    .filter((p) => p.category !== currentProduct.category)
    .slice(0, 4);

  // You may also like: same category or style
  const youMayAlsoLike = allProducts
    .filter((p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.fit === currentProduct.fit))
    .slice(0, 4);

  return (
    <div className="space-y-16 pt-16 border-t border-[#E5DDD2]">
      {/* Complete The Look */}
      <div className="space-y-8">
        <div className="space-y-1 pb-4 border-b border-[#E5DDD2]">
          <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
            STYLIST CURATION
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
            COMPLETE THE LOOK
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">
          {completeTheLook.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      {/* You May Also Like */}
      <div className="space-y-8">
        <div className="space-y-1 pb-4 border-b border-[#E5DDD2]">
          <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
            SIMILAR SILHOUETTES
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
            YOU MAY ALSO LIKE
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">
          {youMayAlsoLike.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
