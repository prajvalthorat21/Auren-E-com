/**
 * Approved AUREN Asset Library & Image System (Single Source of Truth)
 * 16 Core Products x 2 Approved Images = 32 Product Images
 * IMAGE 01 = On-Model Primary (Default)
 * IMAGE 02 = Product-Only Secondary (Hover / Gallery Slot 2)
 */

export interface ProductImageSet {
  primary: string;
  hover: string;
  detail?: string;
}

export const ASSET_IMAGES = {
  // Hero & Editorial Banners (Dedicated campaign visual)
  hero: "/images/campaign/auren-home-hero-v01.png",
  heroVideo: "/images/campaign/auren-hero-video.mp4",
  editorialCampaign: "/images/campaign/AUREN_MASTER_CAMPAIGN_REFERENCE_BOARD.png",

  // Category Banners (Newly Generated Nano Banana Editorial Photography)
  categoryTshirts: "/images/campaign/category/auren-category-tshirts-v01.png",
  categoryShirts: "/images/campaign/category/auren-category-shirts-v01.png",
  categoryJeans: "/images/campaign/category/auren-category-jeans-v01.png",
  categoryTrackPants: "/images/campaign/category/auren-category-track-pants-v01.png",

  // 16 Approved Products (Strictly Local Locked Assets)
  products: {
    // --- T-SHIRTS (T01 - T04) ---
    tshirt_01: {
      primary: "/images/products/t-shirts/T01_PRIMARY_ON_MODEL.png",
      hover: "/images/products/t-shirts/T01_PRODUCT_ONLY.png",
    },
    tshirt_02: {
      primary: "/images/products/t-shirts/T02_PRIMARY_ON_MODEL.png",
      hover: "/images/products/t-shirts/T02_PRODUCT_ONLY.png",
    },
    tshirt_03: {
      primary: "/images/products/t-shirts/T03_PRIMARY_ON_MODEL.png",
      hover: "/images/products/t-shirts/T03_PRODUCT_ONLY.png",
    },
    tshirt_04: {
      primary: "/images/products/t-shirts/T04_PRIMARY_ON_MODEL.png",
      hover: "/images/products/t-shirts/T04_PRODUCT_ONLY.png",
    },

    // --- SHIRTS (S01 - S04) ---
    shirt_01: {
      primary: "/images/products/shirts/S01_PRIMARY_ON_MODEL.png",
      hover: "/images/products/shirts/S01_PRODUCT_ONLY.png",
    },
    shirt_02: {
      primary: "/images/products/shirts/S02_PRIMARY_ON_MODEL.png",
      hover: "/images/products/shirts/S02_PRODUCT_ONLY.png",
    },
    shirt_03: {
      primary: "/images/products/shirts/S03_PRIMARY_ON_MODEL.png",
      hover: "/images/products/shirts/S03_PRODUCT_ONLY.png",
    },
    shirt_04: {
      primary: "/images/products/shirts/S04_PRIMARY_ON_MODEL.png",
      hover: "/images/products/shirts/S04_PRODUCT_ONLY.png",
    },

    // --- JEANS (J01 - J04) ---
    jean_01: {
      primary: "/images/products/jeans/J01_PRIMARY_ON_MODEL.png",
      hover: "/images/products/jeans/J01_PRODUCT_ONLY.png",
    },
    jean_02: {
      primary: "/images/products/jeans/J02_PRIMARY_ON_MODEL.png",
      hover: "/images/products/jeans/J02_PRODUCT_ONLY.png",
    },
    jean_03: {
      primary: "/images/products/jeans/J03_PRIMARY_ON_MODEL.png",
      hover: "/images/products/jeans/J03_PRODUCT_ONLY.png",
    },
    jean_04: {
      primary: "/images/products/jeans/J04_PRIMARY_ON_MODEL.png",
      hover: "/images/products/jeans/J04_PRODUCT_ONLY.png",
    },

    // --- TRACK PANTS (P01 - P04) ---
    track_01: {
      primary: "/images/products/track-pants/P01_PRIMARY_ON_MODEL.png",
      hover: "/images/products/track-pants/P01_PRODUCT_ONLY.png",
    },
    track_02: {
      primary: "/images/products/track-pants/P02_PRIMARY_ON_MODEL.png",
      hover: "/images/products/track-pants/P02_PRODUCT_ONLY.png",
    },
    track_03: {
      primary: "/images/products/track-pants/P03_PRIMARY_ON_MODEL.png",
      hover: "/images/products/track-pants/P03_PRODUCT_ONLY.png",
    },
    track_04: {
      primary: "/images/products/track-pants/P04_PRIMARY_ON_MODEL.png",
      hover: "/images/products/track-pants/P04_PRODUCT_ONLY.png",
    },
  },
};

export function getProductImageSet(key: keyof typeof ASSET_IMAGES.products): string[] {
  const set = ASSET_IMAGES.products[key];
  return [set.primary, set.hover];
}
