'use client';

import { TOCNavigationProps } from '@/types';
import { useState } from 'react';

export default function TOCNavigation({ years, activeYear, onYearClick, isMobile = false }: TOCNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleYearClick = (year: number) => {
    onYearClick(year);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-between"
          aria-label="Toggle year navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="font-semibold">Jump to Year</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <nav className="mt-2 bg-white border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
            <ul className="grid grid-cols-3 gap-2">
              {years.map((year) => (
                <li key={year}>
                  <button
                    onClick={() => handleYearClick(year)}
                    className={`w-full px-3 py-2 rounded text-center transition-colors min-h-[44px] ${
                      activeYear === year
                        ? 'bg-blue-700 text-white font-semibold'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                    aria-current={activeYear === year ? 'true' : undefined}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Desktop sticky sidebar
  return (
    <nav className="hidden md:block w-48 sticky top-20 self-start">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Years</h3>
      <ul className="space-y-2">
        {years.map((year) => (
          <li key={year}>
            <button
              onClick={() => handleYearClick(year)}
              className={`w-full px-3 py-2 rounded text-left transition-colors ${
                activeYear === year
                  ? 'bg-blue-700 text-white font-semibold'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
              aria-current={activeYear === year ? 'true' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  const currentIndex = years.indexOf(year);
                  if (currentIndex < years.length - 1) {
                    const nextYear = years[currentIndex + 1];
                    onYearClick(nextYear);
                  }
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  const currentIndex = years.indexOf(year);
                  if (currentIndex > 0) {
                    const prevYear = years[currentIndex - 1];
                    onYearClick(prevYear);
                  }
                }
              }}
            >
              {year}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
