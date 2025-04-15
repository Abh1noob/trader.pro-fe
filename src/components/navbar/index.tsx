"use client";
import { Button } from "@/components/Button";
import { User, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import NavigationLinks from "./navigation-links";
import SearchComponent from "./search-component";

// Navigation links data
const navLinks = [
  { href: "#", label: "Dashboard", isActive: true },
  { href: "#", label: "Orders", isActive: false },
  { href: "#", label: "Holdings", isActive: false },
  { href: "#", label: "Positions", isActive: false },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800 py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:block ml-6">
            <NavigationLinks links={navLinks} />
          </div>

          {/* Search and User */}
          <div className="flex items-center space-x-4 min-w-fit">
            {/* Desktop Search Component */}
            <div className="hidden sm:block w-full max-w-xs">
              <SearchComponent containerClassName="flex-shrink-0" />
            </div>

            <Button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              <User className="h-5 w-5" />
            </Button>

            {/* Hamburger Menu Button */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4 px-4 py-4">
              {/* Mobile Navigation Links */}
              <NavigationLinks links={navLinks} isMobile={true} />

              {/* Mobile Search Component */}
              <div className="sm:hidden w-full mt-2">
                <SearchComponent isMobile={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
