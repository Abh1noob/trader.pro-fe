"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getTradesList } from "./services";
import { getHistoricalData } from "../chart/[stock]/services";
import { tradeColumns } from "./_components/data-table/columns";
import { Button } from "@/components/button";
import {
  RiRefreshLine,
  RiArrowUpSLine,
  RiBarChart2Line,
  RiArrowDownSLine,
} from "@remixicon/react";
import { DataTable } from "./_components/data-table/DataTable";
import { KpiCard } from "./_components/KpiCard";
import { Trade } from "./types";

type PnL = {
  realized: number;
  unrealized: number;
};

type SymbolPnL = {
  symbol: string;
  realized: number;
  unrealized: number;
  currentPrice: number | null;
  trades: Trade[];
};

function calculateSymbolPnL(trades: Trade[], currentPrice: number | null): PnL {
  const sortedTrades = [...trades].sort(
    (a, b) =>
      new Date(a.executed_at).getTime() - new Date(b.executed_at).getTime()
  );
  const buyLots: { quantity: number; price: number }[] = [];
  let realized = 0;

  sortedTrades.forEach((t) => {
    if (t.trade_type === "buy") {
      buyLots.push({ quantity: t.quantity, price: t.price });
    } else if (t.trade_type === "sell") {
      let qtyToSell = t.quantity;
      while (qtyToSell > 0 && buyLots.length > 0) {
        const lot = buyLots[0];
        const matchedQty = Math.min(lot.quantity, qtyToSell);
        realized += (t.price - lot.price) * matchedQty;
        lot.quantity -= matchedQty;
        qtyToSell -= matchedQty;
        if (lot.quantity === 0) buyLots.shift();
      }
    }
  });

  const unrealized = buyLots.reduce(
    (sum, lot) =>
      currentPrice !== null
        ? sum + (currentPrice - lot.price) * lot.quantity
        : sum,
    0
  );

  return { realized, unrealized };
}

export default function TradesPage() {
  const {
    data: tradesData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<Trade[]>({
    queryKey: ["trades"],
    queryFn: getTradesList,
  });

  const trades = tradesData ?? [];

  const tradesBySymbol: Record<string, Trade[]> = {};
  trades.forEach((trade) => {
    if (!tradesBySymbol[trade.symbol]) tradesBySymbol[trade.symbol] = [];
    tradesBySymbol[trade.symbol].push(trade);
  });

  const symbols = Object.keys(tradesBySymbol);

  const [prices, setPrices] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let isMounted = true;

    async function fetchPrices() {
      const priceMap: Record<string, number | null> = {};
      const dateStr = localStorage.getItem("simulationDate");

      if (!dateStr) {
        if (isMounted) setPrices({});
        return;
      }

      const fromDate = new Date(dateStr);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = new Date(fromDate);
      toDate.setDate(fromDate.getDate() + 1);

      const fromDateISO = fromDate.toISOString();
      const toDateISO = toDate.toISOString();

      const BATCH_SIZE = 5;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

      for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
        const batch = symbols.slice(i, i + BATCH_SIZE);

        await Promise.all(
          batch.map(async (symbol) => {
            const cacheKey = `price:${symbol}:${dateStr}`;
            const cachedPrice = localStorage.getItem(cacheKey);

            if (cachedPrice !== null) {
              priceMap[symbol] = parseFloat(cachedPrice);
              return;
            }

            const symbolTrades = tradesBySymbol[symbol] || [];
            const mostRecentTrade = symbolTrades.reduce(
              (latest, t) =>
                !latest ||
                new Date(t.executed_at) > new Date(latest.executed_at)
                  ? t
                  : latest,
              undefined as Trade | undefined
            );

            const settings = {
              interval: "1day",
              from_date: fromDateISO,
              to_date: toDateISO,
              stock_code: symbol,
              exchange_code: "NSE",
              product_type: "cash",
              expiry_date: "",
              right: "call",
              strike_price: "",
            };

            try {
              const data = await getHistoricalData(settings);
              const price = data?.[0]?.close ?? null;
              priceMap[symbol] = price;
              if (price !== null) {
                localStorage.setItem(cacheKey, price.toString());
              }
            } catch {
              priceMap[symbol] = null;
            }
          })
        );

        // Add delay between batches to avoid spamming the server
        await delay(5000);
      }

      if (isMounted) setPrices(priceMap);
    }

    if (symbols.length > 0) {
      fetchPrices();
    }

    return () => {
      isMounted = false;
    };
  }, [tradesBySymbol]);

  const symbolPnls: SymbolPnL[] = symbols.map((symbol) => {
    const trades = tradesBySymbol[symbol];
    const currentPrice = prices[symbol] ?? null;
    const { realized, unrealized } = calculateSymbolPnL(trades, currentPrice);
    return { symbol, realized, unrealized, currentPrice, trades };
  });

  const totalTrades = trades.length;
  const totalRealized = symbolPnls.reduce((sum, s) => sum + s.realized, 0);
  const totalUnrealized = symbolPnls.reduce((sum, s) => sum + s.unrealized, 0);
  const avgProfit =
    totalTrades > 0 ? (totalRealized / totalTrades).toFixed(2) : "0.00";

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

      {/* KPI Cards (Totals) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Total Trades"
          value={totalTrades}
          icon={<RiBarChart2Line className="h-5 w-5 text-indigo-500" />}
        />
        <KpiCard
          title="Total Realized Profit"
          value={
            totalRealized >= 0
              ? `₹${totalRealized.toFixed(2)}`
              : `-₹${Math.abs(totalRealized).toFixed(2)}`
          }
          icon={
            totalRealized >= 0 ? (
              <RiArrowUpSLine className="h-5 w-5 text-green-500" />
            ) : (
              <RiArrowDownSLine className="h-5 w-5 text-red-500" />
            )
          }
          color={totalRealized >= 0 ? "green" : "red"}
        />
        <KpiCard
          title="Total Unrealized Profit"
          value={
            totalUnrealized >= 0
              ? `₹${totalUnrealized.toFixed(2)}`
              : `-₹${Math.abs(totalUnrealized).toFixed(2)}`
          }
          icon={
            totalUnrealized >= 0 ? (
              <RiArrowUpSLine className="h-5 w-5 text-green-500" />
            ) : (
              <RiArrowDownSLine className="h-5 w-5 text-red-500" />
            )
          }
          color={totalUnrealized >= 0 ? "green" : "red"}
        />
        <KpiCard
          title="Avg. Realized Profit/Trade"
          value={`₹${avgProfit}`}
          icon={<RiBarChart2Line className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Per-symbol PnL Table */}
      <div className="mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Realized P/L</th>
                <th className="px-4 py-2">Unrealized P/L</th>
                <th className="px-4 py-2">Current Price</th>
              </tr>
            </thead>
            <tbody>
              {symbolPnls.map((s) => (
                <tr key={s.symbol}>
                  <td className="px-4 py-2 font-bold">{s.symbol}</td>
                  <td
                    className={`px-4 py-2 ${
                      s.realized >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {s.realized >= 0
                      ? `₹${s.realized.toFixed(2)}`
                      : `-₹${Math.abs(s.realized).toFixed(2)}`}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      s.unrealized >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {s.unrealized >= 0
                      ? `₹${s.unrealized.toFixed(2)}`
                      : `-₹${Math.abs(s.unrealized).toFixed(2)}`}
                  </td>
                  <td className="px-4 py-2">
                    {s.currentPrice !== null ? `₹${s.currentPrice}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
