"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useChartSettings } from "./_components/useChartSettings";
import { getHistoricalData } from "./services";
import {
  applyChartOptions,
  convertToChartData,
  updateChartSeries,
} from "./_components/ChartUtils";
import { Settings, TrendingUp } from "lucide-react";
import ChartControls from "./_components/ChartControls";
import SettingsPanel from "./_components/SettingsPanel";
import ChartFooter from "./_components/ChartFooter";

const TradingViewWidget: React.FC = () => {
  const params = useParams();
  const stockCode = (params?.stock as string) || "NIFTY";

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(
    null
  );
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const {
    chartType,
    setChartType,
    timeframe,
    setTimeframe,
    settings,
    setSettings,
  } = useChartSettings(stockCode);

  const {
    data: marketData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["historicalData", settings],
    queryFn: () => getHistoricalData(settings),
    enabled: !!settings.stock_code,
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 1000 * 60);
  }, []);

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
        secondsVisible: settings.interval === "1minute",
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
    if (!chartRef.current || isLoading || error || !marketData?.length) return;

    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    const chartData = convertToChartData(marketData, settings);

    applyChartOptions(chartRef.current, settings);

    seriesRef.current = updateChartSeries(
      chartRef.current,
      chartType,
      chartData
    );

    chartRef.current.timeScale().fitContent();
  }, [chartType, marketData, isLoading, error, settings]);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          <h1 className="text-lg font-semibold">
            {settings.stock_code}{" "}
            {settings.product_type === "options" && settings.strike_price
              ? `${settings.strike_price} ${settings.right.toUpperCase()}`
              : ""}
          </h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <button
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === "1m"
                ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
                : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            onClick={() => setTimeframe("1m")}
          >
            1m
          </button>
          <button
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === "15m"
                ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
                : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            onClick={() => setTimeframe("15m")}
          >
            15m
          </button>
          <button
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === "30m"
                ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
                : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            onClick={() => setTimeframe("30m")}
          >
            30m
          </button>
          <button
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === "1h"
                ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
                : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            onClick={() => setTimeframe("1h")}
          >
            1h
          </button>
          <button
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === "1d"
                ? "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 font-medium"
                : "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            onClick={() => setTimeframe("1d")}
          >
            1d
          </button>
        </div>
        {/* Chart Type and Settings */}
        <div className="flex gap-1">
          <ChartControls chartType={chartType} setChartType={setChartType} />
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
              {error instanceof Error ? error.message : "Failed to fetch data"}
            </div>
          </div>
        )}
        <div
          className="tradingview-widget-container h-full w-full"
          ref={chartContainerRef}
        />
        {showSettings && (
          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            setShowSettings={setShowSettings}
            refetch={refetch}
          />
        )}
      </div>
      {/* Footer */}
      <ChartFooter marketData={marketData} settings={settings} />
    </div>
  );
};

export default memo(TradingViewWidget);
