"use client";
import React from "react";
import { NavigationLinksProps } from "./types";

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  links,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`text-sm font-medium border-l-4 pl-3 py-2 transition-colors ${
              link.isActive
                ? "text-gray-900 dark:text-white border-blue-500 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={`border-b-2 px-1 pt-1 pb-3 text-sm font-medium transition-colors ${
            link.isActive
              ? "text-gray-900 dark:text-white border-blue-500 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white border-transparent hover:border-gray-300 dark:hover:border-gray-700"
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default NavigationLinks;
