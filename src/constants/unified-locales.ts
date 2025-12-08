/**
 * Unified locale system for ASO (App Store Optimization)
 * Consolidates App Store Connect and Google Play Console locale codes
 */

// ============================================================================
// Unified Locale List
// ============================================================================

/**
 * Unified locale codes used across the application
 * These codes are used in /locales directory structure
 */
export const UNIFIED_LOCALES = [
  "af", // Afrikaans - Google Play only
  "am", // Amharic - Google Play only
  "ar", // Arabic
  "az-AZ", // Azerbaijani - Google Play only
  "be", // Belarusian - Google Play only
  "bg-BG", // Bulgarian - Google Play only
  "bn-BD", // Bengali - Google Play only
  "ca-ES", // Catalan
  "cs-CZ", // Czech
  "da-DK", // Danish
  "de-DE", // German
  "el-GR", // Greek
  "en-AU", // English (Australia)
  "en-CA", // English (Canada)
  "en-GB", // English (United Kingdom)
  "en-IN", // English (India) - Google Play only
  "en-SG", // English (Singapore) - Google Play only
  "en-US", // English (United States)
  "en-ZA", // English (South Africa) - Google Play only
  "es-419", // Spanish (Latin America)
  "es-ES", // Spanish (Spain)
  "es-US", // Spanish (United States)
  "et-EE", // Estonian - Google Play only
  "eu-ES", // Basque - Google Play only
  "fa", // Persian - Google Play only
  "fa-AE", // Persian (UAE) - Google Play only
  "fa-AF", // Persian (Afghanistan) - Google Play only
  "fa-IR", // Persian (Iran) - Google Play only
  "fi-FI", // Finnish
  "fil", // Filipino - Google Play only
  "fr-CA", // French (Canada)
  "fr-FR", // French (France)
  "gl-ES", // Galician - Google Play only
  "gu", // Gujarati - Google Play only
  "he-IL", // Hebrew
  "hi-IN", // Hindi
  "hr-HR", // Croatian - Google Play only
  "hu-HU", // Hungarian
  "hy-AM", // Armenian - Google Play only
  "id-ID", // Indonesian
  "is-IS", // Icelandic - Google Play only
  "it-IT", // Italian
  "ja-JP", // Japanese
  "ka-GE", // Georgian - Google Play only
  "kk", // Kazakh - Google Play only
  "km-KH", // Khmer - Google Play only
  "kn-IN", // Kannada - Google Play only
  "ko-KR", // Korean
  "ky-KG", // Kyrgyz - Google Play only
  "lo-LA", // Lao - Google Play only
  "lt-LT", // Lithuanian - Google Play only
  "lv-LV", // Latvian - Google Play only
  "mk-MK", // Macedonian - Google Play only
  "ml-IN", // Malayalam - Google Play only
  "mn-MN", // Mongolian - Google Play only
  "mr-IN", // Marathi - Google Play only
  "ms", // Malay - Google Play only
  "ms-MY", // Malay (Malaysia)
  "my-MM", // Burmese - Google Play only
  "ne-NP", // Nepali - Google Play only
  "nl-NL", // Dutch
  "no-NO", // Norwegian
  "pa", // Punjabi - Google Play only
  "pl-PL", // Polish
  "pt-BR", // Portuguese (Brazil)
  "pt-PT", // Portuguese (Portugal)
  "rm", // Romansh - Google Play only
  "ro-RO", // Romanian
  "ru-RU", // Russian
  "si-LK", // Sinhala - Google Play only
  "sk-SK", // Slovak
  "sl-SI", // Slovenian - Google Play only
  "sq", // Albanian - Google Play only
  "sr-RS", // Serbian - Google Play only
  "sv-SE", // Swedish
  "sw", // Swahili - Google Play only
  "ta-IN", // Tamil - Google Play only
  "te-IN", // Telugu - Google Play only
  "th-TH", // Thai
  "tr-TR", // Turkish
  "uk-UA", // Ukrainian
  "ur", // Urdu - Google Play only
  "vi-VN", // Vietnamese
  "zh-HK", // Chinese (Hong Kong)
  "zh-Hans", // Chinese (Simplified)
  "zh-Hant", // Chinese (Traditional)
  "zu", // Zulu - Google Play only
] as const;

export type UnifiedLocale = (typeof UNIFIED_LOCALES)[number];

/**
 * Default locale (for fallback)
 */
export const DEFAULT_LOCALE: UnifiedLocale = "en-US";

// ============================================================================
// Platform-Specific Locale Mappings
// ============================================================================

/**
 * Unified locale to App Store Connect locale mapping
 * Maps our unified locale codes to App Store Connect API codes
 */
export const UNIFIED_TO_APP_STORE: Record<UnifiedLocale, string | null> = {
  af: null, // Not supported by App Store
  am: null, // Not supported by App Store
  ar: "ar-SA",
  "az-AZ": null, // Not supported by App Store
  be: null, // Not supported by App Store
  "bg-BG": null, // Not supported by App Store
  "bn-BD": null, // Not supported by App Store
  "ca-ES": "ca",
  "cs-CZ": "cs",
  "da-DK": "da",
  "de-DE": "de-DE",
  "el-GR": "el",
  "en-AU": "en-AU",
  "en-CA": "en-CA",
  "en-GB": "en-GB",
  "en-IN": null, // Not supported by App Store
  "en-SG": null, // Not supported by App Store
  "en-US": "en-US",
  "en-ZA": null, // Not supported by App Store
  "es-419": "es-MX", // Latin America → Mexico for App Store
  "es-ES": "es-ES",
  "es-US": null, // Not supported by App Store
  "et-EE": null, // Not supported by App Store
  "eu-ES": null, // Not supported by App Store
  fa: null, // Not supported by App Store
  "fa-AE": null, // Not supported by App Store
  "fa-AF": null, // Not supported by App Store
  "fa-IR": null, // Not supported by App Store
  "fi-FI": "fi",
  fil: null, // Not supported by App Store
  "fr-CA": "fr-CA",
  "fr-FR": "fr-FR",
  "gl-ES": null, // Not supported by App Store
  gu: null, // Not supported by App Store
  "he-IL": "he",
  "hi-IN": "hi",
  "hr-HR": "hr",
  "hu-HU": "hu",
  "hy-AM": null, // Not supported by App Store
  "id-ID": "id",
  "is-IS": null, // Not supported by App Store
  "it-IT": "it",
  "ja-JP": "ja",
  "ka-GE": null, // Not supported by App Store
  kk: null, // Not supported by App Store
  "km-KH": null, // Not supported by App Store
  "kn-IN": null, // Not supported by App Store
  "ko-KR": "ko",
  "ky-KG": null, // Not supported by App Store
  "lo-LA": null, // Not supported by App Store
  "lt-LT": null, // Not supported by App Store
  "lv-LV": null, // Not supported by App Store
  "mk-MK": null, // Not supported by App Store
  "ml-IN": null, // Not supported by App Store
  "mn-MN": null, // Not supported by App Store
  "mr-IN": null, // Not supported by App Store
  ms: null, // Use ms-MY for App Store Malay coverage
  "ms-MY": "ms",
  "my-MM": null, // Not supported by App Store
  "ne-NP": null, // Not supported by App Store
  "nl-NL": "nl-NL",
  "no-NO": "no",
  pa: null, // Not supported by App Store
  "pl-PL": "pl",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  rm: null, // Not supported by App Store
  "ro-RO": "ro",
  "ru-RU": "ru",
  "si-LK": null, // Not supported by App Store
  "sk-SK": "sk",
  "sl-SI": null, // Not supported by App Store
  sq: null, // Not supported by App Store
  "sr-RS": null, // Not supported by App Store
  "sv-SE": "sv",
  sw: null, // Not supported by App Store
  "ta-IN": null, // Not supported by App Store
  "te-IN": null, // Not supported by App Store
  "th-TH": "th",
  "tr-TR": "tr",
  "uk-UA": "uk",
  ur: null, // Not supported by App Store
  "vi-VN": "vi",
  "zh-HK": null, // Not supported by App Store
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  zu: null, // Not supported by App Store
};

/**
 * Unified locale to Google Play Console locale mapping
 * Maps our unified locale codes to Google Play Console API codes
 */
export const UNIFIED_TO_GOOGLE_PLAY: Record<UnifiedLocale, string | null> = {
  af: "af",
  am: "am",
  ar: "ar",
  "az-AZ": "az-AZ",
  be: "be",
  "bg-BG": "bg",
  "bn-BD": "bn-BD",
  "ca-ES": "ca",
  "cs-CZ": "cs-CZ",
  "da-DK": "da-DK",
  "de-DE": "de-DE",
  "el-GR": "el-GR",
  "en-AU": "en-AU",
  "en-CA": "en-CA",
  "en-GB": "en-GB",
  "en-IN": "en-IN",
  "en-SG": "en-SG",
  "en-US": "en-US",
  "en-ZA": "en-ZA",
  "es-419": "es-419",
  "es-ES": "es-ES",
  "es-US": "es-US",
  "et-EE": "et",
  "eu-ES": "eu-ES",
  fa: "fa",
  "fa-AE": "fa-AE",
  "fa-AF": "fa-AF",
  "fa-IR": "fa-IR",
  "fi-FI": "fi-FI",
  fil: "fil",
  "fr-CA": "fr-CA",
  "fr-FR": "fr-FR",
  "gl-ES": "gl-ES",
  gu: "gu",
  "he-IL": "iw-IL",
  "hi-IN": "hi-IN",
  "hr-HR": "hr",
  "hu-HU": "hu-HU",
  "hy-AM": "hy-AM",
  "id-ID": "id", // Google Play also accepts "in"
  "is-IS": "is-IS",
  "it-IT": "it-IT",
  "ja-JP": "ja-JP",
  "ka-GE": "ka-GE",
  kk: "kk",
  "km-KH": "km-KH",
  "kn-IN": "kn-IN",
  "ko-KR": "ko-KR",
  "ky-KG": "ky-KG",
  "lo-LA": "lo-LA",
  "lt-LT": "lt",
  "lv-LV": "lv",
  "mk-MK": "mk-MK",
  "ml-IN": "ml-IN",
  "mn-MN": "mn-MN",
  "mr-IN": "mr-IN",
  ms: "ms",
  "ms-MY": "ms-MY",
  "my-MM": "my-MM",
  "ne-NP": "ne-NP",
  "nl-NL": "nl-NL",
  "no-NO": "no-NO",
  pa: "pa",
  "pl-PL": "pl-PL",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  rm: "rm",
  "ro-RO": "ro",
  "ru-RU": "ru-RU",
  "si-LK": "si-LK",
  "sk-SK": "sk",
  "sl-SI": "sl",
  sq: "sq",
  "sr-RS": "sr",
  "sv-SE": "sv-SE",
  sw: "sw",
  "ta-IN": "ta-IN",
  "te-IN": "te-IN",
  "th-TH": "th",
  "tr-TR": "tr-TR",
  "uk-UA": "uk",
  ur: "ur",
  "vi-VN": "vi",
  "zh-HK": "zh-HK",
  "zh-Hans": "zh-CN", // Simplified Chinese → China for Google Play
  "zh-Hant": "zh-TW", // Traditional Chinese → Taiwan for Google Play
  zu: "zu",
};

/**
 * App Store Connect locale to unified locale mapping
 * Reverse mapping for converting App Store codes to our unified system
 */
export const APP_STORE_TO_UNIFIED: Record<string, UnifiedLocale> = {
  "en-US": "en-US",
  "en-AU": "en-AU",
  "en-CA": "en-CA",
  "en-GB": "en-GB",
  ko: "ko-KR",
  ja: "ja-JP",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  "fr-FR": "fr-FR",
  "fr-CA": "fr-CA",
  "de-DE": "de-DE",
  it: "it-IT",
  "es-ES": "es-ES",
  "es-MX": "es-419", // Mexico → Latin America in unified system
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  ru: "ru-RU",
  "ar-SA": "ar", // Saudi Arabia → Generic Arabic in unified system
  "nl-NL": "nl-NL",
  sv: "sv-SE",
  da: "da-DK",
  no: "no-NO",
  fi: "fi-FI",
  pl: "pl-PL",
  tr: "tr-TR",
  vi: "vi-VN",
  th: "th-TH",
  id: "id-ID",
  ms: "ms-MY",
  hi: "hi-IN",
  cs: "cs-CZ",
  sk: "sk-SK",
  hu: "hu-HU",
  ro: "ro-RO",
  uk: "uk-UA",
  he: "he-IL",
  el: "el-GR",
  ca: "ca-ES",
  hr: "hr-HR",
};

/**
 * Google Play Console locale to unified locale mapping
 * Reverse mapping for converting Google Play codes to our unified system
 */
export const GOOGLE_PLAY_TO_UNIFIED: Record<string, UnifiedLocale> = {
  af: "af",
  am: "am",
  ar: "ar",
  "az-AZ": "az-AZ",
  be: "be",
  bg: "bg-BG",
  "bn-BD": "bn-BD",
  ca: "ca-ES",
  "cs-CZ": "cs-CZ",
  cs: "cs-CZ",
  "da-DK": "da-DK",
  da: "da-DK",
  "de-DE": "de-DE",
  de: "de-DE",
  "el-GR": "el-GR",
  el: "el-GR",
  "en-AU": "en-AU",
  "en-CA": "en-CA",
  "en-GB": "en-GB",
  "en-IN": "en-IN",
  "en-SG": "en-SG",
  "en-US": "en-US",
  "en-ZA": "en-ZA",
  "es-419": "es-419",
  "es-ES": "es-ES",
  es: "es-ES",
  "es-US": "es-US",
  et: "et-EE",
  "et-EE": "et-EE",
  "eu-ES": "eu-ES",
  fa: "fa",
  "fa-AE": "fa-AE",
  "fa-AF": "fa-AF",
  "fa-IR": "fa-IR",
  "fi-FI": "fi-FI",
  fi: "fi-FI",
  fil: "fil",
  "fr-FR": "fr-FR",
  fr: "fr-FR",
  "fr-CA": "fr-CA",
  "gl-ES": "gl-ES",
  gu: "gu",
  "iw-IL": "he-IL",
  "he-IL": "he-IL",
  he: "he-IL",
  "hi-IN": "hi-IN",
  hi: "hi-IN",
  hr: "hr-HR",
  "hu-HU": "hu-HU",
  hu: "hu-HU",
  "hy-AM": "hy-AM",
  id: "id-ID", // Google Play "id" or "in" maps to unified "id-ID"
  in: "id-ID", // Alternative Indonesian code
  "is-IS": "is-IS",
  "it-IT": "it-IT",
  it: "it-IT",
  "ja-JP": "ja-JP",
  ja: "ja-JP",
  "ka-GE": "ka-GE",
  kk: "kk",
  "km-KH": "km-KH",
  "kn-IN": "kn-IN",
  "ko-KR": "ko-KR",
  ko: "ko-KR",
  "ky-KG": "ky-KG",
  "lo-LA": "lo-LA",
  lt: "lt-LT",
  "lt-LT": "lt-LT",
  lv: "lv-LV",
  "lv-LV": "lv-LV",
  "mk-MK": "mk-MK",
  "ml-IN": "ml-IN",
  "mn-MN": "mn-MN",
  "mr-IN": "mr-IN",
  ms: "ms",
  "ms-MY": "ms-MY",
  "my-MM": "my-MM",
  "ne-NP": "ne-NP",
  "nl-NL": "nl-NL",
  nl: "nl-NL",
  "no-NO": "no-NO",
  no: "no-NO",
  pa: "pa",
  "pl-PL": "pl-PL",
  pl: "pl-PL",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  rm: "rm",
  ro: "ro-RO",
  "ru-RU": "ru-RU",
  ru: "ru-RU",
  "si-LK": "si-LK",
  sk: "sk-SK",
  "sl-SI": "sl-SI",
  sl: "sl-SI",
  sq: "sq",
  sr: "sr-RS",
  "sv-SE": "sv-SE",
  sv: "sv-SE",
  sw: "sw",
  "ta-IN": "ta-IN",
  "te-IN": "te-IN",
  th: "th-TH",
  "tr-TR": "tr-TR",
  tr: "tr-TR",
  uk: "uk-UA",
  ur: "ur",
  vi: "vi-VN",
  "zh-HK": "zh-HK",
  "zh-CN": "zh-Hans", // China → Simplified Chinese in unified system
  "zh-TW": "zh-Hant", // Taiwan → Traditional Chinese in unified system
  zu: "zu",
};

// ============================================================================
// Supported Locales by Platform
// ============================================================================

/**
 * Locales supported by App Store Connect
 */
export const APP_STORE_SUPPORTED_LOCALES = UNIFIED_LOCALES.filter(
  (locale) => UNIFIED_TO_APP_STORE[locale] !== null
);

/**
 * Locales supported by Google Play Console
 */
export const GOOGLE_PLAY_SUPPORTED_LOCALES = UNIFIED_LOCALES.filter(
  (locale) => UNIFIED_TO_GOOGLE_PLAY[locale] !== null
);

/**
 * Locales supported by both platforms
 */
export const COMMON_SUPPORTED_LOCALES = UNIFIED_LOCALES.filter(
  (locale) =>
    UNIFIED_TO_APP_STORE[locale] !== null &&
    UNIFIED_TO_GOOGLE_PLAY[locale] !== null
);

// ============================================================================
// Conversion Functions
// ============================================================================

/**
 * Convert App Store Connect locale code to unified locale
 * @param appStoreLocale - App Store Connect locale code
 * @returns Unified locale code
 */
export function appStoreToUnified(appStoreLocale: string): UnifiedLocale {
  const unified = APP_STORE_TO_UNIFIED[appStoreLocale];
  if (!unified) {
    throw new Error(`Unknown App Store locale: ${appStoreLocale}`);
  }
  return unified;
}

/**
 * Convert Google Play Console locale code to unified locale
 * @param googlePlayLocale - Google Play Console locale code
 * @returns Unified locale code
 */
export function googlePlayToUnified(googlePlayLocale: string): UnifiedLocale {
  const unified = GOOGLE_PLAY_TO_UNIFIED[googlePlayLocale];
  if (!unified) {
    throw new Error(`Unknown Google Play locale: ${googlePlayLocale}`);
  }
  return unified;
}
