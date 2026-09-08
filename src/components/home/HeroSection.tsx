import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ASSET_IMAGES } from "@/data/productImages";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-end pb-16 sm:pb-24 bg-[#0D0D0D] overflow-hidden">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={ASSET_IMAGES.hero}
          alt="AUREN Editorial Fashion Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_10%] sm:object-[70%_center] md:object-center opacity-90"
        />
        {/* Editorial Responsive Gradient Overlay (Protects Left Text without Dimming Models) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/35 sm:to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-6 text-[#F8F5EF]">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#E5DDD2] block">
              AUTUMN / WINTER ROTATION
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-[#F8F5EF]">
              EVERYDAY, <br />
              <span className="italic font-light">ELEVATED.</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#E5DDD2]/90 max-w-lg leading-relaxed font-light">
            Modern essentials designed for wherever the day takes you. Considered unisex silhouettes and understated fabric craftsmanship.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/shop?sort=newest"
              className="px-8 py-4 bg-[#F8F5EF] text-[#0D0D0D] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#E5DDD2] transition-colors flex items-center justify-center gap-2 text-center shadow-lg"
            >
              <span>SHOP NEW IN</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/shop"
              className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-[#F8F5EF]/40 text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-black/60 hover:border-[#F8F5EF] transition-all text-center"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
