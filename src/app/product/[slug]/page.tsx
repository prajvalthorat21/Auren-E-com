import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductRecommendations } from "@/components/product/ProductRecommendations";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | AUREN" };

  return {
    title: `${product.name} | AUREN`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 lg:py-8 bg-[#F8F5EF] text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-[#8C8C8C] tracking-wider uppercase">
          <Link href="/" className="hover:text-[#0D0D0D] transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-[#0D0D0D] transition-colors">
            COLLECTIONS
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-[#0D0D0D] transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#0D0D0D] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main PDP Grid: Gallery Left + Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Image Gallery (Normal document flow on mobile/tablet, sticky on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Sticky Product Info */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Recommendations */}
        <ProductRecommendations currentProduct={product} allProducts={PRODUCTS} />
      </div>
    </div>
  );
}
