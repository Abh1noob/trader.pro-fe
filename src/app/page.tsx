"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  AreaData,
} from "lightweight-charts";
import { generateData, Timeframe } from "@/lib/charts";
import { LineChart, BarChart3, TrendingUp } from "lucide-react";

type ChartType = "candlestick" | "line" | "area";

const TradingViewWidget: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(
    null
  );
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [timeframe, setTimeframe] = useState<Timeframe>("1d");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#f3f4f6" },
        textColor: "#111827",
      },
      grid: {
        vertLines: { color: "#e5e7eb" },
        horzLines: { color: "#e5e7eb" },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "#6b7280",
          width: 1,
          style: 1,
          labelBackgroundColor: "#6b7280",
        },
        horzLine: {
          color: "#6b7280",
          width: 1,
          style: 1,
          labelBackgroundColor: "#6b7280",
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: timeframe === "1m",
        borderColor: "#d1d5db",
      },
      rightPriceScale: {
        borderColor: "#d1d5db",
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chart.applyOptions({
      layout: {
        background: { color: "#111827" },
        textColor: "#f3f4f6",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    const customData = generateData(timeframe);

    chartRef.current.applyOptions({
      timeScale: {
        timeVisible: true,
        secondsVisible: timeframe === "1m",
      },
    });

    switch (chartType) {
      case "candlestick": {
        const candlestickSeries = chartRef.current.addCandlestickSeries({
          upColor: "#10b981",
          downColor: "#ef4444",
          borderVisible: false,
          wickUpColor: "#10b981",
          wickDownColor: "#ef4444",
        });
        candlestickSeries.setData(customData);
        seriesRef.current = candlestickSeries;
        break;
      }
      case "line": {
        const lineSeries = chartRef.current.addLineSeries({
          color: "#3b82f6",
          lineWidth: 2,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 6,
        });
        const lineData: LineData[] = customData.map((d) => ({
          time: d.time,
          value: d.close,
        }));
        lineSeries.setData(lineData);
        seriesRef.current = lineSeries;
        break;
      }
      case "area": {
        const areaSeries = chartRef.current.addAreaSeries({
          topColor: "rgba(59, 130, 246, 0.56)",
          bottomColor: "rgba(59, 130, 246, 0.04)",
          lineColor: "#3b82f6",
          lineWidth: 2,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 6,
        });
        const areaData: AreaData[] = customData.map((d) => ({
          time: d.time,
          value: d.close,
        }));
        areaSeries.setData(areaData);
        seriesRef.current = areaSeries;
        break;
      }
    }

    chartRef.current.timeScale().fitContent();
  }, [chartType, timeframe]);

  const ChartTypeButton = ({
    type,
    icon,
    label,
  }: {
    type: ChartType;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
        chartType === type
          ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 shadow-md"
          : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
      onClick={() => setChartType(type)}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const TimeframeButton = ({
    value,
    label,
  }: {
    value: Timeframe;
    label: string;
  }) => (
    <button
      className={`px-3 py-1 rounded-md transition-all ${
        timeframe === value
          ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
          : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
      onClick={() => setTimeframe(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          <h1 className="text-lg font-semibold">Stock Name</h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <TimeframeButton value="1m" label="1m" />
          <TimeframeButton value="15m" label="15m" />
          <TimeframeButton value="30m" label="30m" />
          <TimeframeButton value="1h" label="1h" />
          <TimeframeButton value="1d" label="1d" />
        </div>
        {/* Chart Type Selection */}
        <div className="chart-type-controls flex gap-1">
          <ChartTypeButton
            type="candlestick"
            icon={<BarChart3 className="h-4 w-4" />}
            label="Candlestick"
          />
          <ChartTypeButton
            type="line"
            icon={<LineChart className="h-4 w-4" />}
            label="Line"
          />
          <ChartTypeButton
            type="area"
            icon={<TrendingUp className="h-4 w-4" />}
            label="Area"
          />
        </div>
      </div>
      {/* Chart Container */}
      <div className="chart-container flex-grow relative">
        <div
          className="tradingview-widget-container h-full w-full"
          ref={chartContainerRef}
        />
      </div>
      {/* Footer */}
      <div className="tradingview-widget-copyright py-2 px-3 text-center bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-xs">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Powered by TradingView
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
