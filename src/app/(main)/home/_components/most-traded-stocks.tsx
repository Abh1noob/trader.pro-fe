import React from "react";

interface StockCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  price,
  change,
  isPositive,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-700 h-full flex flex-col">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
            {symbol.substring(0, 2)}
          </span>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{symbol}</div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">₹{price}</div>
        <div
          className={`text-sm ${
            isPositive ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}
        </div>
      </div>
    </div>
  );
};

const MostTradedStocks: React.FC = () => {
  return (
    <div className="mb-8 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Most Traded on Groww</h2>
        <a href="#" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
          See more
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StockCard
          symbol="RELIANCE"
          name="Reliance Industries"
          price="3514.70"
          change="0.65% (22.80)"
          isPositive={true}
        />
        <StockCard
          symbol="HDFCBANK"
          name="HDFC Bank"
          price="1,684.35"
          change="0.58% (9.80)"
          isPositive={true}
        />
        <StockCard
          symbol="TCS"
          name="Tata Consultancy"
          price="3,651.20"
          change="0.42% (15.40)"
          isPositive={true}
        />
        <StockCard
          symbol="INFY"
          name="Infosys"
          price="1,603.55"
          change="0.26% (4.10)"
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default MostTradedStocks;