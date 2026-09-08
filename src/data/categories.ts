import { CategorySlug } from "@/lib/types";

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  featuredCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 't-shirts',
    name: 'T-SHIRTS',
    tagline: 'Heavyweight Cotton & Structured Drape',
    description: 'Clean proportions, 280-320 GSM combed cotton, drop-shoulder silhouettes engineered for timeless unisex everyday wear.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
    featuredCount: 10,
  },
  {
    slug: 'shirts',
    name: 'SHIRTS',
    tagline: 'Fluid Tencel & Architectural Poplin',
    description: 'Relaxed button-downs, crisp poplin overshirts, and camp collars designed with understated tailoring.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1200',
    featuredCount: 10,
  },
  {
    slug: 'jeans',
    name: 'JEANS',
    tagline: 'Selvedge Denim & Relaxed Silhouettes',
    description: '13.5oz non-stretch Japanese and organic cotton denim in vintage washes, wide-leg cuts, and straight-leg tailoring.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1200',
    featuredCount: 10,
  },
  {
    slug: 'track-pants',
    name: 'TRACK PANTS',
    tagline: 'French Terry & Technical Tailoring',
    description: 'Substantial 450 GSM organic loopback fleece and matte nylon technical pants featuring clean drape and hidden cords.',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1200',
    featuredCount: 10,
  },
];
