import React, { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Collections | AUREN",
  description: "Explore the full AUREN unisex collection — heavyweight tees, architectural shirts, raw selvedge denim, and French terry track pants.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF] text-[#8C8C8C] text-xs uppercase tracking-widest">
          LOADING AUREN COLLECTION...
        </div>
      }
    >
      <ShopClient
        pageTitle="ALL COLLECTIONS"
        pageSubtitle="Considered silhouettes and timeless unisex essentials designed for daily rotation."
      />
    </Suspense>
  );
}
