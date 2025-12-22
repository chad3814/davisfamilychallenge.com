'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Show only last 3 years plus All Years link
  const recentYears = [2024, 2023, 2022];

  return (
    <nav className="bg-gray-100 border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Davis Family Challenge
          </Link>

          <div className="flex flex-wrap gap-3">
            {recentYears.map((year) => (
              <Link
                key={year}
                href={`/${year}/`}
                className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {year}
              </Link>
            ))}
            <Link
              href="/all-years"
              className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              All Years
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900"
            >
              Davis Family Challenge
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="pb-4">
              <div className="grid grid-cols-2 gap-2">
                {recentYears.map((year) => (
                  <Link
                    key={year}
                    href={`/${year}/`}
                    className="px-3 py-2 text-center text-blue-600 hover:bg-gray-200 rounded transition-colors min-h-[44px] flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {year}
                  </Link>
                ))}
                <Link
                  href="/all-years"
                  className="px-3 py-2 text-center text-blue-600 hover:bg-gray-200 rounded transition-colors min-h-[44px] flex items-center justify-center col-span-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Years
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
