const DEFAULT_LEFT_SYMBOL = "PERP_BTC_USDC";
const DEFAULT_RIGHT_SYMBOL = "PERP_ETH_USDC";

const MULTISCREEN_LEFT_SYMBOL_KEY = "orderly-multiscreen-left-symbol";
const MULTISCREEN_RIGHT_SYMBOL_KEY = "orderly-multiscreen-right-symbol";

export function getMultiScreenSymbol(position: 'left' | 'right'): string {
  const key = position === 'left'
    ? MULTISCREEN_LEFT_SYMBOL_KEY
    : MULTISCREEN_RIGHT_SYMBOL_KEY;
  const stored = localStorage.getItem(key);
  return stored || (position === 'left' ? DEFAULT_LEFT_SYMBOL : DEFAULT_RIGHT_SYMBOL);
}

export function updateMultiScreenSymbol(position: 'left' | 'right', symbol: string) {
  const key = position === 'left'
    ? MULTISCREEN_LEFT_SYMBOL_KEY
    : MULTISCREEN_RIGHT_SYMBOL_KEY;
  localStorage.setItem(key, symbol || DEFAULT_LEFT_SYMBOL);
}
