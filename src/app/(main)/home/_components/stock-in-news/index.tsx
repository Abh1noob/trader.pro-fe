import React, { useState } from "react";
import { getNews, NewsCategory } from "./service";
import { useQuery } from "@tanstack/react-query";
import { NewsItemProps } from "./types";
import { ExternalLink } from "lucide-react";

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  onlineAnnouncements: "Online Announcements",
  annualReports: "Annual Reports",
  corporateActions: "Corporate Actions",
};

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  link,
  category,
}) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-3 shadow-sm dark:shadow-gray-700 hover:shadow-md transition-shadow duration-200">
    {category && (
      <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
        {category}
      </span>
    )}
    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </p>
    <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
      {description}
    </p>
    <div className="flex justify-between items-center">
      {link && (
        <div className="ml-auto">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:underline"
          >
            View announcement
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  </div>
);

const StocksInNews: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const [activeTab, setActiveTab] = useState<NewsCategory>(
    "onlineAnnouncements"
  );

  // Handle empty data for the selected category
  const hasNoData =
    !isLoading &&
    !error &&
    (!data || !data[activeTab] || data[activeTab].length === 0);

  return (
    <div className="mb-8 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Stocks in News</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
            NSE News
          </span>
          <a
            href="https://www.nseindia.com/companies-listing/corporate-filings-announcements"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            See more
          </a>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`px-3 py-2 mr-2 text-sm rounded-md whitespace-nowrap transition-colors ${
              activeTab === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(key as NewsCategory)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Loading latest announcements...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-6 px-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
          <p className="text-red-500 dark:text-red-400 mb-2">
            Failed to load announcements
          </p>
          <p className="text-sm text-red-400 dark:text-red-300">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {hasNoData && (
        <div className="text-center py-6 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No announcements available
          </p>
        </div>
      )}

      {/* News Grid */}
      {!isLoading && !error && data && data[activeTab]?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data[activeTab].map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              description={item.description}
              link={item.link}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StocksInNews;
