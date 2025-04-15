import type { Metadata } from "next";

import "./globals.css";
import React from "react";
import Provider from "@/lib/provider";

export const metadata: Metadata = {
  title: "Trader.pro",
  description: "Made with ❤️ by Abhinav Ganeshan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main>
          <Provider>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <div className="max-w-[1440px] mx-auto">{children}</div>
            </div>
          </Provider>
        </main>
      </body>
    </html>
  );
}
