"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SearchIcon, User, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                width={40}
                height={40}
                src="/assets/logo.jpg"
                alt="Trader.pro logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Trader.pro
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-6">
            <a
              href="#"
              className="border-b-2 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100 px-1 pt-1 text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1 pt-1 text-sm font-medium"
            >
              Orders
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1 pt-1 text-sm font-medium"
            >
              Holdings
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1 pt-1 text-sm font-medium"
            >
              Positions
            </a>
          </div>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-shrink-0 w-full max-w-xs hidden sm:block">
              <Input
                type="text"
                className="pl-10 pr-3 py-2 dark:bg-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 text-sm w-full focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Search stocks..."
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>
            <Button className="rounded-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </Button>
            {/* Hamburger Menu Button */}
            <Button
              className="md:hidden p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <a
                href="#"
                className="border-b-2 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium"
              >
                Orders
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium"
              >
                Holdings
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium"
              >
                Positions
              </a>
              <div className="relative flex-shrink-0 w-full sm:hidden">
                <Input
                  type="text"
                  className="pl-10 pr-3 py-2"
                  placeholder="Search stocks..."
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
