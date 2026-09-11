import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function CategoryBanners() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5DDD2] gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
              CORE CATEGORIES
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
              ENGINEERED SILHOUETTES
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D] hover:opacity-70 transition-opacity flex items-center gap-1.5"
          >
            <span>VIEW ALL WARDROBE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Outer Editorial Double-Line Architectural Frame */}
        <div className="relative p-3 sm:p-4 lg:p-5 border border-[#E5DDD2] bg-[#F1ECE3]/20">
          {/* Inner Fine Boundary Line */}
          <div className="relative p-2 sm:p-3 border border-[#E5DDD2]/70">
            {/* Precision Architectural Registration Corner Marks */}
            <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border-t border-l border-[#8C8C8C]/60 pointer-events-none" />
            <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border-t border-r border-[#8C8C8C]/60 pointer-events-none" />
            <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border-b border-l border-[#8C8C8C]/60 pointer-events-none" />
            <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border-b border-r border-[#8C8C8C]/60 pointer-events-none" />

            {/* 4 Clean Editorial Category Cards (Unaltered) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="group relative flex flex-col h-[440px] sm:h-[480px] overflow-hidden bg-[#F1ECE3] border border-[#E5DDD2]"
                >
                  {/* Approved On-Model Category Image with subtle hover zoom */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={cat.image}
                      alt={cat.altText || `AUREN ${cat.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-[center_20%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Subtle dark bottom gradient for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  </div>

                  {/* Category Card Text Details */}
                  <div className="relative z-10 mt-auto p-6 text-[#F8F5EF] space-y-1.5">
                    <h3 className="font-editorial text-2xl tracking-wider uppercase text-[#F8F5EF]">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#E5DDD2]/90 line-clamp-1 font-light tracking-wide">
                      {cat.tagline}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F8F5EF] group-hover:translate-x-1 transition-transform">
                      <span>EXPLORE</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
