import React from "react";

const PortfolioSummary: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Your Investments</h2>
        <a href="#" className="text-sm text-blue-500">
          Dashboard
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-md font-medium mr-4">Equity</h3>
          </div>

          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold mr-2">₹1.2k</span>
            <span className="text-sm text-gray-500">Margin available</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div>
              <div>Margins used</div>
              <div className="font-medium">0</div>
            </div>
            <div>
              <div>Opening balance</div>
              <div className="font-medium">1.2k</div>
            </div>
          </div>

          <button className="text-blue-500 text-sm">View statement</button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-md font-medium mr-4">Commodity</h3>
          </div>

          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold mr-2">0</span>
            <span className="text-sm text-gray-500">Margin available</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div>
              <div>Margins used</div>
              <div className="font-medium">0</div>
            </div>
            <div>
              <div>Opening balance</div>
              <div className="font-medium">0</div>
            </div>
          </div>

          <button className="text-blue-500 text-sm">View statement</button>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <h3 className="text-md font-medium">Holdings (8)</h3>
        </div>

        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-green-500 mr-2">6.39k</span>
          <span className="text-sm text-green-500">+6.83%</span>
          <span className="text-sm text-gray-500 ml-2">P&L</span>
        </div>

        <div className="w-full bg-gray-200 h-4 rounded-full mb-4">
          <div className="flex h-full rounded-full overflow-hidden">
            <div className="bg-blue-500 w-3/5"></div>
            <div className="bg-blue-300 w-1/5"></div>
            <div className="bg-purple-500 w-1/10"></div>
            <div className="bg-teal-500 w-1/20"></div>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold">₹99,938.05</div>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="value-type" className="mr-2" checked />
              <span className="text-sm">Current value</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="value-type" className="mr-2" />
              <span className="text-sm">Investment value</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="value-type" className="mr-2" />
              <span className="text-sm">P&L</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <div>Current value</div>
            <div className="font-medium">99.94k</div>
          </div>
          <div>
            <div>Investment</div>
            <div className="font-medium">93.55k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
