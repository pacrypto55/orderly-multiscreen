import { TradingPage } from "@orderly.network/trading";

export interface CustomTradingViewProps {
  symbol: string;
  onSymbolChange?: (data: any) => void;
  /** TradingView chart configuration. Pass from your app's config. */
  tradingViewConfig?: any;
  /** Share PnL configuration. Pass from your app's config. */
  sharePnLConfig?: any;
}

export function CustomTradingView({
  symbol,
  onSymbolChange,
  tradingViewConfig,
  sharePnLConfig,
}: CustomTradingViewProps) {
  return (
    <div className="custom-trading-view-wrapper">
      <TradingPage
        symbol={symbol}
        onSymbolChange={onSymbolChange}
        tradingViewConfig={tradingViewConfig}
        sharePnLConfig={sharePnLConfig}
      />
    </div>
  );
}
