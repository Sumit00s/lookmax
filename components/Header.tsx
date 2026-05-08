"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Coins } from "lucide-react";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-[#faf9f6] dark:bg-[#1a1a1a] transition-colors duration-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            Lookmax
          </span>
        </div>
        <div className="flex items-center justify-end gap-4">
          {/* Credits Counter */}
          <div className="flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span>25</span>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
