import { breeze } from "@/app/api";
import { Setting, Timeframe } from "./types";

export const getIntervalParam = (timeframe: Timeframe): string => {
  switch (timeframe) {
    case "1m":
      return "1minute";
    case "15m":
      return "15minute";
    case "30m":
      return "30minute";
    case "1h":
      return "1hour";
    case "1d":
      return "1day";
    default:
      return "1minute";
  }
};

export async function getStockOrOptionData(
  settings: Setting,
  timeframe: Timeframe
) {
  const interval = getIntervalParam(timeframe);
  let url = "";

  if (settings.dataType === "option") {
    url = `/optiondata?from_date=${settings.fromDate}&to_date=${settings.toDate}&expiry_date=${settings.expiryDate}&interval=${interval}&strike_price=${settings.strikePrice}&stock_code=${settings.stockCode}&right=${settings.right}`;
  } else {
    url = `/stockdata?from_date=${settings.fromDate}&to_date=${settings.toDate}&interval=${interval}&stock_code=${settings.stockCode}`;
  }

  const res = await breeze.get(url);
  return res.data;
}
