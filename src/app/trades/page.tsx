"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Trade {
  id: string;
  user_id: string;
  symbol: string;
  trade_type: string;
  quantity: number;
  price: number;
  total_amount: number;
  limit_price: number;
  stop_loss: number;
  timestamp: string;
  executed_at: string;
  status: string;
}

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get<Trade[]>(
          "http://localhost:8080/api/simulation/trades"
        );
        setTrades(response.data);
      } catch (err) {
        console.error("Error fetching trades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Market Positions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Limit Price</th>
              <th className="px-4 py-2 text-left">Stop Loss</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-300">
                <td className="px-4 py-2">{trade.symbol}</td>
                <td className="px-4 py-2">{trade.trade_type || "N/A"}</td>
                <td className="px-4 py-2">{trade.quantity}</td>
                <td className="px-4 py-2">${trade.price.toFixed(2)}</td>
                <td className="px-4 py-2">${trade.total_amount.toFixed(2)}</td>
                <td className="px-4 py-2">${trade.limit_price.toFixed(2)}</td>
                <td className="px-4 py-2">${trade.stop_loss.toFixed(2)}</td>
                <td className="px-4 py-2">{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
