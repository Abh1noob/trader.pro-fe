import React, { useState } from "react";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface WatchlistProps {
  name: string;
  count: number;
  stocks: Array<{
    symbol: string;
    lastPrice: string;
    change: string;
    isPositive: boolean;
  }>;
}

const WatchlistItem: React.FC<WatchlistProps> = ({ name, count, stocks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-500 ml-2">{count} stocks</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="px-4 pb-4">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700"
            >
              <span className="text-sm font-medium">{stock.symbol}</span>
              <div className="flex items-center">
                <span className="text-sm mr-3">₹{stock.lastPrice}</span>
                <span
                  className={`text-xs ${
                    stock.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stock.isPositive ? "+" : ""}
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Watchlist: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">All watchlists</h2>
        <a href="#" className="text-sm text-blue-500">
          View all
        </a>
      </div>

      <WatchlistItem
        name="Nifty 100"
        count={100}
        stocks={[
          {
            symbol: "RELIANCE",
            lastPrice: "3514.70",
            change: "0.65%",
            isPositive: true,
          },
          {
            symbol: "HDFCBANK",
            lastPrice: "1684.35",
            change: "0.58%",
            isPositive: true,
          },
          {
            symbol: "TCS",
            lastPrice: "3651.20",
            change: "0.42%",
            isPositive: true,
          },
        ]}
      />

      <WatchlistItem
        name="IT"
        count={5}
        stocks={[
          {
            symbol: "TCS",
            lastPrice: "3651.20",
            change: "0.42%",
            isPositive: true,
          },
          {
            symbol: "INFY",
            lastPrice: "1603.55",
            change: "0.26%",
            isPositive: true,
          },
          {
            symbol: "WIPRO",
            lastPrice: "478.65",
            change: "-0.32%",
            isPositive: false,
          },
        ]}
      />

      <WatchlistItem
        name="My Watchlist"
        count={8}
        stocks={[
          {
            symbol: "RELIANCE",
            lastPrice: "3514.70",
            change: "0.65%",
            isPositive: true,
          },
          {
            symbol: "TATAMOTORS",
            lastPrice: "868.55",
            change: "-0.78%",
            isPositive: false,
          },
          {
            symbol: "ADANIPOWER",
            lastPrice: "519.90",
            change: "4.35%",
            isPositive: true,
          },
        ]}
      />

      <button className="flex items-center justify-center w-full py-3 mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600">
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        <span>Create new watchlist</span>
      </button>
    </div>
  );
};

export default Watchlist;
