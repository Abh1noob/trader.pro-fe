import React from "react";

interface NewsItemProps {
  company: string;
  title: string;
  time: string;
  change: string;
  isPositive: boolean;
}

const NewsItem: React.FC<NewsItemProps> = ({
  company,
  title,
  time,
  change,
  isPositive,
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-3">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">{company}</span>
        <span
          className={`text-xs ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}
        </span>
      </div>
      <p className="text-sm mb-2">{title}</p>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
};

const StocksInNews: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Stocks in News</h2>
        <div className="flex items-center">
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mr-2">
            News
          </span>
          <a href="#" className="text-sm text-blue-500">
            See more
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NewsItem
          company="JSW Steel"
          title="JSW Steel reports 6% YoY growth in crude steel production for Q4"
          time="2 hours ago"
          change="0.8% (8.55)"
          isPositive={true}
        />
        <NewsItem
          company="Reliance Enterprises"
          title="Reliance announces strategic partnership with global tech giant"
          time="4 hours ago"
          change="1.2% (12.30)"
          isPositive={true}
        />
        <NewsItem
          company="Bharti Airtel"
          title="Bharti Airtel completes acquisition of 5G spectrum in all circles"
          time="6 hours ago"
          change="0.6% (5.15)"
          isPositive={true}
        />
        <NewsItem
          company="Adani Power"
          title="Adani Power signs MoU for 1,600 MW power plant"
          time="8 hours ago"
          change="4.3% (21.65)"
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default StocksInNews;
