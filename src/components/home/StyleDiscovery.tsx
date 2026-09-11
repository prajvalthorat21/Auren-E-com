import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const STYLES = [
  {
    id: "minimal",
    name: "MINIMAL",
    description: "Architectural lines, zero clutter, monochromatic precision.",
    itemCount: "14 Pieces",
  },
  {
    id: "relaxed",
    name: "RELAXED",
    description: "Fluid drapes, unrestrictive cuts, and breathable ease.",
    itemCount: "18 Pieces",
  },
  {
    id: "street",
    name: "STREET",
    description: "Heavyweight drop shoulders, raw hems, and utilitarian edge.",
    itemCount: "16 Pieces",
  },
  {
    id: "everyday",
    name: "EVERYDAY",
    description: "Dependable staples tailored for daily rotation.",
    itemCount: "20 Pieces",
  },
  {
    id: "monochrome",
    name: "MONOCHROME",
    description: "Tonal ivory, chalk, charcoal, and deep onyx compositions.",
    itemCount: "15 Pieces",
  },
];

export function StyleDiscovery() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F1ECE3] border-t border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1 mb-10 pb-4 border-b border-[#E5DDD2]">
          <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-semibold">
            CURATED MOODS
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl tracking-wide text-[#0D0D0D]">
            FIND YOUR STYLE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STYLES.map((style) => (
            <Link
              key={style.id}
              href={`/shop?style=${style.id}`}
              className="group relative p-6 bg-white/35 hover:bg-white/50 backdrop-blur-xl border border-white/60 hover:border-white/90 rounded-[14px] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.85),0_8px_24px_-4px_rgba(13,13,13,0.05)] hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_14px_32px_-4px_rgba(13,13,13,0.09)] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between min-h-[200px] h-full focus:outline-hidden focus:ring-1 focus:ring-[#0D0D0D]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl tracking-wider text-[#0D0D0D]">
                    {style.name}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-[#8C8C8C] group-hover:text-[#0D0D0D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {style.description}
                </p>
              </div>

              <span className="text-[10px] tracking-widest uppercase text-[#8C8C8C] font-medium pt-4 block">
                {style.itemCount}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
