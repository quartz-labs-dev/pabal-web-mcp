import fs from "node:fs";
import path from "node:path";
import type { AsoData } from "../../../types/aso/index.js";

/**
 * Load ASO data from .aso/pullData
 */
export function loadPullData(slug: string): AsoData {
  const asoData: AsoData = {};

  // Load Google Play data
  const googlePlayPath = path.join(
    process.cwd(),
    ".aso",
    "pullData",
    "products",
    slug,
    "store",
    "google-play",
    "aso-data.json"
  );

  if (fs.existsSync(googlePlayPath)) {
    try {
      const content = fs.readFileSync(googlePlayPath, "utf-8");
      const data = JSON.parse(content);
      if (data.googlePlay) {
        asoData.googlePlay = data.googlePlay;
      }
    } catch (error) {
      throw new Error(`Failed to read Google Play data: ${error}`);
    }
  }

  // Load App Store data
  const appStorePath = path.join(
    process.cwd(),
    ".aso",
    "pullData",
    "products",
    slug,
    "store",
    "app-store",
    "aso-data.json"
  );

  if (fs.existsSync(appStorePath)) {
    try {
      const content = fs.readFileSync(appStorePath, "utf-8");
      const data = JSON.parse(content);
      if (data.appStore) {
        asoData.appStore = data.appStore;
      }
    } catch (error) {
      throw new Error(`Failed to read App Store data: ${error}`);
    }
  }

  return asoData;
}

