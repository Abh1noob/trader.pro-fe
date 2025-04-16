import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ArrowUpCircle, ArrowDownCircle, Hash, Loader2 } from "lucide-react";
import { api } from "@/app/api";

interface TradeFormProps {
  stockCode: string;
  close: string;
  onSuccess?: () => void;
}

type TradeType = "buy" | "sell";

const TradeForm: React.FC<TradeFormProps> = ({
  stockCode,
  close,
  onSuccess,
}) => {
  const [tradeType, setTradeType] = useState<TradeType>("buy");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [closeData, setCloseData] = useState<string>("");

  useEffect(() => {
    setCloseData(close);
  }, [close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log("Price:", price);

    try {
      await api.post("/simulation/trade", {
        symbol: stockCode,
        trade_type: tradeType,
        quantity: Number(quantity),
        price: Number(closeData),
      });
      setLoading(false);
      setSuccess(true);
      setQuantity(1);
      setPrice("");
      setTimeout(() => setSuccess(false), 3000);
      if (onSuccess) onSuccess();
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
      setError(err.message || "Failed to place trade");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6">
      <h2 className="text-xl font-bold text-center mb-4 text-white">
        Place {tradeType === "buy" ? "Buy" : "Sell"} Order
        <div className="text-sm font-normal text-gray-400 mt-1">
          {stockCode}
        </div>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-all ${
              tradeType === "buy"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
            onClick={() => setTradeType("buy")}
          >
            <ArrowUpCircle className="h-5 w-5" />
            <span className="font-medium">Buy</span>
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-all ${
              tradeType === "sell"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
            onClick={() => setTradeType("sell")}
          >
            <ArrowDownCircle className="h-5 w-5" />
            <span className="font-medium">Sell</span>
          </button>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Quantity
          </label>
          <div className="relative">
            <Hash className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {price && quantity ? (
          <div className="bg-gray-800 p-3 rounded-md mt-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Total:</span>
              <span className="font-medium text-white">
                ${(Number(price) * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/30 border border-green-700 text-green-400 p-3 rounded-md text-sm">
            Trade placed successfully!
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-md font-medium mt-2 flex items-center justify-center gap-2 ${
            tradeType === "buy"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              {tradeType === "buy" ? "Buy" : "Sell"} {quantity}{" "}
              {quantity > 1 ? "Shares" : "Share"}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
