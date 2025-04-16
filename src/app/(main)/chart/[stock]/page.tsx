"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  AreaData,
  CandlestickData,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { LineChart, BarChart3, TrendingUp, Settings, X } from "lucide-react";
import { ChartType, Timeframe, OptionData, OptionRight } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getIntervalParam, getStockOrOptionData } from "./services";

const TradingViewWidget: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(
    null
  );
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [settings, setSettings] = useState({
    fromDate: "2022-04-19T07:00:00.000Z",
    toDate: "2022-04-19T18:00:00.000Z",
    expiryDate: "2022-04-21T07:00:00.000Z",
    strikePrice: "17000",
    stockCode: "NIFTY",
    right: "put" as OptionRight,
    dataType: "option",
  });

  const {
    data: optionData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["optionOrStockData", settings, timeframe],
    queryFn: () => getStockOrOptionData(settings, timeframe),
    enabled: !!settings,
  });

  const convertToChartData = (data: OptionData[]): CandlestickData[] => {
    return data.map((item) => {
      const dateObj = new Date(item.datetime.replace(" ", "T"));

      let time: Time;
      if (timeframe === "1d") {
        time = dateObj.toISOString().split("T")[0];
      } else {
        time = Math.floor(dateObj.getTime() / 1000) as UTCTimestamp;
      }

      return {
        time,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
      };
    });
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#111827" },
        textColor: "#f3f4f6",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
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
    if (!chartRef.current || isLoading || error || !optionData.length) return;

    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    const chartData = convertToChartData(optionData);

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
        candlestickSeries.setData(chartData);
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
        const lineData: LineData[] = chartData.map((d) => ({
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
        const areaData: AreaData[] = chartData.map((d) => ({
          time: d.time,
          value: d.close,
        }));
        areaSeries.setData(areaData);
        seriesRef.current = areaSeries;
        break;
      }
    }

    chartRef.current.timeScale().fitContent();
  }, [chartType, optionData, isLoading, error]);

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

  const SettingsPanel = () => (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-gray-800 text-gray-100 p-4 shadow-lg z-20 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={() => setShowSettings(false)}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data Type</label>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md ${
                settings.dataType === "option" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => setSettings({ ...settings, dataType: "option" })}
            >
              Options
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                settings.dataType === "stock" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => setSettings({ ...settings, dataType: "stock" })}
            >
              Stocks
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="stockCode" className="block text-sm font-medium mb-1">
            Stock/Index Code
          </label>
          <input
            id="stockCode"
            type="text"
            value={settings.stockCode}
            onChange={(e) =>
              setSettings({ ...settings, stockCode: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Examples: NIFTY, BANKNIFTY, RELIANCE, TCS
          </p>
        </div>

        {settings.dataType === "option" && (
          <>
            <div>
              <label
                htmlFor="strikePrice"
                className="block text-sm font-medium mb-1"
              >
                Strike Price
              </label>
              <input
                id="strikePrice"
                type="number"
                value={settings.strikePrice}
                onChange={(e) =>
                  setSettings({ ...settings, strikePrice: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Option Type
              </label>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-md ${
                    settings.right === "call" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSettings({ ...settings, right: "call" })}
                >
                  Call
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    settings.right === "put" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSettings({ ...settings, right: "put" })}
                >
                  Put
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium mb-1"
              >
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="datetime-local"
                value={settings.expiryDate.slice(0, 16)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    expiryDate: new Date(e.target.value).toISOString(),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium mb-1">
            From Date
          </label>
          <input
            id="fromDate"
            type="datetime-local"
            value={settings.fromDate.slice(0, 16)}
            onChange={(e) =>
              setSettings({
                ...settings,
                fromDate: new Date(e.target.value).toISOString(),
              })
            }
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="toDate" className="block text-sm font-medium mb-1">
            To Date
          </label>
          <input
            id="toDate"
            type="datetime-local"
            value={settings.toDate.slice(0, 16)}
            onChange={(e) =>
              setSettings({
                ...settings,
                toDate: new Date(e.target.value).toISOString(),
              })
            }
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => refetch}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          <h1 className="text-lg font-semibold">
            {settings.stockCode}{" "}
            {settings.dataType === "option"
              ? `${settings.strikePrice} ${settings.right.toUpperCase()}`
              : ""}
          </h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <TimeframeButton value="1m" label="1m" />
          <TimeframeButton value="15m" label="15m" />
          <TimeframeButton value="30m" label="30m" />
          <TimeframeButton value="1h" label="1h" />
          <TimeframeButton value="1d" label="1d" />
        </div>
        {/* Chart Type and Settings */}
        <div className="flex gap-1">
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
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 rounded-md transition-all bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
      {/* Chart Container */}
      <div className="chart-container flex-grow relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="bg-red-500 text-white p-4 rounded-md max-w-md">
              {error.message}
            </div>
          </div>
        )}
        <div
          className="tradingview-widget-container h-full w-full"
          ref={chartContainerRef}
        />
        {showSettings && <SettingsPanel />}
      </div>
      {/* Footer */}
      <div className="tradingview-widget-copyright py-2 px-3 text-center bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-xs flex justify-between items-center">
        <span>
          {optionData?.length > 0 && `Data points: ${optionData.length}`}
        </span>
        <span>
          {settings.dataType === "option"
            ? `${settings.stockCode} ${
                settings.strikePrice
              } ${settings.right.toUpperCase()} (${new Date(
                settings.expiryDate
              ).toLocaleDateString()})`
            : `${settings.stockCode} (${getIntervalParam(timeframe)})`}
        </span>
        <span>Powered by ICICI Breeze API</span>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
