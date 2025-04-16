import {
  IChartApi,
  ISeriesApi,
  CandlestickData,
  LineData,
  AreaData,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { OptionData, ChartType } from "../types";
import { ChartSettings } from "./ChartFooter";

export const convertToChartData = (
  data: OptionData[],
  settings: ChartSettings
): CandlestickData[] => {
  let chartData = data.map((item) => {
    const dateObj = new Date(item.datetime);
    let time: Time;
    if (settings.interval === "1day") {
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

  chartData.sort((a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });

  chartData = chartData.filter(
    (item, idx, arr) => idx === 0 || item.time !== arr[idx - 1].time
  );

  return chartData;
};

export const applyChartOptions = (
  chart: IChartApi,
  settings: ChartSettings
) => {
  chart.applyOptions({
    timeScale: {
      timeVisible: true,
      secondsVisible: settings.interval === "1minute",
    },
  });
};

export const updateChartSeries = (
  chart: IChartApi,
  chartType: ChartType,
  chartData: CandlestickData[]
): ISeriesApi<"Candlestick" | "Line" | "Area"> => {
  switch (chartType) {
    case "candlestick": {
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#10b981",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#10b981",
        wickDownColor: "#ef4444",
      });
      candlestickSeries.setData(chartData);
      return candlestickSeries;
    }
    case "line": {
      const lineSeries = chart.addLineSeries({
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
      return lineSeries;
    }
    case "area": {
      const areaSeries = chart.addAreaSeries({
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
      return areaSeries;
    }
    default:
      throw new Error(`Unsupported chart type: ${chartType}`);
  }
};
