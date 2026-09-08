export type CategorySlug = 't-shirts' | 'shirts' | 'jeans' | 'track-pants';

export type FitType = 'REGULAR' | 'RELAXED' | 'OVERSIZED';

export type StyleTag = 'MINIMAL' | 'RELAXED' | 'STREET' | 'EVERYDAY' | 'MONOCHROME';

export type GarmentSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  textColor?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: GarmentSize[];
  fit: FitType;
  styleTags: StyleTag[];
  description: string;
  details: string[];
  material: string;
  careInstructions: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  featured?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  id: string; // unique item composite key: `${productId}-${selectedColor}-${selectedSize}`
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: GarmentSize;
  quantity: number;
  price: number;
}

export interface FilterState {
  categories: CategorySlug[];
  sizes: GarmentSize[];
  colors: string[]; // color names
  fits: FitType[];
  styleTags: StyleTag[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-low-high' | 'price-high-low' | 'rating';
}
