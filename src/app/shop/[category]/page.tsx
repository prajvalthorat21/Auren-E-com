import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopClient } from "@/components/shop/ShopClient";
import { CATEGORIES } from "@/data/categories";
import { CategorySlug } from "@/lib/types";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Collection Not Found | AUREN" };

  return {
    title: `${cat.name} | AUREN Unisex Wardrobe`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF] text-[#8C8C8C] text-xs uppercase tracking-widest">
          LOADING {cat.name}...
        </div>
      }
    >
      <ShopClient
        initialCategory={cat.slug as CategorySlug}
        pageTitle={cat.name}
        pageSubtitle={cat.description}
      />
    </Suspense>
  );
}
