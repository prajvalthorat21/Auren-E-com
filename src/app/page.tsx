import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryBanners } from "@/components/home/CategoryBanners";
import { NewInSection } from "@/components/home/NewInSection";
import { EditorialEdit } from "@/components/home/EditorialEdit";
import { TrendingSection } from "@/components/home/TrendingSection";
import { StyleDiscovery } from "@/components/home/StyleDiscovery";
import { BrandStatement } from "@/components/home/BrandStatement";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. CATEGORY SECTION */}
      <CategoryBanners />

      {/* 3. NEW IN SECTION */}
      <NewInSection />

      {/* 4. THE AUREN EDIT (Editorial Brand Section) */}
      <EditorialEdit />

      {/* 5. TRENDING SECTION */}
      <TrendingSection />

      {/* 6. STYLE DISCOVERY */}
      <StyleDiscovery />

      {/* 7. BRAND STATEMENT */}
      <BrandStatement />

      {/* 8. NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
