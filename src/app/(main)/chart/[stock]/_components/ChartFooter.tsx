import React from "react";
import { OptionData } from "../types";

export interface ChartSettings {
  interval: string;
  from_date: string;
  to_date: string;
  stock_code: string;
  exchange_code: string;
  product_type: string;
  expiry_date: string;
  right: string;
  strike_price: string;
}

interface ChartFooterProps {
  marketData: OptionData[] | undefined;
  settings: ChartSettings;
}

const ChartFooter: React.FC<ChartFooterProps> = ({ marketData, settings }) => {
  const getIntervalDisplay = (interval: string) => {
    switch (interval) {
      case "1minute":
        return "1m";
      case "5minute":
        return "5m";
      case "30minute":
        return "30m";
      case "60minute":
        return "1h";
      case "1day":
        return "1D";
      default:
        return interval;
    }
  };

  return (
    <div className="tradingview-widget-copyright py-2 px-3 text-center bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-xs flex justify-between items-center">
      <span>
        {marketData &&
          marketData.length > 0 &&
          `Data points: ${marketData.length}`}
      </span>
      <span>
        {settings.product_type === "options"
          ? `${settings.stock_code} ${
              settings.strike_price
            } ${settings.right.toUpperCase()} ${
              settings.expiry_date
                ? `(${new Date(settings.expiry_date).toLocaleDateString()})`
                : ""
            }`
          : `${settings.stock_code} (${getIntervalDisplay(settings.interval)})`}
      </span>
      <span>Powered by ICICI Breeze API</span>
    </div>
  );
};

export default ChartFooter;
