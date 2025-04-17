"use client";

import { useQuery } from "@tanstack/react-query";
import { getTradesList } from "./services";
import { Trade } from "./types";
import { tradeColumns } from "./_components/data-table/columns";
import { Button } from "@/components/button";
import {
  RiRefreshLine,
  RiArrowUpSLine,
  RiBarChart2Line,
  RiPercentLine,
} from "@remixicon/react";
import { DataTable } from "./_components/data-table/DataTable";
import { KpiCard } from "./_components/KPICard";

export default function TradesPage() {
  const { data, isLoading, error, refetch, isFetching } = useQuery<Trade[]>({
    queryKey: ["trades"],
    queryFn: getTradesList,
  });

  const trades = data ?? [];
  const totalTrades = trades.length;
  const totalProfit = trades.reduce((sum, t) => {
    if (t.trade_type === "buy") {
      return sum + (t.limit_price - t.price) * t.quantity;
    } else if (t.trade_type === "sell") {
      return sum + (t.price - t.limit_price) * t.quantity;
    }
    return sum;
  }, 0);

  const completedTrades = trades.filter((t) => t.status === "COMPLETED");
  const profitableTrades = completedTrades.filter(
    (t) =>
      (t.trade_type === "buy" && t.price > t.limit_price) ||
      (t.trade_type === "sell" && t.price < t.limit_price)
  );
  const winRate =
    completedTrades.length > 0
      ? ((profitableTrades.length / completedTrades.length) * 100).toFixed(1)
      : "0.0";
  const avgProfit =
    completedTrades.length > 0
      ? (
          completedTrades.reduce(
            (sum, t) =>
              sum +
              (t.trade_type === "buy"
                ? (t.price - t.limit_price) * t.quantity
                : (t.limit_price - t.price) * t.quantity),
            0
          ) / completedTrades.length
        ).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-[calc(100vh-5rem)] px-2 sm:px-6 py-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Trade History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Your recent simulated trades are listed below.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
        >
          <RiRefreshLine
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Total Trades"
          value={totalTrades}
          icon={<RiBarChart2Line className="h-5 w-5 text-indigo-500" />}
        />
        <KpiCard
          title="Total Profit"
          value={`₹${totalProfit.toFixed(2)}`}
          icon={<RiArrowUpSLine className="h-5 w-5 text-green-500" />}
          color={totalProfit >= 0 ? "green" : "red"}
        />
        <KpiCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={<RiPercentLine className="h-5 w-5 text-yellow-500" />}
        />
        <KpiCard
          title="Avg. Profit/Trade"
          value={`₹${avgProfit}`}
          icon={<RiBarChart2Line className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-x-auto p-4 ">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">
            {error instanceof Error ? error.message : "Failed to load trades."}
          </div>
        ) : trades.length > 0 ? (
          <DataTable data={trades} columns={tradeColumns(refetch)} />
        ) : (
          <div className="text-center text-gray-500 py-12">
            No trades found. Start trading to see your history!
          </div>
        )}
      </div>
    </div>
  );
}
