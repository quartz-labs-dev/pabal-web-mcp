import fs from "node:fs";
import path from "node:path";

/**
 * Copy /products assets from public/ into .aso/pushData
 */
export function copyLocalAssetToAsoDir(
  assetPath: string,
  outputPath: string
): boolean {
  const trimmedPath = assetPath
    .replace(/^\.\//, "")
    .replace(/^public\//, "")
    .replace(/^\/+/, "");
  const sourcePath = path.join(process.cwd(), "public", trimmedPath);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  Local image not found: ${sourcePath}`);
    return false;
  }

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, outputPath);
  return true;
}

