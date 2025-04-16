import { breeze } from "@/app/api";

interface HistoricalDataParams {
  interval: string;
  from_date: string;
  to_date: string;
  stock_code: string;
  exchange_code: string;
  product_type: string;
  expiry_date?: string;
  right?: string;
  strike_price?: string;
}

export const getHistoricalData = async (params: HistoricalDataParams) => {
  // Validate required fields for derivatives
  if (!["cash", "btst", "margin"].includes(params.product_type)) {
    const requiredFields = [
      params.expiry_date,
      params.right,
      params.strike_price,
    ].filter(Boolean);
    if (requiredFields.length < 2) {
      throw new Error(
        "For product_type other than cash, btst, margin, at least two of expiry_date, right, and strike_price are required."
      );
    }
  }

  try {
    const queryParams = new URLSearchParams({
      interval: params.interval,
      from_date: params.from_date,
      to_date: params.to_date,
      stock_code: params.stock_code,
      exchange_code: params.exchange_code,
      product_type: params.product_type,
      ...(params.expiry_date && { expiry_date: params.expiry_date }),
      ...(params.right && { right: params.right }),
      ...(params.strike_price && { strike_price: params.strike_price }),
    } as Record<string, string>).toString();

    const response = await breeze.get(`/historicaldata?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
