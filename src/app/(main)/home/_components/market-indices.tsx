import React from "react";

interface IndexProps {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const IndexCard: React.FC<IndexProps> = ({
  name,
  value,
  change,
  isPositive,
}) => {
  return (
    <div className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700">
      <span className="text-sm text-gray-600 dark:text-gray-400">{name}</span>
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{value}</span>
      <span
        className={`text-sm ${
          isPositive ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
      </span>
    </div>
  );
};

const MarketIndices: React.FC = () => {
  return (
    <div className="mb-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Indices</h2>
        <a href="#" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
          All indices
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IndexCard
          name="NIFTY"
          value="23,591.95"
          change="105.10 (0.45%)"
          isPositive={true}
        />
        <IndexCard
          name="SENSEX"
          value="77,606.43"
          change="317.93 (0.41%)"
          isPositive={true}
        />
        <IndexCard
          name="BANKNIFTY"
          value="51,576.85"
          change="346.65 (0.7%)"
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default MarketIndices;