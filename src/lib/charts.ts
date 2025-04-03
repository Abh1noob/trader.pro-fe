import { CandlestickData, UTCTimestamp } from "lightweight-charts";

export type Timeframe = "1m" | "15m" | "30m" | "1h" | "1d";

export const generateData = (timeframe: Timeframe): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 2500;
  const startDate = new Date("2025-04-01T00:00:00Z").getTime(); // Start in milliseconds
  const intervals = {
    "1m": 60 * 1000, // 1 minute in milliseconds
    "15m": 15 * 60 * 1000,
    "30m": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
  };
  const interval = intervals[timeframe];
  const numPoints =
    timeframe === "1m"
      ? 1440
      : timeframe === "15m"
      ? 96
      : timeframe === "30m"
      ? 48
      : timeframe === "1h"
      ? 24
      : 30;

  for (let i = 0; i < numPoints; i++) {
    const timestampMs = startDate + i * interval;
    const time =
      timeframe === "1d"
        ? new Date(timestampMs).toISOString().split("T")[0] // yyyy-mm-dd for daily
        : (Math.floor(timestampMs / 1000) as UTCTimestamp); // Seconds for intraday

    const open = basePrice;
    const high = open + Math.random() * 50;
    const low = open - Math.random() * 50;
    const close = low + Math.random() * (high - low);
    basePrice = close;

    data.push({ time, open, high, low, close });
  }
  return data;
};
