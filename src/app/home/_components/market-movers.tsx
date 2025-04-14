import React, { useState } from "react";

interface StockProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const StockItem: React.FC<StockProps> = ({
  symbol,
  name,
  price,
  change,
  isPositive,
}) => {
  return (
    <div className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg">
      <div className="text-xs text-gray-500 mb-1">{symbol}</div>
      <div className="text-sm font-medium mb-1">{name}</div>
      <div className="flex justify-between items-center">
        <span className="text-md font-bold">₹{price}</span>
        <span
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}
        </span>
      </div>
    </div>
  );
};

const MarketMovers: React.FC = () => {
  const [gainersFilter, setGainersFilter] = useState("large");
  const [losersFilter, setLosersFilter] = useState("large");

  return (
    <div className="mb-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Top Gainers</h2>
          <a href="#" className="text-sm text-blue-500">
            See more
          </a>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              gainersFilter === "large"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setGainersFilter("large")}
          >
            Large
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              gainersFilter === "mid"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setGainersFilter("mid")}
          >
            Mid
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              gainersFilter === "small"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setGainersFilter("small")}
          >
            Small
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StockItem
            symbol="ADANI"
            name="Adani Energy"
            price="872.85"
            change="2.40% (20.50)"
            isPositive={true}
          />
          <StockItem
            symbol="ADANI"
            name="Adani Green Energy"
            price="898.90"
            change="1.95% (17.20)"
            isPositive={true}
          />
          <StockItem
            symbol="BANKBARODA"
            name="Bank of Baroda"
            price="230.96"
            change="3.65% (8.15)"
            isPositive={true}
          />
          <StockItem
            symbol="ADANI"
            name="Adani Power"
            price="519.90"
            change="4.35% (21.65)"
            isPositive={true}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Top Losers</h2>
          <a href="#" className="text-sm text-blue-500">
            See more
          </a>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              losersFilter === "large"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setLosersFilter("large")}
          >
            Large
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              losersFilter === "mid"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setLosersFilter("mid")}
          >
            Mid
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              losersFilter === "small"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setLosersFilter("small")}
          >
            Small
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StockItem
            symbol="TATAMOTORS"
            name="Tata Motors"
            price="868.55"
            change="-0.78% (6.85)"
            isPositive={false}
          />
          <StockItem
            symbol="NTPC"
            name="NTPC"
            price="324.34"
            change="-1.48% (4.86)"
            isPositive={false}
          />
          <StockItem
            symbol="GRASIM"
            name="Grasim Industries"
            price="2131.91"
            change="-0.52% (11.20)"
            isPositive={false}
          />
          <StockItem
            symbol="SIEMENS"
            name="Siemens"
            price="5,314.15"
            change="-0.42% (22.60)"
            isPositive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketMovers;
