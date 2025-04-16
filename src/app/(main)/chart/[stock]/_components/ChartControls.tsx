import React from "react";
import { LineChart, BarChart3, TrendingUp } from "lucide-react";
import { ChartType } from "../types";

interface ChartTypeButtonProps {
  type: ChartType;
  icon: React.ReactNode;
  label: string;
  onClick: (type: ChartType) => void;
  isActive: boolean;
}

const ChartTypeButton: React.FC<ChartTypeButtonProps> = ({
  type,
  icon,
  label,
  onClick,
  isActive,
}) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
      isActive
        ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 shadow-md"
        : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
    }`}
    onClick={() => onClick(type)}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

interface ChartControlsProps {
  chartType: ChartType;
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  setChartType,
}) => {
  return (
    <div className="chart-type-controls flex gap-1">
      <ChartTypeButton
        type="candlestick"
        icon={<BarChart3 className="h-4 w-4" />}
        label="Candlestick"
        onClick={setChartType}
        isActive={chartType === "candlestick"}
      />
      <ChartTypeButton
        type="line"
        icon={<LineChart className="h-4 w-4" />}
        label="Line"
        onClick={setChartType}
        isActive={chartType === "line"}
      />
      <ChartTypeButton
        type="area"
        icon={<TrendingUp className="h-4 w-4" />}
        label="Area"
        onClick={setChartType}
        isActive={chartType === "area"}
      />
    </div>
  );
};

export default ChartControls;
