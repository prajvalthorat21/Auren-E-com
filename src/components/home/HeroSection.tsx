import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ASSET_IMAGES } from "@/data/productImages";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[630px] sm:min-h-[680px] md:min-h-[85vh] lg:min-h-[92vh] flex items-end sm:items-center pt-24 pb-16 sm:py-20 lg:py-24 bg-[#0D0D0D] overflow-hidden">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={ASSET_IMAGES.hero}
          alt="AUREN Editorial Fashion Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_10%] sm:object-[72%_center] lg:object-center opacity-100"
        />
        {/* Responsive Directional Editorial Overlay:
            - Mobile: Gradient targeted behind lower text layer, leaving models, skin tones and architectural details bright
            - Desktop: Left-to-right gradient protecting text copy while preserving warm sunlight and fabric details on models
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/38 via-52% to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/25 sm:via-42% sm:to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-[#F8F5EF]">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold text-[#E5DDD2] block">
              AUTUMN / WINTER ROTATION
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight leading-[1.08] sm:leading-[1.05] text-[#F8F5EF]">
              EVERYDAY, <br />
              <span className="italic font-light">ELEVATED.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-base text-[#E5DDD2]/95 max-w-lg leading-relaxed font-light">
            Modern essentials designed for wherever the day takes you. Considered unisex silhouettes and understated fabric craftsmanship.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <Link
              href="/shop?sort=newest"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#F8F5EF] text-[#0D0D0D] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#E5DDD2] transition-colors flex items-center justify-center gap-2 text-center shadow-lg"
            >
              <span>SHOP NEW IN</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/shop"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-black/40 backdrop-blur-sm border border-[#F8F5EF]/40 text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-black/60 hover:border-[#F8F5EF] transition-all text-center"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
