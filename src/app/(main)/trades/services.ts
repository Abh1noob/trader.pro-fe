import { api } from "@/app/api";
import { Trade } from "./types";

export async function getTradesList() {
  const res = await api.get<Trade[]>("/simulation/trades");
  return res.data;
}
