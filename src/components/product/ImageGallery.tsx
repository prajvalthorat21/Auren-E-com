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
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[650px] no-scrollbar">
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
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 aspect-[3/4] bg-[#F1ECE3] overflow-hidden">
        <Image
          src={images[selectedImageIndex] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-500"
        />
      </div>
    </div>
  );
}
