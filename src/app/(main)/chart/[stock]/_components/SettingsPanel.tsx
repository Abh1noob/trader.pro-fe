import React from "react";
import { X } from "lucide-react";
import { ChartSettings } from "./ChartFooter";
import { Button } from "@/components/button";

interface SettingsPanelProps {
  settings: ChartSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChartSettings>>;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  setSettings,
  setShowSettings,
  refetch,
}) => {
  const formatDateForInput = (dateString: string) => {
    return dateString ? new Date(dateString).toISOString().slice(0, 16) : "";
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-gray-800 text-gray-100 p-4 shadow-lg z-20 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <Button
          onClick={() => setShowSettings(false)}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Type</label>
          <div className="flex flex-wrap gap-2">
            {["cash", "margin"].map((type) => (
              <Button
                key={type}
                className={`px-3 py-1 rounded-md ${
                  settings.product_type === type ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => setSettings({ ...settings, product_type: type })}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="exchange_code"
            className="block text-sm font-medium mb-1"
          >
            Exchange
          </label>
          <select
            id="exchange_code"
            value={settings.exchange_code}
            onChange={(e) =>
              setSettings({ ...settings, exchange_code: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="NSE">NSE</option>
            <option value="NFO">NFO</option>
          </select>
        </div>

        {(settings.product_type === "options" ||
          settings.product_type === "optionplus") && (
          <>
            <div>
              <label
                htmlFor="strike_price"
                className="block text-sm font-medium mb-1"
              >
                Strike Price
              </label>
              <input
                id="strike_price"
                type="text"
                value={settings.strike_price}
                onChange={(e) =>
                  setSettings({ ...settings, strike_price: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Option Type
              </label>
              <div className="flex gap-2">
                <Button
                  className={`px-3 py-1 rounded-md ${
                    settings.right === "call" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSettings({ ...settings, right: "call" })}
                >
                  Call
                </Button>
                <Button
                  className={`px-3 py-1 rounded-md ${
                    settings.right === "put" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSettings({ ...settings, right: "put" })}
                >
                  Put
                </Button>
                <Button
                  className={`px-3 py-1 rounded-md ${
                    settings.right === "others" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSettings({ ...settings, right: "others" })}
                >
                  Others
                </Button>
              </div>
            </div>

            <div>
              <label
                htmlFor="expiry_date"
                className="block text-sm font-medium mb-1"
              >
                Expiry Date
              </label>
              <input
                id="expiry_date"
                type="datetime-local"
                value={formatDateForInput(settings.expiry_date)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    expiry_date: new Date(e.target.value).toISOString(),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <Button
          onClick={() => {
            setShowSettings(false);
            refetch();
          }}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
        >
          Apply Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
