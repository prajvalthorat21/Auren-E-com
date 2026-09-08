"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useUI();
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isSizeGuideOpen) return null;

  const topSizes = [
    { size: "XS", chestIn: "36 - 38", chestCm: "91 - 96", lengthIn: "27.5", lengthCm: "70", shoulderIn: "18.5", shoulderCm: "47" },
    { size: "S", chestIn: "38 - 40", chestCm: "96 - 101", lengthIn: "28.5", lengthCm: "72", shoulderIn: "19.5", shoulderCm: "49.5" },
    { size: "M", chestIn: "40 - 42", chestCm: "101 - 106", lengthIn: "29.5", lengthCm: "75", shoulderIn: "20.5", shoulderCm: "52" },
    { size: "L", chestIn: "42 - 44", chestCm: "106 - 111", lengthIn: "30.5", lengthCm: "77", shoulderIn: "21.5", shoulderCm: "54.5" },
    { size: "XL", chestIn: "44 - 47", chestCm: "111 - 119", lengthIn: "31.5", lengthCm: "80", shoulderIn: "22.5", shoulderCm: "57" },
    { size: "XXL", chestIn: "47 - 50", chestCm: "119 - 127", lengthIn: "32.5", lengthCm: "82", shoulderIn: "23.5", shoulderCm: "59.5" },
  ];

  const bottomSizes = [
    { size: "XS (28)", waistIn: "28 - 29", waistCm: "71 - 74", hipIn: "38", hipCm: "96", inseamIn: "30", inseamCm: "76" },
    { size: "S (30)", waistIn: "30 - 31", waistCm: "76 - 79", hipIn: "40", hipCm: "101", inseamIn: "30.5", inseamCm: "77.5" },
    { size: "M (32)", waistIn: "32 - 33", waistCm: "81 - 84", hipIn: "42", hipCm: "106", inseamIn: "31", inseamCm: "79" },
    { size: "L (34)", waistIn: "34 - 35", waistCm: "86 - 89", hipIn: "44", hipCm: "111", inseamIn: "31.5", inseamCm: "80" },
    { size: "XL (36)", waistIn: "36 - 37", waistCm: "91 - 94", hipIn: "46", hipCm: "116", inseamIn: "32", inseamCm: "81" },
    { size: "XXL (38)", waistIn: "38 - 40", waistCm: "96 - 101", hipIn: "48", hipCm: "122", inseamIn: "32", inseamCm: "81" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#F8F5EF] border border-[#E5DDD2] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-[#0D0D0D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 p-1 text-[#0D0D0D] hover:opacity-60 transition-opacity"
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-medium">
            AUREN FIT & PROPORTIONS
          </p>
          <h2 className="font-editorial text-2xl tracking-wide">UNISEX SIZE GUIDE</h2>
          <p className="text-xs text-[#555555]">
            All AUREN garments are tailored with relaxed, fluid proportions suitable for all genders.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-end gap-2 text-xs">
          <span className="text-[#8C8C8C] tracking-wider uppercase">UNIT:</span>
          <button
            onClick={() => setUnit("in")}
            className={`px-2.5 py-1 border uppercase text-[11px] font-medium tracking-wider transition-colors ${
              unit === "in" ? "bg-[#0D0D0D] text-[#F8F5EF] border-[#0D0D0D]" : "bg-[#F1ECE3] border-[#E5DDD2]"
            }`}
          >
            INCHES
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={`px-2.5 py-1 border uppercase text-[11px] font-medium tracking-wider transition-colors ${
              unit === "cm" ? "bg-[#0D0D0D] text-[#F8F5EF] border-[#0D0D0D]" : "bg-[#F1ECE3] border-[#E5DDD2]"
            }`}
          >
            CM
          </button>
        </div>

        {/* Tops Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold tracking-widest uppercase">TOPS (T-SHIRTS & SHIRTS)</h3>
          <div className="overflow-x-auto border border-[#E5DDD2]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F1ECE3] uppercase text-[10px] tracking-wider text-[#555555]">
                <tr>
                  <th className="p-2.5 border-b border-[#E5DDD2]">SIZE</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">CHEST ({unit.toUpperCase()})</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">LENGTH ({unit.toUpperCase()})</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">SHOULDER ({unit.toUpperCase()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DDD2]">
                {topSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#F1ECE3]/50 transition-colors">
                    <td className="p-2.5 font-semibold">{row.size}</td>
                    <td className="p-2.5">{unit === "in" ? row.chestIn : row.chestCm}</td>
                    <td className="p-2.5">{unit === "in" ? row.lengthIn : row.lengthCm}</td>
                    <td className="p-2.5">{unit === "in" ? row.shoulderIn : row.shoulderCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottoms Table */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-semibold tracking-widest uppercase">BOTTOMS (JEANS & TRACK PANTS)</h3>
          <div className="overflow-x-auto border border-[#E5DDD2]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F1ECE3] uppercase text-[10px] tracking-wider text-[#555555]">
                <tr>
                  <th className="p-2.5 border-b border-[#E5DDD2]">SIZE</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">WAIST ({unit.toUpperCase()})</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">HIP ({unit.toUpperCase()})</th>
                  <th className="p-2.5 border-b border-[#E5DDD2]">INSEAM ({unit.toUpperCase()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DDD2]">
                {bottomSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#F1ECE3]/50 transition-colors">
                    <td className="p-2.5 font-semibold">{row.size}</td>
                    <td className="p-2.5">{unit === "in" ? row.waistIn : row.waistCm}</td>
                    <td className="p-2.5">{unit === "in" ? row.hipIn : row.hipCm}</td>
                    <td className="p-2.5">{unit === "in" ? row.inseamIn : row.inseamCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Note */}
        <div className="p-4 bg-[#F1ECE3] text-[11px] leading-relaxed text-[#555555] space-y-1">
          <p className="font-semibold text-[#0D0D0D] uppercase tracking-wider">FIT ADVICE:</p>
          <p>
            For a tailored regular fit, choose your standard size. For our signature dropped-shoulder drape or wide-leg stack, stay true to size as the oversize cut is already engineered into the pattern.
          </p>
        </div>
      </div>
    </div>
  );
}
