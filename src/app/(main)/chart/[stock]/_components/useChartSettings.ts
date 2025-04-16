"use client";

import { useState, useEffect } from "react";
import { ChartType, Timeframe } from "../types";
import { ChartSettings } from "./ChartFooter";

export const useChartSettings = (initialStockCode: string) => {
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const [settings, setSettings] = useState<ChartSettings>({
    interval: "1day",
    from_date: new Date("2024-04-01T00:00:00").toISOString(),
    to_date: "",
    stock_code: initialStockCode,
    exchange_code: "NSE",
    product_type: "cash",
    expiry_date: "",
    right: "call",
    strike_price: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const toDate =
        localStorage.getItem("simulationDate") || new Date().toISOString();
      setSettings((prev) => ({
        ...prev,
        to_date: toDate,
      }));
    }
  }, []);

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
    let interval: string;

    switch (newTimeframe) {
      case "1m":
        interval = "1minute";
        break;
      case "15m":
        interval = "5minute";
        break;
      case "30m":
        interval = "30minute";
        break;
      case "1h":
        interval = "60minute";
        break;
      case "1d":
        interval = "1day";
        break;
      default:
        interval = "1minute";
    }

    setSettings((prevSettings) => ({ ...prevSettings, interval }));
  };

  const getIntervalParam = (tf: Timeframe): string => {
    switch (tf) {
      case "1m":
        return "1minute";
      case "15m":
        return "5minute";
      case "30m":
        return "30minute";
      case "1h":
        return "60minute";
      case "1d":
        return "1day";
      default:
        return "1minute";
    }
  };

  return {
    chartType,
    setChartType,
    timeframe,
    setTimeframe: handleTimeframeChange,
    settings,
    setSettings,
    getIntervalParam,
  };
};
