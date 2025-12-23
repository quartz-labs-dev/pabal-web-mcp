import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export interface RegisteredAppStoreInfo {
  bundleId?: string;
  appId?: string;
  name?: string;
  supportedLocales?: string[];
}

export interface RegisteredApp {
  slug: string;
  name?: string;
  appStore?: RegisteredAppStoreInfo;
  googlePlay?: {
    packageName?: string;
    name?: string;
    supportedLocales?: string[];
  };
}

export interface RegisteredAppsFile {
  apps: RegisteredApp[];
}

const DEFAULT_REGISTERED_APPS_PATH = path.join(
  os.homedir(),
  ".config",
  "pabal-mcp",
  "registered-apps.json"
);

function safeReadJson(filePath: string): RegisteredAppsFile | null {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as RegisteredAppsFile;
    if (!parsed?.apps || !Array.isArray(parsed.apps)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function loadRegisteredApps(
  filePath: string = DEFAULT_REGISTERED_APPS_PATH
): { apps: RegisteredApp[]; path: string } {
  const data = safeReadJson(filePath);
  return { apps: data?.apps || [], path: filePath };
}

export function findRegisteredApp(
  slug: string,
  filePath?: string
): { app: RegisteredApp | undefined; path: string } {
  const { apps, path: usedPath } = loadRegisteredApps(filePath);
  const app = apps.find((a) => a.slug === slug);
  return { app, path: usedPath };
}

export function getSupportedLocalesForSlug(
  slug: string,
  platform: "ios" | "android",
  filePath?: string
): { supportedLocales: string[]; path: string } {
  const { app, path: usedPath } = findRegisteredApp(slug, filePath);
  if (!app) return { supportedLocales: [], path: usedPath };

  if (platform === "ios") {
    return {
      supportedLocales: app.appStore?.supportedLocales || [],
      path: usedPath,
    };
  }

  return {
    supportedLocales: app.googlePlay?.supportedLocales || [],
    path: usedPath,
  };
}
