import { useState, useCallback } from "react";
import type { API } from "@orderly.network/types";
import { getMultiScreenSymbol, updateMultiScreenSymbol } from "./storage";
import { CustomTradingView } from "./CustomTradingView";

export interface MultiScreenProps {
  /** TradingView chart configuration. Pass from your app's useOrderlyConfig(). */
  tradingViewConfig?: any;
  /** Share PnL configuration. Pass from your app's useOrderlyConfig(). */
  sharePnLConfig?: any;
}

/**
 * Multi-screen trading view with two side-by-side charts.
 * Each chart has independent symbol selection persisted in localStorage.
 *
 * Usage:
 * ```tsx
 * import { MultiScreen } from '@orderly-plugins/multiscreen';
 * import '@orderly-plugins/multiscreen/styles.css';
 *
 * function MultiScreenPage() {
 *   const config = useOrderlyConfig();
 *   return (
 *     <MultiScreen
 *       tradingViewConfig={config.tradingPage.tradingViewConfig}
 *       sharePnLConfig={config.tradingPage.sharePnLConfig}
 *     />
 *   );
 * }
 * ```
 */
export function MultiScreen({
  tradingViewConfig,
  sharePnLConfig,
}: MultiScreenProps) {
  const [leftSymbol, setLeftSymbol] = useState(getMultiScreenSymbol('left'));
  const [rightSymbol, setRightSymbol] = useState(getMultiScreenSymbol('right'));

  const onLeftSymbolChange = useCallback((data: API.Symbol) => {
    setLeftSymbol(data.symbol);
    updateMultiScreenSymbol('left', data.symbol);
  }, []);

  const onRightSymbolChange = useCallback((data: API.Symbol) => {
    setRightSymbol(data.symbol);
    updateMultiScreenSymbol('right', data.symbol);
  }, []);

  return (
    <div className="multiscreen-container">
      <div className="multiscreen-chart-panel">
        <CustomTradingView
          symbol={leftSymbol}
          onSymbolChange={onLeftSymbolChange}
          tradingViewConfig={tradingViewConfig}
          sharePnLConfig={sharePnLConfig}
        />
      </div>
      <div className="multiscreen-chart-panel">
        <CustomTradingView
          symbol={rightSymbol}
          onSymbolChange={onRightSymbolChange}
          tradingViewConfig={tradingViewConfig}
          sharePnLConfig={sharePnLConfig}
        />
      </div>
    </div>
  );
}
