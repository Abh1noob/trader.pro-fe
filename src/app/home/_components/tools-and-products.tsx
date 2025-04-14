import React from "react";
import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, name }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="w-10 h-10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
};

const ToolsAndProducts: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Products & tools</h2>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        <ToolCard
          icon={<ChartBarIcon className="w-6 h-6 text-green-500" />}
          name="Terminal"
        />
        <ToolCard
          icon={<CurrencyRupeeIcon className="w-6 h-6 text-green-500" />}
          name="Events"
        />
        <ToolCard
          icon={<ArrowsRightLeftIcon className="w-6 h-6 text-green-500" />}
          name="Intraday"
        />
        <ToolCard
          icon={<BeakerIcon className="w-6 h-6 text-green-500" />}
          name="IPO"
        />
        <ToolCard
          icon={<MagnifyingGlassIcon className="w-6 h-6 text-green-500" />}
          name="Screener"
        />
      </div>
    </div>
  );
};

export default ToolsAndProducts;
