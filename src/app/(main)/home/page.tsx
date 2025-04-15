"use client";

import MarketIndices from "./_components/market-indices";
import MarketMovers from "./_components/market-movers";
import MostTradedStocks from "./_components/most-traded-stocks";
import PortfolioSummary from "./_components/portfolio-summary";
import StocksInNews from "./_components/stock-in-news";
import ToolsAndProducts from "./_components/tools-and-products";
import Watchlist from "./_components/watchlist-section";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen ">
      <main className="max-w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 space-y-6">
            <MarketIndices />
            <MostTradedStocks />
            <ToolsAndProducts />
            <MarketMovers />
            <StocksInNews />
          </div>
          <div className="w-full lg:w-1/3 space-y-6">
            <PortfolioSummary />
            <Watchlist />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
