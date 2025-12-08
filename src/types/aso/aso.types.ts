/**
 * ASO (App Store Optimization) data type definitions
 */

import {
  UNIFIED_LOCALES,
  APP_STORE_SUPPORTED_LOCALES,
  GOOGLE_PLAY_SUPPORTED_LOCALES,
  type UnifiedLocale,
} from "../../constants/unified-locales.js";

/**
 * Unified locale type used across the application
 * This type represents the unified locale codes used in /locales directory
 */
export type SupportedLocale = UnifiedLocale;

/**
 * App Store Connect specific locale type
 */
export type AppStoreLocale = (typeof APP_STORE_SUPPORTED_LOCALES)[number];

/**
 * Google Play Console specific locale type
 */
export type GooglePlayLocale = (typeof GOOGLE_PLAY_SUPPORTED_LOCALES)[number];

/**
 * Check if locale is supported by our unified system
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return UNIFIED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Check if locale is supported by App Store
 */
export function isAppStoreLocale(locale: string): locale is AppStoreLocale {
  return APP_STORE_SUPPORTED_LOCALES.includes(locale as AppStoreLocale);
}

/**
 * Check if locale is supported by Google Play
 */
export function isGooglePlayLocale(locale: string): locale is GooglePlayLocale {
  return GOOGLE_PLAY_SUPPORTED_LOCALES.includes(locale as GooglePlayLocale);
}

// ============================================================================
// ASO Data Type Definitions
// ============================================================================

/**
 * Google Play Store ASO data
 */
export interface GooglePlayAsoData {
  // Basic information
  title: string; // App title (max 50 characters)
  shortDescription: string; // Short description (max 80 characters)
  fullDescription: string; // Full description (max 4000 characters)

  // Screenshots and media
  screenshots: {
    phone: string[]; // Phone screenshot URLs
    tablet?: string[]; // Tablet screenshot URLs (deprecated: use tablet7 or tablet10)
    tablet7?: string[]; // 7-inch tablet screenshot URLs
    tablet10?: string[]; // 10-inch tablet screenshot URLs
    tv?: string[]; // TV screenshot URLs
    wear?: string[]; // Wearable screenshot URLs
  };
  featureGraphic?: string; // Feature Graphic URL
  promoGraphic?: string; // Promo Graphic URL

  // Category and classification
  category?: string; // App category
  contentRating?: string; // Content rating

  // Keywords and search optimization
  keywords?: string[]; // Keywords (extracted from title/description in Google Play)

  // Contact information
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;

  // Other
  packageName: string; // App package name (e.g., com.quartz.pixeltimer)
  defaultLanguage: string; // Default language code (e.g., en-US)
}

/**
 * Google Play release notes (per version)
 */
export interface GooglePlayReleaseNote {
  versionCode: number; // Version code
  versionName: string; // Version name (e.g., "1.0.0")
  releaseNotes: {
    [language: string]: string; // Release notes per language
  };
  track: string; // Track (production, beta, alpha, etc.)
  status: string; // Status
  releaseDate?: string; // Release date (ISO 8601)
}

/**
 * App Store release notes (per version)
 */
export interface AppStoreReleaseNote {
  versionString: string; // Version string (e.g., "1.0.0")
  releaseNotes: {
    [locale: string]: string; // Release notes per locale (whatsNew)
  };
  platform: string; // Platform (IOS, etc.)
  releaseDate?: string; // Release date (ISO 8601)
}

/**
 * App Store ASO data
 */
export interface AppStoreAsoData {
  // Basic information
  name: string; // App name (max 30 characters)
  subtitle?: string; // Subtitle (max 30 characters)
  description: string; // Description (max 4000 characters)
  keywords?: string; // Keywords (comma-separated, max 100 characters)
  promotionalText?: string; // Promotional text (max 170 characters)

  // Screenshots and media
  screenshots: {
    iphone65?: string[]; // iPhone 6.5" screenshots
    iphone61?: string[]; // iPhone 6.1" screenshots
    iphone58?: string[]; // iPhone 5.8" screenshots
    iphone55?: string[]; // iPhone 5.5" screenshots
    iphone47?: string[]; // iPhone 4.7" screenshots
    iphone40?: string[]; // iPhone 4.0" screenshots
    ipadPro129?: string[]; // iPad Pro 12.9" screenshots
    ipadPro11?: string[]; // iPad Pro 11" screenshots
    ipad105?: string[]; // iPad 10.5" screenshots
    ipad97?: string[]; // iPad 9.7" screenshots
    appleWatch?: string[]; // Apple Watch screenshots
  };
  appPreview?: string[]; // App preview video URLs

  // Category and classification
  primaryCategory?: string; // Primary category
  secondaryCategory?: string; // Secondary category
  contentRightId?: string; // Content rights ID

  // Contact information
  supportUrl?: string;
  marketingUrl?: string;
  privacyPolicyUrl?: string;

  // Other
  bundleId: string; // Bundle ID (e.g., com.quartz.pixeltimer)
  locale: string; // Locale (e.g., en-US)
  whatsNew?: string; // Release notes (latest version)
}

/**
 * Multilingual Google Play ASO data
 */
export interface GooglePlayMultilingualAsoData {
  locales: {
    [locale: string]: GooglePlayAsoData;
  };
  defaultLocale?: string;
}

/**
 * Multilingual App Store ASO data
 */
export interface AppStoreMultilingualAsoData {
  locales: {
    [locale: string]: AppStoreAsoData;
  };
  defaultLocale?: string;
}

/**
 * Unified ASO data (format stored in local config.json)
 * Supports single language (legacy compatible) or multilingual structure
 */
export interface AsoData {
  googlePlay?: GooglePlayAsoData | GooglePlayMultilingualAsoData;
  appStore?: AppStoreAsoData | AppStoreMultilingualAsoData;
  lastSynced?: {
    googlePlay?: string; // ISO 8601 date
    appStore?: string; // ISO 8601 date
  };
}

/**
 * Check if Google Play data is multilingual structure
 */
export function isGooglePlayMultilingual(
  data: GooglePlayAsoData | GooglePlayMultilingualAsoData | undefined
): data is GooglePlayMultilingualAsoData {
  return data !== undefined && "locales" in data;
}

/**
 * Check if App Store data is multilingual structure
 */
export function isAppStoreMultilingual(
  data: AppStoreAsoData | AppStoreMultilingualAsoData | undefined
): data is AppStoreMultilingualAsoData {
  return data !== undefined && "locales" in data;
}
