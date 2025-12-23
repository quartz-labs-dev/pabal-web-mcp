import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getKeywordResearchDir } from "../utils/config.util.js";
import {
  loadProductLocales,
  resolvePrimaryLocale,
} from "./utils/improve-public/load-product-locales.util.js";
import {
  findRegisteredApp,
  getSupportedLocalesForSlug,
} from "../utils/registered-apps.util.js";

const TOOL_NAME = "keyword-research";

export const keywordResearchInputSchema = z.object({
  slug: z.string().trim().describe("Product slug"),
  locale: z
    .string()
    .trim()
    .describe("Locale code (e.g., en-US, ko-KR). Used for storage under .aso/keywordResearch/products/[slug]/locales/."),
  platform: z
    .enum(["ios", "android"])
    .default("ios")
    .describe("Store to target ('ios' or 'android'). Run separately per platform."),
  country: z
    .string()
    .length(2)
    .optional()
    .describe(
      "Two-letter store country code. If omitted, derived from locale region (e.g., ko-KR -> kr), else 'us'."
    ),
  seedKeywords: z
    .array(z.string().trim())
    .default([])
    .describe("Seed keywords to start from."),
  competitorApps: z
    .array(
      z.object({
        appId: z.string().trim().describe("App ID (package name or iOS ID/bundle)"),
        platform: z.enum(["ios", "android"]),
      })
    )
    .default([])
    .describe("Known competitor apps to probe."),
  filename: z
    .string()
    .trim()
    .optional()
    .describe("Override output filename. Defaults to keyword-research-[platform]-[country].json"),
  writeTemplate: z
    .boolean()
    .default(false)
    .describe("If true, write a JSON template at the output path."),
  researchData: z
    .string()
    .trim()
    .optional()
    .describe(
      "Optional JSON string with research results (e.g., from mcp-appstore tools). If provided, saves it to the output path."
    ),
  researchDataPath: z
    .string()
    .trim()
    .optional()
    .describe(
      "Optional path to a JSON file containing research results. If set, file content is saved to the output path (preferred to avoid escape errors)."
    ),
});

export type KeywordResearchInput = z.infer<typeof keywordResearchInputSchema>;

const jsonSchema = zodToJsonSchema(keywordResearchInputSchema as any, {
  name: "KeywordResearchInput",
  $refStrategy: "none",
});

const inputSchema = jsonSchema.definitions?.KeywordResearchInput || jsonSchema;

export const keywordResearchTool = {
  name: TOOL_NAME,
  description: `Prep + persist keyword research ahead of improve-public using mcp-appstore outputs.

Run this before improve-public. It gives a concrete MCP-powered research plan and a storage path under .aso/keywordResearch/products/[slug]/locales/[locale]/. Optionally writes a template or saves raw JSON from mcp-appstore tools.`,
  inputSchema,
};

function buildTemplate({
  slug,
  locale,
  platform,
  country,
  seedKeywords,
  competitorApps,
}: {
  slug: string;
  locale: string;
  platform: string;
  country: string;
  seedKeywords: string[];
  competitorApps: KeywordResearchInput["competitorApps"];
}) {
  const timestamp = new Date().toISOString();

  return {
    meta: {
      slug,
      locale,
      platform,
      country,
      seedKeywords,
      competitorApps,
      source: "mcp-appstore",
      updatedAt: timestamp,
    },
    plan: {
      steps: [
        "Start mcp-appstore server (node server.js in external-tools/mcp-appstore).",
        "Confirm app IDs/locales: get_app_details(appId from config/registered-apps) to lock country/lang and competitors.",
        "Discover competitors: search_app(term=seed keyword), get_similar_apps(appId=known competitor).",
        "Collect candidates: suggest_keywords_by_seeds/by_category/by_similarity/by_competition/by_search + suggest_keywords_by_apps(apps=[top competitors]).",
        "Score shortlist: get_keyword_scores for 15–30 candidates per platform/country.",
        "Context check: analyze_reviews and fetch_reviews on top apps for language/tone cues.",
        "If keywordSuggestions/similar/reviews are sparse, rerun calls (add more competitors/seeds) until you have 10–15 strong keywords."
      ],
      note: "Run per platform/country. Save raw tool outputs plus curated top keywords (target 10–15 per locale: 2–3 high-traffic core, 4–6 mid-competition, 4–6 longtail).",
    },
    data: {
      raw: {
        searchApp: [],
        getAppDetails: [],
        similarApps: [],
        keywordSuggestions: {
          bySeeds: [],
          byCategory: [],
          bySimilarity: [],
          byCompetition: [],
          bySearchHints: [],
          byApps: [],
        },
        keywordScores: [],
        reviewsAnalysis: [],
        reviewsRaw: [],
      },
      summary: {
        recommendedKeywords: [],
        rationale: "",
        nextActions:
          "Feed 10–15 mixed keywords (core/mid/longtail) into improve-public Stage 1.",
      },
    },
  };
}

function saveJsonFile({
  researchDir,
  fileName,
  payload,
}: {
  researchDir: string;
  fileName: string;
  payload: any;
}) {
  fs.mkdirSync(researchDir, { recursive: true });
  const outputPath = path.join(researchDir, fileName);
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf-8");
  return outputPath;
}

function normalizeKeywords(raw?: string[] | string): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((k) => k.trim()).filter((k) => k.length > 0);
  }
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

export async function handleKeywordResearch(
  input: KeywordResearchInput
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const {
    slug,
    locale,
    platform = "ios",
    country,
    seedKeywords = [],
    competitorApps = [],
    filename,
    writeTemplate = false,
    researchData,
    researchDataPath,
  } = input;

  const { config, locales } = loadProductLocales(slug);
  const primaryLocale = resolvePrimaryLocale(config, locales);
  const primaryLocaleData = locales[primaryLocale];
  const { app: registeredApp, path: registeredPath } = findRegisteredApp(slug);
  const { supportedLocales, path: supportedPath } =
    getSupportedLocalesForSlug(slug, platform);

  // Derive auto seeds/competitors if not provided
  const autoSeeds: string[] = [];
  const autoCompetitors: KeywordResearchInput["competitorApps"] = [];

  if (primaryLocaleData?.aso?.title) {
    autoSeeds.push(primaryLocaleData.aso.title);
  }
  const parsedKeywords = normalizeKeywords(primaryLocaleData?.aso?.keywords);
  autoSeeds.push(...parsedKeywords.slice(0, 5));

  if (config?.name) autoSeeds.push(config.name);
  if (config?.tagline) autoSeeds.push(config.tagline);
  if (!config?.name && registeredApp?.name) autoSeeds.push(registeredApp.name);
  if (!primaryLocaleData?.aso?.title) {
    if (platform === "ios" && registeredApp?.appStore?.name) {
      autoSeeds.push(registeredApp.appStore.name);
    }
    if (platform === "android" && registeredApp?.googlePlay?.name) {
      autoSeeds.push(registeredApp.googlePlay.name);
    }
  }

  if (platform === "ios") {
    if (config?.appStoreAppId) {
      autoCompetitors.push({ appId: String(config.appStoreAppId), platform });
    } else if (config?.bundleId) {
      autoCompetitors.push({ appId: config.bundleId, platform });
    } else if (registeredApp?.appStore?.appId) {
      autoCompetitors.push({
        appId: String(registeredApp.appStore.appId),
        platform,
      });
    } else if (registeredApp?.appStore?.bundleId) {
      autoCompetitors.push({
        appId: registeredApp.appStore.bundleId,
        platform,
      });
    }
  } else if (platform === "android" && config?.packageName) {
    autoCompetitors.push({ appId: config.packageName, platform });
  } else if (platform === "android" && registeredApp?.googlePlay?.packageName) {
    autoCompetitors.push({
      appId: registeredApp.googlePlay.packageName,
      platform,
    });
  }

  const resolvedSeeds =
    seedKeywords.length > 0 ? seedKeywords : Array.from(new Set(autoSeeds));
  const resolvedCompetitors =
    competitorApps.length > 0 ? competitorApps : autoCompetitors;

  const resolvedCountry =
    country ||
    (locale?.includes("-") ? locale.split("-")[1].toLowerCase() : "us");

  const researchDir = path.join(
    getKeywordResearchDir(),
    "products",
    slug,
    "locales",
    locale
  );
  const defaultFileName = `keyword-research-${platform}-${resolvedCountry}.json`;
  const fileName = filename || defaultFileName;

  let outputPath = path.join(researchDir, fileName);
  let fileAction: string | undefined;

  const parseJsonWithContext = (text: string) => {
    try {
      return JSON.parse(text);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const match =
        /position (\d+)/i.exec(message) ||
        /column (\d+)/i.exec(message) ||
        /char (\d+)/i.exec(message);
      if (match) {
        const pos = Number(match[1]);
        const start = Math.max(0, pos - 40);
        const end = Math.min(text.length, pos + 40);
        const context = text.slice(start, end);
        throw new Error(
          `Failed to parse researchData JSON: ${message}\nContext around ${pos}: ${context}`
        );
      }
      throw new Error(`Failed to parse researchData JSON: ${message}`);
    }
  };

  const loadResearchDataFromPath = (p: string) => {
    if (!fs.existsSync(p)) {
      throw new Error(`researchDataPath not found: ${p}`);
    }
    const raw = fs.readFileSync(p, "utf-8");
    return parseJsonWithContext(raw);
  };

  if (writeTemplate || researchData) {
    const payload = researchData
      ? parseJsonWithContext(researchData)
      : researchDataPath
      ? loadResearchDataFromPath(researchDataPath)
      : buildTemplate({
          slug,
          locale,
          platform,
          country: resolvedCountry,
          seedKeywords: resolvedSeeds,
          competitorApps: resolvedCompetitors,
        });

    outputPath = saveJsonFile({ researchDir, fileName, payload });
    fileAction = researchData ? "Saved provided researchData" : "Wrote template";
  }

  const templatePreview = JSON.stringify(
    buildTemplate({
      slug,
      locale,
      platform,
      country: resolvedCountry,
      seedKeywords: resolvedSeeds,
      competitorApps: resolvedCompetitors,
    }),
    null,
    2
  );

  const lines: string[] = [];
  lines.push(`# Keyword research plan (${slug})`);
  lines.push(`Locale: ${locale} | Platform: ${platform} | Country: ${resolvedCountry}`);
  lines.push(`Primary locale detected: ${primaryLocale}`);
  if (supportedLocales.length > 0) {
    lines.push(
      `Registered supported locales (${platform}): ${supportedLocales.join(
        ", "
      )} (source: ${supportedPath})`
    );
    if (!supportedLocales.includes(locale)) {
      lines.push(
        `WARNING: locale ${locale} not in registered supported locales. Confirm this locale or update registered-apps.json.`
      );
    }
  } else {
    lines.push(
      `Registered supported locales not found for ${platform} (checked: ${supportedPath}).`
    );
  }
  lines.push(
    `Seeds: ${
      resolvedSeeds.length > 0
        ? resolvedSeeds.join(", ")
        : "(none set; add seedKeywords or ensure ASO keywords/title exist)"
    }`
  );
  lines.push(
    `Competitors (from config if empty): ${
      resolvedCompetitors.length > 0
        ? resolvedCompetitors
            .map((c) => `${c.platform}:${c.appId}`)
            .join(", ")
        : "(none set; add competitorApps or set appStoreAppId/bundleId/packageName in config.json)"
    }`
  );
  lines.push("");
  lines.push("How to run (uses mcp-appstore):");
  lines.push(
    `1) Start the local mcp-appstore server for this run: node server.js (cwd: /ABSOLUTE/PATH/TO/pabal-web-mcp/external-tools/mcp-appstore). LLM should start it before calling tools and stop it after, if the client supports process management; otherwise, start/stop manually.`
  );
  lines.push(
    `2) Confirm IDs/locales: get_app_details(appId from config/registered-apps) to lock locale/country and competitor list.`
  );
  lines.push(
    `3) Discover apps: search_app(term=seed, platform=${platform}, country=${resolvedCountry}); get_similar_apps(appId=known competitor).`
  );
  lines.push(
    `4) Expand keywords: suggest_keywords_by_seeds/by_category/by_similarity/by_competition/by_search + suggest_keywords_by_apps(apps=[top competitors]).`
  );
  lines.push(
    `5) Score shortlist: get_keyword_scores for 15–30 candidates (note: scores are heuristic per README).`
  );
  lines.push(
    `6) Context check: analyze_reviews and fetch_reviews on top apps to harvest native phrasing; keep snippets for improve-public.`
  );
  lines.push(
    `7) Save all raw responses + your final 10–15 keywords (mix of core/high-traffic, mid, longtail) to: ${outputPath} (structure mirrors .aso/pullData/.aso/pushData under products/<slug>/locales/<locale>)`
  );
  lines.push(
    `8) If keywordSuggestions/similarApps/reviews are still empty or <10 solid candidates, add more competitors/seeds and rerun the calls above until you reach 10–15 strong keywords.`
  );
  if (fileAction) {
    lines.push(`File: ${fileAction} at ${outputPath}`);
  } else {
    lines.push(
      `Tip: set writeTemplate=true to create the JSON skeleton at ${outputPath}`
    );
  }
  lines.push("");
  lines.push("Suggested JSON shape:");
  lines.push("```json");
  lines.push(templatePreview);
  lines.push("```");

  return {
    content: [
      {
        type: "text",
        text: lines.join("\n"),
      },
    ],
  };
}
