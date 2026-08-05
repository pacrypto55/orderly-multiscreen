// Storybook-only mock of @orderly.network/trading.
// The real <TradingPage> needs a live OrderlyAppProvider (WebSocket/REST
// connection to a broker) to render an actual chart + order book. For a
// visual preview of the multiscreen LAYOUT (the thing this plugin actually
// adds) we approximate TradingPage's look — a candlestick chart next to a
// compact order-entry panel — with static, clearly-fake generated data.
// No network calls, no broker id involved.
import type { ReactNode } from "react";

export interface TradingPageProps {
  symbol: string;
  onSymbolChange?: (data: { symbol: string }) => void;
  tradingViewConfig?: unknown;
  sharePnLConfig?: unknown;
  children?: ReactNode;
}

// Tiny seeded PRNG so left/right panels get different-looking (but stable
// across re-renders) candles instead of Math.random() jitter.
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function seedFromSymbol(symbol: string) {
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) seed = (seed * 31 + symbol.charCodeAt(i)) & 0x7fffffff;
  return seed || 1;
}

function generateCandles(symbol: string, count: number) {
  const rand = seededRandom(seedFromSymbol(symbol));
  let price = 100 + rand() * 50;
  const candles = [];
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (rand() - 0.48) * 6;
    const close = Math.max(5, open + change);
    const high = Math.max(open, close) + rand() * 3;
    const low = Math.min(open, close) - rand() * 3;
    candles.push({ open, close, high, low });
    price = close;
  }
  return candles;
}

function Candlesticks({ symbol }: { symbol: string }) {
  const candles = generateCandles(symbol, 36);
  const allValues = candles.flatMap((c) => [c.high, c.low]);
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const range = max - min || 1;
  const width = 100 / candles.length;

  const toY = (v: number) => 100 - ((v - min) / range) * 100;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const x = i * width + width * 0.2;
        const bodyW = width * 0.6;
        const bodyTop = toY(Math.max(c.open, c.close));
        const bodyBottom = toY(Math.min(c.open, c.close));
        const color = up ? "#26d0a0" : "#f0616d";
        return (
          <g key={i}>
            <line
              x1={x + bodyW / 2}
              x2={x + bodyW / 2}
              y1={toY(c.high)}
              y2={toY(c.low)}
              stroke={color}
              strokeWidth={0.3}
            />
            <rect
              x={x}
              y={bodyTop}
              width={bodyW}
              height={Math.max(0.6, bodyBottom - bodyTop)}
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function TradingPage({ symbol }: TradingPageProps) {
  const candles = generateCandles(symbol + "-header", 1);
  const last = candles[0].close;
  const changePct = ((candles[0].close - candles[0].open) / candles[0].open) * 100;
  const up = changePct >= 0;

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background: "#16181d",
        border: "1px solid #262a33",
        borderRadius: 8,
        color: "#e6e8eb",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Chart column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            padding: "10px 14px",
            borderBottom: "1px solid #262a33",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700 }}>{symbol}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: up ? "#26d0a0" : "#f0616d" }}>
            {last.toFixed(2)}
          </span>
          <span style={{ fontSize: 12, color: up ? "#26d0a0" : "#f0616d" }}>
            {up ? "+" : ""}
            {changePct.toFixed(2)}%
          </span>
        </div>
        <div style={{ flex: 1, padding: "12px 8px 8px" }}>
          <Candlesticks symbol={symbol} />
        </div>
      </div>

      {/* Order entry column */}
      <div
        style={{
          width: 140,
          flexShrink: 0,
          borderLeft: "1px solid #262a33",
          display: "flex",
          flexDirection: "column",
          padding: 10,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              padding: "6px 0",
              borderRadius: 4,
              background: "#193832",
              color: "#26d0a0",
            }}
          >
            Buy
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              padding: "6px 0",
              borderRadius: 4,
              color: "#8a8f98",
            }}
          >
            Sell
          </div>
        </div>
        {["Price", "Amount"].map((label) => (
          <div key={label}>
            <div style={{ fontSize: 9, color: "#8a8f98", marginBottom: 3 }}>{label}</div>
            <div
              style={{
                height: 22,
                borderRadius: 4,
                background: "#1e2128",
                border: "1px solid #2b2f38",
              }}
            />
          </div>
        ))}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 700,
            padding: "8px 0",
            borderRadius: 4,
            background: "#26d0a0",
            color: "#0b0c0f",
          }}
        >
          Buy {symbol.split("_")[1] ?? ""}
        </div>
      </div>
    </div>
  );
}
