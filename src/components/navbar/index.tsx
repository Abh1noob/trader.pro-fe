"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import NavigationLinks from "./navigation-links";
import SearchComponent from "./search-component";
import { Button } from "../button";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, isValid } from "date-fns";
import { Input } from "../Input";
import { Label } from "../Label";

const navLinks = [
  { href: "#", label: "Dashboard", isActive: true },
  { href: "#", label: "Orders", isActive: false },
  { href: "#", label: "Holdings", isActive: false },
  { href: "#", label: "Positions", isActive: false },
];

function useLocalStorageDate(key: string, initialValue?: Date) {
  const [storedValue, setStoredValue] = useState<Date | undefined>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const date = parseISO(item);
        return isValid(date) ? date : undefined;
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (storedValue) {
      window.localStorage.setItem(key, storedValue.toISOString());
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSimDateModal, setShowSimDateModal] = useState(false);
  const [simulationDate, setSimulationDate] = useLocalStorageDate(
    "simulationDate",
    undefined
  );
  const [liveSimDate, setLiveSimDate] = useState<Date | undefined>(
    simulationDate
  );
  const [tempDate, setTempDate] = useState<Date | undefined>(simulationDate);
  const [tempTime, setTempTime] = useState(
    simulationDate ? format(simulationDate, "HH:mm:ss") : "00:00:00"
  );

  useEffect(() => {
    setLiveSimDate(simulationDate);
  }, [simulationDate]);

  useEffect(() => {
    if (!liveSimDate) return;

    const timer = setInterval(() => {
      setLiveSimDate((prev) =>
        prev ? new Date(prev.getTime() + 1000) : undefined
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [liveSimDate]);

  useEffect(() => {
    if (liveSimDate) {
      window.localStorage.setItem("simulationDate", liveSimDate.toISOString());
    }
  }, [liveSimDate]);

  useEffect(() => {
    setTempTime(liveSimDate ? format(liveSimDate, "HH:mm:ss") : "00:00:00");
    setTempDate(liveSimDate);
  }, [liveSimDate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSaveDate = () => {
    if (tempDate && tempTime) {
      const [hours, minutes, seconds] = tempTime
        .split(":")
        .map((v) => Number(v) || 0);
      const newDate = new Date(tempDate);
      newDate.setHours(hours, minutes, seconds, 0);
      setSimulationDate(newDate);
      setShowSimDateModal(false);
    }
  };

  const today = new Date();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800 py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                width={40}
                height={40}
                src="/assets/logo.jpg"
                alt="Trader.pro logo"
                className="rounded-md"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Trader.pro
              </span>
            </div>
          </div>

          <div className="hidden md:block ml-6">
            <NavigationLinks links={navLinks} />
          </div>

          <div className="flex items-center space-x-4 min-w-fit">
            <div className="hidden sm:block w-full max-w-xs">
              <SearchComponent containerClassName="flex-shrink-0" />
            </div>

            <Button
              className="rounded-md px-3 py-2 "
              onClick={() => setShowSimDateModal(true)}
            >
              Set Simulation Date
            </Button>

            {liveSimDate && (
              <span className="text-xs text-gray-600 dark:text-gray-300 px-2">
                Simulation: {format(liveSimDate, "yyyy-MM-dd HH:mm:ss")}
              </span>
            )}

            <Button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              <User className="h-5 w-5" />
            </Button>

            <Button
              className="md:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <NavigationLinks links={navLinks} isMobile={true} />

              <div className="sm:hidden w-full mt-2">
                <SearchComponent isMobile={true} />
              </div>

              <Button
                className="rounded-md px-3 py-2 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowSimDateModal(true)}
              >
                Set Simulation Date
              </Button>
              {liveSimDate && (
                <span className="text-xs text-gray-600 dark:text-gray-300 px-2">
                  Simulation: {format(liveSimDate, "yyyy-MM-dd HH:mm:ss")}
                </span>
              )}
            </div>
          </div>
        )}

        {showSimDateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4">Set Simulation Date</h2>
              <Calendar
                mode="single"
                selected={tempDate}
                onSelect={setTempDate}
                disabled={(date) => date > today}
                initialFocus
              />
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Time</Label>
                <Input
                  type="time"
                  step="1"
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="w-full px-3 py-2 rounded border"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="secondary"
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setShowSimDateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="px-4 py-2 rounded text-white"
                  onClick={handleSaveDate}
                  disabled={!tempDate}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
