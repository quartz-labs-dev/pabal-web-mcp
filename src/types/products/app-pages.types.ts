import type { LandingPage } from "./landingPage.types.js";
import type { ProductConfig } from "./product-config.types.js";

export interface LayoutColors {
  bg?: string;
  fg?: string;
  fgMuted?: string;
  muted?: string;
  accentGrad?: string;
}

export interface AppMetaLinks {
  privacyPath: string;
  termsPath: string;
  backPath: string;
}

export interface AppPageData {
  product?: ProductConfig;
  links: AppMetaLinks;
  privacy: string;
  terms: string;
  layoutColors?: LayoutColors;
  landing?: LandingPage;
}
