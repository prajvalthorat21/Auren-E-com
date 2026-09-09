import { CategorySlug } from "@/lib/types";

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  altText: string;
  featuredCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 't-shirts',
    name: 'T-SHIRTS',
    tagline: 'Heavyweight cotton essentials',
    description: 'Heavyweight cotton essentials engineered for timeless unisex everyday rotation.',
    image: '/images/campaign/category/auren-category-tshirts-v01.png',
    altText: 'AUREN T-Shirts Editorial Campaign',
    featuredCount: 4,
  },
  {
    slug: 'shirts',
    name: 'SHIRTS',
    tagline: 'Relaxed shirting and modern layers',
    description: 'Relaxed shirting and modern layers crafted with understated tailoring.',
    image: '/images/campaign/category/auren-category-shirts-v01.png',
    altText: 'AUREN Shirts Editorial Campaign',
    featuredCount: 4,
  },
  {
    slug: 'jeans',
    name: 'JEANS',
    tagline: 'Straight, wide and refined denim',
    description: 'Straight, wide and refined denim in non-stretch organic and selvedge cotton.',
    image: '/images/campaign/category/auren-category-jeans-v01.png',
    altText: 'AUREN Jeans Editorial Campaign',
    featuredCount: 4,
  },
  {
    slug: 'track-pants',
    name: 'TRACK PANTS',
    tagline: 'Relaxed fleece and utility silhouettes',
    description: 'Relaxed fleece and utility silhouettes in heavy organic French terry and matte ripstop.',
    image: '/images/campaign/category/auren-category-track-pants-v01.png',
    altText: 'AUREN Track Pants Editorial Campaign',
    featuredCount: 4,
  },
];
