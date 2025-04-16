"use client";

import { SearchIcon, TrendingUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchResponse } from "./types";
import { searchCompanies } from "./service";
import Link from "next/link";

const popularCompanies = [
  {
    _id: "67fd7fda7ea9b6f776190aa3",
    short_name: "TATMOT",
    company_name: "TATA MOTORS LIMITED",
    exchange_code: "TATAMOTORS",
  },
  {
    _id: "67fd7fda7ea9b6f776190ab3",
    short_name: "TATSTE",
    company_name: "TATA STEEL LIMITED",
    exchange_code: "TATASTEEL",
  },
  {
    _id: "67fd7fda7ea9b6f77619029d",
    short_name: "SARENE",
    company_name: "SARDA ENERGY & MINERALS LTD",
    exchange_code: "SARDAEN",
  },
  {
    _id: "67fd7fda7ea9b6f7761908a6",
    short_name: "ATUL",
    company_name: "ATUL LIMITED",
    exchange_code: "ATUL",
  },
  {
    _id: "5",
    company_name: "Dixon Technologies (India) Ltd.",
    exchange_code: "DIXON",
  },
  {
    _id: "67fd7fda7ea9b6f77619058c",
    short_name: "DIXTEC",
    company_name: "DIXON TECHNOLOGIES INDIA LTD",
    exchange_code: "DIXON",
  },
];

interface SearchComponentProps {
  className?: string;
  containerClassName?: string;
  isMobile?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  className = "",
  containerClassName = "",
  isMobile = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsInputActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce search query
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce delay

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  const { data: searchData, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchCompanies(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  return (
    <div ref={searchRef} className={`relative ${containerClassName}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
        <input
          className={`pl-10 pr-10 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none   bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${className}`}
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsInputActive(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {isInputActive && (
        <div
          className={`absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 ${
            isMobile ? "max-h-64" : "max-h-96"
          } overflow-y-auto`}
        >
          {!debouncedQuery && (
            <>
              <h2 className="text-base text-gray-600 dark:text-gray-300 font-medium p-3 border-b border-gray-200 dark:border-gray-700">
                Popular on Trader.pro
              </h2>
              <div className="space-y-1">
                {popularCompanies.map((company, index) => (
                  <Link
                    key={index}
                    href={`/chart/${company.short_name}`}
                    className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-3" />
                    <div className="flex flex-col">
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {company.company_name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {company.exchange_code}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {searchData && searchData.results.length > 0 && (
            <div className="space-y-1">
              {searchData.results.map((result, index) => (
                <Link
                  key={index}
                  href={`/chart/${result.short_name}`}
                  className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2"
                >
                  <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-3" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      {result.company_name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {result.exchange_code}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {debouncedQuery && searchData && searchData.results.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
