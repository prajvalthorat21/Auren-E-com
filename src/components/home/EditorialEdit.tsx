import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ASSET_IMAGES } from "@/data/productImages";

export function EditorialEdit() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F1ECE3] border-y border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Campaign Image */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#E5DDD2]">
            <Image
              src={ASSET_IMAGES.editorialCampaign}
              alt="The AUREN Edit Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
            />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 space-y-6 text-[#0D0D0D] py-4">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C8C8C]">
                SEASONAL EDITORIAL
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl tracking-tight leading-tight">
                THE AUREN <br />
                <span className="italic font-light">EDIT.</span>
              </h2>
            </div>

            <p className="font-editorial text-xl sm:text-2xl text-[#333333] italic">
              &ldquo;Less effort. Better dressed.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Designed around the principle of modular wardrobe layering. Each garment exists to pair seamlessly with the next — crafted from weighty organic cottons, unwashed raw selvedge, and fluid tencel textiles.
            </p>

            <div className="pt-2">
              <Link
                href="/shop?style=minimal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors"
              >
                <span>EXPLORE THE EDIT</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
