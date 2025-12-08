# pabal-web-mcp

MCP (Model Context Protocol) server for ASO (App Store Optimization) data management with shared types and utilities.

## Installation

```bash
npm install pabal-web-mcp
```

## Usage

### Importing Types

```typescript
import type {
  // ASO Types
  AsoData,
  AppStoreAsoData,
  GooglePlayAsoData,

  // Product Types
  ProductConfig,
  ProductLocale,
  LandingPage,
  LandingHero,
  LandingScreenshots,
  LandingFeatures,
  LandingReviews,
  LandingCta,
} from "pabal-web-mcp";
```

### Importing Utilities

```typescript
import {
  // ASO Converter
  loadAsoFromConfig,

  // Locale Constants
  DEFAULT_LOCALE,
  UNIFIED_LOCALES,

  // Locale Converters
  unifiedToAppStore,
  unifiedToGooglePlay,
  appStoreToUnified,
  googlePlayToUnified,
} from "pabal-web-mcp";
```

### Example: Loading ASO Data

```typescript
import { loadAsoFromConfig } from "pabal-web-mcp";

const asoData = loadAsoFromConfig("my-app");
console.log(asoData.appStore?.name);
console.log(asoData.googlePlay?.title);
```

## MCP Server

This package includes an MCP server for managing ASO data through Claude or other MCP-compatible clients.

### Available Tools

| Tool | Description |
|------|-------------|
| `aso-to-public` | Convert ASO data to public config format |
| `public-to-aso` | Convert public config to ASO data format |
| `improve-public` | Improve product locale content with AI suggestions |
| `init-project` | Initialize a new product project structure |

### Running the MCP Server

```bash
npx pabal-web-mcp
```

Or add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "pabal-web-mcp": {
      "command": "npx",
      "args": ["pabal-web-mcp"]
    }
  }
}
```

## Types Reference

### ASO Types

- `AsoData` - Combined ASO data for both stores
- `AppStoreAsoData` - App Store specific ASO data
- `GooglePlayAsoData` - Google Play specific ASO data
- `AppStoreMultilingualAsoData` - Multilingual App Store data
- `GooglePlayMultilingualAsoData` - Multilingual Google Play data

### Product Types

- `ProductConfig` - Product configuration
- `ProductLocale` - Localized product content
- `LandingPage` - Landing page structure
- `AppPageData` - Complete app page data

### Locale Types

- `UnifiedLocale` - Unified locale code (e.g., "en-US", "ko-KR")

## Supported Locales

| Unified | App Store | Google Play |
|---------|-----------|-------------|
| en-US | en-US | en-US |
| ko-KR | ko | ko-KR |
| ja-JP | ja | ja-JP |
| zh-CN | zh-Hans | zh-CN |
| zh-TW | zh-Hant | zh-TW |
| de-DE | de-DE | de-DE |
| fr-FR | fr-FR | fr-FR |
| es-ES | es-ES | es-ES |
| pt-BR | pt-BR | pt-BR |
| ... | ... | ... |

## License

MIT
