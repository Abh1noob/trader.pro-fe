export type ChartType = "candlestick" | "line" | "area";
export type Timeframe = "1m" | "15m" | "30m" | "1h" | "1d";
export type OptionRight = "put" | "call";

export type OptionData = {
  close: string;
  count: number;
  datetime: string;
  exchange_code: string;
  expiry_date: string;
  high: string;
  low: string;
  open: string;
  open_interest: string;
  product_type: string;
  right: string;
  stock_code: string;
  strike_price: string;
  volume: string;
};

export type Setting = {
  fromDate: string;
  toDate: string;
  expiryDate: string;
  strikePrice: string;
  stockCode: string;
  right: OptionRight;
  dataType: string;
};
