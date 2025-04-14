// "use client";
// import React, { useEffect, useRef, useState, memo } from "react";
// import {
//   createChart,
//   IChartApi,
//   ISeriesApi,
//   LineData,
//   AreaData,
// } from "lightweight-charts";
// import { generateData, Timeframe } from "@/lib/charts";
// import { LineChart, BarChart3, TrendingUp } from "lucide-react";

// type ChartType = "candlestick" | "line" | "area";

// const TradingViewWidget: React.FC = () => {
//   const chartContainerRef = useRef<HTMLDivElement | null>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(
//     null
//   );
//   const [chartType, setChartType] = useState<ChartType>("candlestick");
//   const [timeframe, setTimeframe] = useState<Timeframe>("1d");

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: chartContainerRef.current.clientHeight,
//       layout: {
//         background: { color: "#2E282A" }, // Raisin black
//         textColor: "#DDEDAA", // Tea green
//       },
//       grid: {
//         vertLines: { color: "#2E282A" }, // Darker shade for grid
//         horzLines: { color: "#2E282A" }, // Darker shade for grid
//       },
//       crosshair: {
//         mode: 0,
//         vertLine: {
//           color: "#17BEBB", // Verdigris
//           width: 1,
//           style: 1,
//           labelBackgroundColor: "#17BEBB", // Verdigris
//         },
//         horzLine: {
//           color: "#17BEBB", // Verdigris
//           width: 1,
//           style: 1,
//           labelBackgroundColor: "#17BEBB", // Verdigris
//         },
//       },
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: timeframe === "1m",
//         borderColor: "#17BEBB", // Verdigris
//       },
//       rightPriceScale: {
//         borderColor: "#17BEBB", // Verdigris
//       },
//       handleScroll: {
//         mouseWheel: true,
//         pressedMouseMove: true,
//         horzTouchDrag: true,
//         vertTouchDrag: true,
//       },
//       handleScale: {
//         axisPressedMouseMove: true,
//         mouseWheel: true,
//         pinch: true,
//       },
//     });

//     chartRef.current = chart;

//     const handleResize = () => {
//       if (chartRef.current && chartContainerRef.current) {
//         chartRef.current.applyOptions({
//           width: chartContainerRef.current.clientWidth,
//           height: chartContainerRef.current.clientHeight,
//         });
//       }
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (chartRef.current) {
//         chartRef.current.remove();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     if (seriesRef.current) {
//       chartRef.current.removeSeries(seriesRef.current);
//       seriesRef.current = null;
//     }

//     const customData = generateData(timeframe);

//     chartRef.current.applyOptions({
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: timeframe === "1m",
//       },
//     });

//     switch (chartType) {
//       case "candlestick": {
//         const candlestickSeries = chartRef.current.addCandlestickSeries({
//           upColor: "#DDEDAA", // Tea green for up
//           downColor: "#FE5F55", // Bittersweet for down
//           borderVisible: false,
//           wickUpColor: "#DDEDAA", // Tea green for up wick
//           wickDownColor: "#FE5F55", // Bittersweet for down wick
//         });
//         candlestickSeries.setData(customData);
//         seriesRef.current = candlestickSeries;
//         break;
//       }
//       case "line": {
//         const lineSeries = chartRef.current.addLineSeries({
//           color: "#17BEBB", // Verdigris
//           lineWidth: 2,
//           crosshairMarkerVisible: true,
//           crosshairMarkerRadius: 6,
//         });
//         const lineData: LineData[] = customData.map((d) => ({
//           time: d.time,
//           value: d.close,
//         }));
//         lineSeries.setData(lineData);
//         seriesRef.current = lineSeries;
//         break;
//       }
//       case "area": {
//         const areaSeries = chartRef.current.addAreaSeries({
//           topColor: "rgba(23, 190, 187, 0.56)", // Verdigris with opacity
//           bottomColor: "rgba(23, 190, 187, 0.04)", // Verdigris with low opacity
//           lineColor: "#17BEBB", // Verdigris
//           lineWidth: 2,
//           crosshairMarkerVisible: true,
//           crosshairMarkerRadius: 6,
//         });
//         const areaData: AreaData[] = customData.map((d) => ({
//           time: d.time,
//           value: d.close,
//         }));
//         areaSeries.setData(areaData);
//         seriesRef.current = areaSeries;
//         break;
//       }
//     }

//     chartRef.current.timeScale().fitContent();
//   }, [chartType, timeframe]);

//   const ChartTypeButton = ({
//     type,
//     icon,
//     label,
//   }: {
//     type: ChartType;
//     icon: React.ReactNode;
//     label: string;
//   }) => (
//     <button
//       className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
//         chartType === type
//           ? "bg-[#17BEBB] text-[#2E282A] shadow-md" // Active: Verdigris background with Raisin black text
//           : "bg-[#2E282A] text-[#DDEDAA] hover:bg-[#FE5F55] hover:text-[#2E282A]" // Inactive: Raisin black with Tea green text, hover: Bittersweet
//       }`}
//       onClick={() => setChartType(type)}
//     >
//       {icon}
//       <span className="hidden sm:inline">{label}</span>
//     </button>
//   );

//   const TimeframeButton = ({
//     value,
//     label,
//   }: {
//     value: Timeframe;
//     label: string;
//   }) => (
//     <button
//       className={`px-3 py-1 rounded-md transition-all ${
//         timeframe === value
//           ? "bg-[#17BEBB] text-[#2E282A] font-medium" // Active: Verdigris background with Raisin black text
//           : "bg-[#2E282A] text-[#DDEDAA] hover:bg-[#FE5F55] hover:text-[#2E282A]" // Inactive: Raisin black with Tea green text, hover: Bittersweet
//       }`}
//       onClick={() => setTimeframe(value)}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="flex flex-col h-screen bg-[#2E282A] text-[#DDEDAA]">
//       {" "}
//       {/* Raisin black background with Tea green text */}
//       {/* Header */}
//       <div className="flex justify-between items-center p-3 border-b border-[#17BEBB] bg-[#2E282A]">
//         {" "}
//         {/* Raisin black background with Verdigris border */}
//         <div className="flex items-center">
//           <TrendingUp className="h-5 w-5 text-[#FE5F55] mr-2" />{" "}
//           {/* Bittersweet icon */}
//           <h1 className="text-lg font-semibold">Stock Name</h1>
//         </div>
//         <div className="flex justify-center gap-2 p-2 bg-[#2E282A]">
//           {" "}
//           {/* Raisin black background */}
//           <TimeframeButton value="1m" label="1m" />
//           <TimeframeButton value="15m" label="15m" />
//           <TimeframeButton value="30m" label="30m" />
//           <TimeframeButton value="1h" label="1h" />
//           <TimeframeButton value="1d" label="1d" />
//         </div>
//         {/* Chart Type Selection */}
//         <div className="chart-type-controls flex gap-1">
//           <ChartTypeButton
//             type="candlestick"
//             icon={<BarChart3 className="h-4 w-4" />}
//             label="Candlestick"
//           />
//           <ChartTypeButton
//             type="line"
//             icon={<LineChart className="h-4 w-4" />}
//             label="Line"
//           />
//           <ChartTypeButton
//             type="area"
//             icon={<TrendingUp className="h-4 w-4" />}
//             label="Area"
//           />
//         </div>
//       </div>
//       {/* Chart Container */}
//       <div className="chart-container flex-grow relative">
//         <div
//           className="tradingview-widget-container h-full w-full"
//           ref={chartContainerRef}
//         />
//       </div>
//       {/* Footer */}
//       <div className="tradingview-widget-copyright py-2 px-3 text-center bg-[#2E282A] border-t border-[#17BEBB] text-xs text-[#DDEDAA]">
//         <a
//           href="https://www.tradingview.com/"
//           rel="noopener nofollow"
//           target="_blank"
//           className="text-[#FE5F55] hover:text-[#17BEBB]" // Bittersweet link with Verdigris hover
//         >
//           Powered by TradingView
//         </a>
//       </div>
//     </div>
//   );
// };

// export default memo(TradingViewWidget);

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
