'use client';

import { AccordionSectionProps } from '@/types';

export default function Accordion({ year, content, isExpanded, onToggle, id }: AccordionSectionProps) {
  return (
    <div className="border border-blue-200 rounded-lg mb-4" id={id}>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-blue-50 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span className="text-xl font-bold text-blue-600">{year}</span>
        <svg
          className={`w-6 h-6 text-blue-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
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

      {isExpanded && (
        <div
          id={`${id}-content`}
          className="px-6 py-4 border-t border-blue-200"
          role="region"
          aria-labelledby={id}
        >
          {content}
        </div>
      )}
    </div>
  );
}
