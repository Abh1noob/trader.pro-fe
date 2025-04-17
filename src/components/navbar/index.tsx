"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Menu,
  X,
  Calendar as CalendarIcon,
  Clock,
  Search,
} from "lucide-react";
import NavigationLinks from "./navigation-links";
import { Button } from "../button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "../Input";
import { Label } from "../Label";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Dropdown";
import SearchComponent from "./search-component";

const navLinks = [
  { href: "/home", label: "Dashboard", isActive: true },
  { href: "/trades", label: "Trades", isActive: false },
];

function useLocalStorageDate(key: string, initialValue?: Date) {
  const [storedValue, setStoredValue] = useState<Date>(() => {
    if (typeof window === "undefined") return initialValue ?? new Date();
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const date = new Date(item);
        return isNaN(date.getTime()) ? new Date() : date;
      }
      return initialValue ?? new Date();
    } catch (error) {
      console.error("Error reading localStorage key:", error);
      return new Date();
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, storedValue.toISOString());
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSimDateModal, setShowSimDateModal] = useState(false);
  const [simulationDate, setSimulationDate] = useLocalStorageDate(
    "simulationDate",
    new Date()
  );
  const [tempDate, setTempDate] = useState<Date | undefined>(simulationDate);
  const [tempTime, setTempTime] = useState(format(simulationDate, "HH:mm:ss"));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulationDate((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const router = useRouter();
  const user = auth.currentUser;

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
    window.location.reload();
  };

  const today = new Date();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Image
              width={36}
              height={36}
              src="/assets/logo.jpg"
              alt="Trader.pro logo"
              className="rounded-md"
            />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Trader.pro
            </span>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center ml-8">
              <NavigationLinks links={navLinks} />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <SearchComponent className="w-full" />

            {/* Simulation Date Button */}
            <div className="hidden md:flex items-center gap-2 h-8">
              <Button
                onClick={() => {
                  setTempDate(simulationDate);
                  setTempTime(format(simulationDate, "HH:mm:ss"));
                  setShowSimDateModal(true);
                }}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md px-3 py-1.5"
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">
                  {format(simulationDate, "yyyy-MM-dd")}
                </span>
                <Clock className="h-4 w-4 mx-1" />
                <span className="text-sm">
                  {format(simulationDate, "HH:mm:ss")}
                </span>
              </Button>
            </div>

            {/* User Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full w-9 h-9 p-0 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  aria-label="User menu"
                  variant="ghost"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user?.displayName || "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Account Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                  onSelect={async (e) => {
                    e.preventDefault();
                    await signOut(auth);
                    router.push("/auth/login");
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              className="md:hidden rounded-md p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3">
            <div className="space-y-4 px-4">
              {/* Search - Mobile */}
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search symbols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </form>

              {/* Navigation Links - Mobile */}
              <NavigationLinks links={navLinks} isMobile={true} />

              {/* Simulation Date - Mobile */}
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Simulation Date:
                </div>
                <Button
                  className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md px-3 py-2"
                  onClick={() => {
                    setTempDate(simulationDate);
                    setTempTime(format(simulationDate, "HH:mm:ss"));
                    setShowSimDateModal(true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(simulationDate, "yyyy-MM-dd")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{format(simulationDate, "HH:mm:ss")}</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Date Modal */}
        {showSimDateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Set Simulation Date
                </h2>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowSimDateModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-4">
                <Calendar
                  mode="single"
                  selected={tempDate}
                  onSelect={setTempDate}
                  disabled={(date) => date > today}
                  initialFocus
                  className="rounded-md border border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="mb-4">
                <Label
                  htmlFor="time-input"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Time (HH:MM:SS)
                </Label>
                <Input
                  id="time-input"
                  type="time"
                  step="1"
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                  onClick={() => setShowSimDateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="px-4 py-2 rounded-md text-white"
                  onClick={handleSaveDate}
                  disabled={!tempDate}
                >
                  Apply
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
