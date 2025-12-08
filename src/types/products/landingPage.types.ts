export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  srcDark?: string;
}

export interface LandingHero {
  brand?: string; // e.g., app name (from store)
  logoPath?: string;
  title?: string; // main heading (from config)
  titleHighlight?: string; // e.g., "not weeks" (from config)
  description: string; // supporting mainData (from store)
}

export interface LandingScreenshots {
  title?: string;
  images: Array<{
    imageSrc: string;
    width?: number;
    height?: number;
    title: string;
    description: string;
  }>;
}

export interface FeatureItem {
  title: string;
  body: string;
  iconPath?: string;
  iconName?: string; // e.g., "mdi:heart" (astro-icon / iconify name)
  media?: ImageAsset;
  badge?: string; // e.g., "New"
}

export interface LandingFeatures {
  title: string;
  items: FeatureItem[];
}

// NOTE: Removed OverallRating; per design we only show per-testimonial ratings

export interface Testimonial {
  authorName: string;
  handle?: string; // e.g., @username
  avatarPath?: string;
  quote: string;
  rating?: number; // e.g., 5
}

export interface LandingReviews {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  icons?: string[]; // e.g., flags shown near rating
  rating?: number; // aggregate rating to display (visual only)
}

export interface LandingCta {
  headline: string;
  icons?: string[]; // iconify names e.g., "twemoji:flag-united-states"
  rating?: number; // e.g., 4.9
  description?: string; // e.g., "3,300+ Global BJJ practitioners"
}

export interface LandingPage {
  hero: LandingHero;
  screenshots: LandingScreenshots;
  features: LandingFeatures;
  reviews: LandingReviews;
  cta: LandingCta;
}

// DeepPartial utility for locale-friendly structures
export type DeepPartial<T> = T extends (infer U)[]
  ? Array<DeepPartial<U>>
  : T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

// Locale files mirror LandingPage but are usually partial/without imageSrc
export type LandingPageLocale = DeepPartial<LandingPage>;
