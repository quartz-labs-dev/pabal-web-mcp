import { DEFAULT_LOCALE } from "../../../constants/unified-locales.js";

/**
 * Convert single-language data to multilingual structure
 */
export function convertToMultilingual<
  T extends { locale?: string; defaultLanguage?: string }
>(
  data: T,
  locale?: string
): { locales: { [key: string]: T }; defaultLocale: string } {
  const detectedLocale =
    locale || data.locale || data.defaultLanguage || DEFAULT_LOCALE;
  return {
    locales: {
      [detectedLocale]: data,
    },
    defaultLocale: detectedLocale,
  };
}

