// Storybook-only mock of @orderly.network/hooks.
// The real hooks require a live OrderlyAppProvider connected to a broker's
// WebSocket/REST API. For a static visual preview we fake just enough of
// the shape SymbolSelector reads (a markets array) with realistic-looking
// demo data — no network calls, no broker id involved.
const DEMO_MARKETS = [
  { symbol: "PERP_BTC_USDC" },
  { symbol: "PERP_ETH_USDC" },
  { symbol: "PERP_SOL_USDC" },
  { symbol: "PERP_ARB_USDC" },
  { symbol: "PERP_OP_USDC" },
];

export function useMarkets() {
  return [DEMO_MARKETS, { isLoading: false }];
}
