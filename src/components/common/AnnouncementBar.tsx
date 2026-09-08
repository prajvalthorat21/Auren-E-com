import React from "react";

export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="w-full bg-[#0D0D0D] text-[#F8F5EF] text-[11px] tracking-[0.18em] uppercase py-2 px-4 border-b border-[#222222]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center font-medium">
        <span className="opacity-90">FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹999</span>
        <span className="hidden sm:inline-block opacity-40">•</span>
        <span className="opacity-90">EASY 7-DAY DOORSTEP RETURNS</span>
      </div>
    </aside>
  );
}
