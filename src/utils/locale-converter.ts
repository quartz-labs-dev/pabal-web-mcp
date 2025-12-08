/**
 * Locale conversion utilities for ASO platforms
 * Handles conversion between unified locales and platform-specific locale codes
 */

import {
  UNIFIED_TO_APP_STORE,
  UNIFIED_TO_GOOGLE_PLAY,
  APP_STORE_TO_UNIFIED,
  GOOGLE_PLAY_TO_UNIFIED,
  DEFAULT_LOCALE,
  type UnifiedLocale,
} from "../constants/unified-locales.js";

// ============================================================================
// Public (Unified) to ASO Platform Conversion
// ============================================================================

/**
 * Convert unified locale to App Store Connect locale
 * Returns null if the locale is not supported by App Store
 *
 * @param locale - Unified locale code (e.g., "ar", "zh-Hans")
 * @returns App Store locale code (e.g., "ar-SA", "zh-Hans") or null
 *
 * @example
 * unifiedToAppStore("ar") // Returns "ar-SA"
 * unifiedToAppStore("zh-Hans") // Returns "zh-Hans"
 * unifiedToAppStore("en-IN") // Returns null (not supported)
 */
export function unifiedToAppStore(locale: UnifiedLocale): string | null {
  return UNIFIED_TO_APP_STORE[locale];
}

/**
 * Convert unified locale to Google Play Console locale
 * Returns null if the locale is not supported by Google Play
 *
 * @param locale - Unified locale code (e.g., "ar", "zh-Hans")
 * @returns Google Play locale code (e.g., "ar-SA", "zh-CN") or null
 *
 * @example
 * unifiedToGooglePlay("ar") // Returns "ar-SA"
 * unifiedToGooglePlay("zh-Hans") // Returns "zh-CN"
 * unifiedToGooglePlay("bg-BG") // Returns "bg-BG"
 */
export function unifiedToGooglePlay(locale: UnifiedLocale): string | null {
  return UNIFIED_TO_GOOGLE_PLAY[locale];
}

/**
 * Convert unified locale to both platforms
 * Returns an object with App Store and Google Play locale codes
 *
 * @param locale - Unified locale code
 * @returns Object with appStore and googlePlay locale codes (or null if not supported)
 *
 * @example
 * unifiedToBothPlatforms("ar")
 * // Returns { appStore: "ar-SA", googlePlay: "ar-SA" }
 *
 * unifiedToBothPlatforms("zh-Hans")
 * // Returns { appStore: "zh-Hans", googlePlay: "zh-CN" }
 */
export function unifiedToBothPlatforms(locale: UnifiedLocale): {
  appStore: string | null;
  googlePlay: string | null;
} {
  return {
    appStore: unifiedToAppStore(locale),
    googlePlay: unifiedToGooglePlay(locale),
  };
}

// ============================================================================
// ASO Platform to Public (Unified) Conversion
// ============================================================================

/**
 * Convert App Store Connect locale to unified locale
 * Returns the default locale if the App Store locale is not recognized
 *
 * @param locale - App Store locale code (e.g., "ar-SA", "zh-Hans")
 * @returns Unified locale code (e.g., "ar", "zh-Hans")
 *
 * @example
 * appStoreToUnified("ar-SA") // Returns "ar"
 * appStoreToUnified("zh-Hans") // Returns "zh-Hans"
 * appStoreToUnified("es-MX") // Returns "es-419"
 */
export function appStoreToUnified(locale: string): UnifiedLocale {
  return APP_STORE_TO_UNIFIED[locale] ?? DEFAULT_LOCALE;
}

/**
 * Convert Google Play Console locale to unified locale
 * Returns the default locale if the Google Play locale is not recognized
 *
 * @param locale - Google Play locale code (e.g., "ar-SA", "zh-CN")
 * @returns Unified locale code (e.g., "ar", "zh-Hans")
 *
 * @example
 * googlePlayToUnified("ar-SA") // Returns "ar"
 * googlePlayToUnified("zh-CN") // Returns "zh-Hans"
 * googlePlayToUnified("zh-TW") // Returns "zh-Hant"
 */
export function googlePlayToUnified(locale: string): UnifiedLocale {
  return GOOGLE_PLAY_TO_UNIFIED[locale] ?? DEFAULT_LOCALE;
}

// ============================================================================
// Batch Conversion Utilities
// ============================================================================

/**
 * Convert multiple unified locales to App Store locales
 * Filters out locales not supported by App Store
 *
 * @param locales - Array of unified locale codes
 * @returns Array of App Store locale codes (excluding unsupported locales)
 *
 * @example
 * unifiedToAppStoreBatch(["ar", "zh-Hans", "en-IN"])
 * // Returns ["ar-SA", "zh-Hans"] (en-IN is not supported by App Store)
 */
export function unifiedToAppStoreBatch(locales: UnifiedLocale[]): string[] {
  return locales
    .map((locale) => unifiedToAppStore(locale))
    .filter((locale): locale is string => locale !== null);
}

/**
 * Convert multiple unified locales to Google Play locales
 * Filters out locales not supported by Google Play
 *
 * @param locales - Array of unified locale codes
 * @returns Array of Google Play locale codes (excluding unsupported locales)
 *
 * @example
 * unifiedToGooglePlayBatch(["ar", "zh-Hans", "bg-BG"])
 * // Returns ["ar-SA", "zh-CN", "bg-BG"]
 */
export function unifiedToGooglePlayBatch(locales: UnifiedLocale[]): string[] {
  return locales
    .map((locale) => unifiedToGooglePlay(locale))
    .filter((locale): locale is string => locale !== null);
}

/**
 * Convert multiple App Store locales to unified locales
 *
 * @param locales - Array of App Store locale codes
 * @returns Array of unified locale codes
 *
 * @example
 * appStoreToUnifiedBatch(["ar-SA", "zh-Hans", "es-MX"])
 * // Returns ["ar", "zh-Hans", "es-419"]
 */
export function appStoreToUnifiedBatch(locales: string[]): UnifiedLocale[] {
  return locales.map((locale) => appStoreToUnified(locale));
}

/**
 * Convert multiple Google Play locales to unified locales
 *
 * @param locales - Array of Google Play locale codes
 * @returns Array of unified locale codes
 *
 * @example
 * googlePlayToUnifiedBatch(["ar-SA", "zh-CN", "zh-TW"])
 * // Returns ["ar", "zh-Hans", "zh-Hant"]
 */
export function googlePlayToUnifiedBatch(locales: string[]): UnifiedLocale[] {
  return locales.map((locale) => googlePlayToUnified(locale));
}

// ============================================================================
// Cross-Platform Conversion
// ============================================================================

/**
 * Convert App Store locale to Google Play locale
 * Goes through unified locale as intermediate step
 *
 * @param locale - App Store locale code
 * @returns Google Play locale code or null if conversion not possible
 *
 * @example
 * appStoreToGooglePlay("ar-SA") // Returns "ar-SA"
 * appStoreToGooglePlay("zh-Hans") // Returns "zh-CN"
 * appStoreToGooglePlay("es-MX") // Returns "es-419"
 */
export function appStoreToGooglePlay(locale: string): string | null {
  const unified = appStoreToUnified(locale);
  return unifiedToGooglePlay(unified);
}

/**
 * Convert Google Play locale to App Store locale
 * Goes through unified locale as intermediate step
 *
 * @param locale - Google Play locale code
 * @returns App Store locale code or null if conversion not possible
 *
 * @example
 * googlePlayToAppStore("ar-SA") // Returns "ar-SA"
 * googlePlayToAppStore("zh-CN") // Returns "zh-Hans"
 * googlePlayToAppStore("zh-TW") // Returns "zh-Hant"
 * googlePlayToAppStore("en-IN") // Returns null (not supported by App Store)
 */
export function googlePlayToAppStore(locale: string): string | null {
  const unified = googlePlayToUnified(locale);
  return unifiedToAppStore(unified);
}

// ============================================================================
// Object/Map Conversion Utilities
// ============================================================================

/**
 * Convert an object with unified locale keys to App Store locale keys
 * Useful for converting locale-based data structures
 *
 * @param data - Object with unified locale keys
 * @returns Object with App Store locale keys (excluding unsupported locales)
 *
 * @example
 * convertObjectToAppStore({
 *   "ar": "مرحبا",
 *   "zh-Hans": "你好",
 *   "en-IN": "Hello"
 * })
 * // Returns { "ar-SA": "مرحبا", "zh-Hans": "你好" }
 */
export function convertObjectToAppStore<T>(data: Record<UnifiedLocale, T>): Record<string, T> {
  const result: Record<string, T> = {};

  for (const [locale, value] of Object.entries(data)) {
    const appStoreLocale = unifiedToAppStore(locale as UnifiedLocale);
    if (appStoreLocale !== null) {
      result[appStoreLocale] = value as T;
    }
  }

  return result;
}

/**
 * Convert an object with unified locale keys to Google Play locale keys
 * Useful for converting locale-based data structures
 *
 * @param data - Object with unified locale keys
 * @returns Object with Google Play locale keys (excluding unsupported locales)
 *
 * @example
 * convertObjectToGooglePlay({
 *   "ar": "مرحبا",
 *   "zh-Hans": "你好",
 *   "zh-Hant": "你好"
 * })
 * // Returns { "ar-SA": "مرحبا", "zh-CN": "你好", "zh-TW": "你好" }
 */
export function convertObjectToGooglePlay<T>(data: Record<UnifiedLocale, T>): Record<string, T> {
  const result: Record<string, T> = {};

  for (const [locale, value] of Object.entries(data)) {
    const googlePlayLocale = unifiedToGooglePlay(locale as UnifiedLocale);
    if (googlePlayLocale !== null) {
      result[googlePlayLocale] = value as T;
    }
  }

  return result;
}

/**
 * Convert an object with App Store locale keys to unified locale keys
 * Useful for converting locale-based data structures from App Store
 *
 * @param data - Object with App Store locale keys
 * @returns Object with unified locale keys
 *
 * @example
 * convertObjectFromAppStore({
 *   "ar-SA": "مرحبا",
 *   "zh-Hans": "你好",
 *   "es-MX": "Hola"
 * })
 * // Returns { "ar": "مرحبا", "zh-Hans": "你好", "es-419": "Hola" }
 */
export function convertObjectFromAppStore<T>(data: Record<string, T>): Record<UnifiedLocale, T> {
  const result: Partial<Record<UnifiedLocale, T>> = {};

  for (const [locale, value] of Object.entries(data)) {
    const unifiedLocale = appStoreToUnified(locale);
    result[unifiedLocale] = value;
  }

  return result as Record<UnifiedLocale, T>;
}

/**
 * Convert an object with Google Play locale keys to unified locale keys
 * Useful for converting locale-based data structures from Google Play
 *
 * @param data - Object with Google Play locale keys
 * @returns Object with unified locale keys
 *
 * @example
 * convertObjectFromGooglePlay({
 *   "ar-SA": "مرحبا",
 *   "zh-CN": "你好",
 *   "zh-TW": "你好"
 * })
 * // Returns { "ar": "مرحبا", "zh-Hans": "你好", "zh-Hant": "你好" }
 */
export function convertObjectFromGooglePlay<T>(data: Record<string, T>): Record<UnifiedLocale, T> {
  const result: Partial<Record<UnifiedLocale, T>> = {};

  for (const [locale, value] of Object.entries(data)) {
    const unifiedLocale = googlePlayToUnified(locale);
    result[unifiedLocale] = value;
  }

  return result as Record<UnifiedLocale, T>;
}
