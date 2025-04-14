export type Trade = {
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
};
