import React from "react";

const ANNOUNCEMENTS = [
  "FREE EXPRESS SHIPPING ON ORDERS ABOVE $75",
  "EASY 7-DAY DOORSTEP RETURNS",
];

export function AnnouncementBar() {
  const renderItemSet = (prefix: string) => (
    <div className="flex items-center shrink-0">
      {[0, 1, 2, 3].map((setIndex) => (
        <React.Fragment key={`${prefix}-${setIndex}`}>
          <span className="opacity-90">{ANNOUNCEMENTS[0]}</span>
          <span className="mx-6 sm:mx-10 opacity-35 select-none text-[8px] sm:text-[9px]">●</span>
          <span className="opacity-90">{ANNOUNCEMENTS[1]}</span>
          <span className="mx-6 sm:mx-10 opacity-35 select-none text-[8px] sm:text-[9px]">●</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <aside
      aria-label="Announcement"
      className="w-full max-w-full bg-[#0D0D0D] text-[#F8F5EF] text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase py-2 border-b border-[#222222] overflow-hidden select-none relative z-30"
    >
      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee-slow font-medium whitespace-nowrap">
          {/* Main Track (Set A) */}
          {renderItemSet("set-a")}
          {/* Duplicate Track (Set B) for mathematically seamless continuous loop */}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {[0, 1, 2, 3].map((setIndex) => (
              <React.Fragment key={`set-b-${setIndex}`}>
                <span className="opacity-90">{ANNOUNCEMENTS[0]}</span>
                <span className="mx-6 sm:mx-10 opacity-35 select-none text-[8px] sm:text-[9px]">●</span>
                <span className="opacity-90">{ANNOUNCEMENTS[1]}</span>
                <span className="mx-6 sm:mx-10 opacity-35 select-none text-[8px] sm:text-[9px]">●</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

