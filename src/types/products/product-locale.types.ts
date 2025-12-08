import type { LandingPageLocale } from "./landingPage.types.js";

export interface AsoTemplate {
  intro: string;
  keyFeaturesHeading?: string;
  featuresHeading?: string;
  outro: string;
  includeSupportLinks?: boolean;
}

export interface AsoLocaleContent {
  title?: string;
  subtitle?: string;
  shortDescription?: string;
  keywords?: string[] | string;
  template?: AsoTemplate;
}

export interface ProductLocale {
  aso?: AsoLocaleContent;
  landing?: LandingPageLocale;
}
