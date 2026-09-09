"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full items-start">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[calc(100vh-14rem)] lg:max-h-[580px] no-scrollbar flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-[#F1ECE3] border transition-all overflow-hidden ${
              selectedImageIndex === idx
                ? "border-[#0D0D0D] ring-1 ring-[#0D0D0D]"
                : "border-[#E5DDD2] hover:border-[#8C8C8C] opacity-75 hover:opacity-100"
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="relative aspect-[3/4] w-full md:w-auto h-[460px] sm:h-[520px] lg:h-[calc(100vh-14rem)] lg:max-h-[580px] min-h-[380px] bg-[#F1ECE3] border border-[#E5DDD2] overflow-hidden flex items-center justify-center flex-shrink-0">
        <Image
          src={images[selectedImageIndex] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 58vw, 700px"
          className="object-contain object-center transition-all duration-300"
        />
      </div>
    </div>
  );
}
