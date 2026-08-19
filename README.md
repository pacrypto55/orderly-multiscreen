# @pacrypto55/multiscreen

Multi-screen trading view for Orderly Network DEXes. Adds a "Multi-screen" page with two independent, side-by-side chart panels — each with its own symbol selector and its own persisted symbol, so left/right selections survive a page reload.

![Two independent chart panels, BTC on the left and ETH on the right, each with its own symbol, timeframe and candles](https://raw.githubusercontent.com/pacrypto55/orderly-multiscreen/main/docs/screenshot-desktop.png)

Below a 1024px viewport the two panels stack vertically instead of sitting side by side:

![The same two panels stacked vertically on a narrow/mobile viewport](https://raw.githubusercontent.com/pacrypto55/orderly-multiscreen/main/docs/screenshot-mobile.png)

## Install

```bash
npm install @pacrypto55/multiscreen
# or
pnpm add @pacrypto55/multiscreen
# or
yarn add @pacrypto55/multiscreen
```

Peer dependencies: `react`, `react-dom`, `react-router-dom`, and `@orderly.network/hooks`, `types`, `trading`, `ui-scaffold`, `plugin-core` (all `^3.1.x`).

## Usage

There are two steps. The plugin itself only adds the "Multi-screen" entry to your main nav — mounting the actual route is manual, because the Orderly plugin system doesn't have a page/route injection API yet.

### 1. Register the plugin

```tsx
import { registerMultiscreenPlugin } from "@pacrypto55/multiscreen";

<OrderlyAppProvider
  plugins={[registerMultiscreenPlugin()]}
  // ...
>
  {/* your app */}
</OrderlyAppProvider>;
```

This injects a "Multi-screen" item into `Layout.MainMenus` pointing at `/multiscreen`. Pass `{ navItem: null }` if you'd rather add the nav link yourself, or `{ navItem: { name, href } }` to customize the label/path.

### 2. Mount the route

Add a route whose element is `MultiScreenLayout` (wraps the page in Orderly's `Scaffold`, wiring up nav/footer/bottom-nav) with an index route whose element is `MultiScreen` (the actual two-chart view):

```tsx
import { MultiScreenLayout, MultiScreen } from "@pacrypto55/multiscreen";
import "@pacrypto55/multiscreen/styles.css";
import { useOrderlyConfig } from "@/utils/config";
import { useNav } from "@/hooks/useNav";

function MultiScreenPageLayout() {
  const config = useOrderlyConfig();
  const { onRouteChange } = useNav();

  return (
    <MultiScreenLayout
      mainNavProps={{ ...config.scaffold.mainNavProps, initialMenu: "/multiscreen" }}
      footerProps={config.scaffold.footerProps}
      bottomNavProps={config.scaffold.bottomNavProps}
      onRouteChange={onRouteChange}
    />
  );
}

function MultiScreenPage() {
  const config = useOrderlyConfig();
  return (
    <MultiScreen
      tradingViewConfig={config.tradingPage.tradingViewConfig}
      sharePnLConfig={config.tradingPage.sharePnLConfig}
    />
  );
}

// in your router:
{
  path: "multiscreen",
  element: <MultiScreenPageLayout />,
  children: [{ index: true, element: <MultiScreenPage /> }],
}
```

`mainNavProps`, `footerProps`, `bottomNavProps`, `tradingViewConfig` and `sharePnLConfig` all come straight from your app's existing `useOrderlyConfig()` — no new config to write.

## What you get

- Two `CustomTradingView` panels side by side, each with an independent `SymbolSelector`.
- Per-panel symbol persisted to `localStorage` (`left` / `right`), so a reload keeps both charts where you left them.
- Responsive: panels stack vertically below 1024px viewport width instead of squeezing side by side.

## Known limitation

Hiding the order book / markets sidebar inside each panel relies on CSS targeting Orderly UI's internal class names (see `src/styles.css`), since the SDK has no public prop for this yet. If you're on an SDK version outside the `^3.1.x` range this package is built against, re-verify those selectors still match before relying on them.

## Development

```bash
npm install
npm run dev         # tsup --watch
npm run build        # tsup, then copies src/styles.css to dist/styles.css
npm run typecheck
```

## License

MIT
