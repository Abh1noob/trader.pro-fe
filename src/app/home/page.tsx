"use client";
import React from "react";

import MarketIndices from "./_components/market-indices";
import MarketMovers from "./_components/market-movers";
import MostTradedStocks from "./_components/most-traded-stocks";
import PortfolioSummary from "./_components/portfolio-summary";
import StocksInNews from "./_components/stock-in-news";
import ToolsAndProducts from "./_components/tools-and-products";
import Watchlist from "./_components/watchlist-section";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SearchIcon, User } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Trader.pro
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                <a
                  href="#"
                  className="border-b-2 border-blue-500 text-gray-900 dark:text-white px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-1 pt-1 text-sm font-medium"
                >
                  Orders
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-1 pt-1 text-sm font-medium"
                >
                  Holdings
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-1 pt-1 text-sm font-medium"
                >
                  Positions
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Input
                    type="text"
                    className=" pl-10 pr-3 py-2  leading-5 bg-white sm:text-sm w-96"
                    placeholder="Search stocks, mutual funds..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <div className="">
                  <Button className="rounded-full aspect-square h-min w-min">
                    <User />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <MarketIndices />
            <MostTradedStocks />
            <ToolsAndProducts />
            <MarketMovers />
            <StocksInNews />
          </div>
          <div className="w-full md:w-1/3">
            <PortfolioSummary />
            <Watchlist />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
