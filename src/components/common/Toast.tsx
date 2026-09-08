"use client";

import React from "react";
import { useUI } from "@/context/UIContext";
import { CheckCircle2 } from "lucide-react";

export function Toast() {
  const { toastMessage } = useUI();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-[#0D0D0D] text-[#F8F5EF] px-5 py-3.5 border border-[#333333] shadow-2xl flex items-center gap-3 text-xs tracking-wider uppercase font-medium">
        <CheckCircle2 size={16} className="text-[#F8F5EF]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
