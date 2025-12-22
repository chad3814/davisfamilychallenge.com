'use client';

import { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/Layout';
import Accordion from '@/components/Accordion';
import TOCNavigation from '@/components/TOCNavigation';
import YearSummaryCard from '@/components/YearSummaryCard';
import { getAllYears, getYearData } from '@/lib/data';
import { YearData } from '@/types';

export default function AllYearsPage() {
  const years = useMemo(() => getAllYears().reverse(), []); // Get years in descending order (2024 -> 2006)
  const [expandedYear, setExpandedYear] = useState<number | null>(2024);
  const [yearsData, setYearsData] = useState<YearData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load all year data
    const data = years.map(year => getYearData(year));
    setYearsData(data);
  }, [years]);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleYearClick = (year: number) => {
    setExpandedYear(year);

    // Smooth scroll to the accordion section
    const element = document.getElementById(`year-${year}`);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleToggle = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          All Years Archive
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* TOC Sidebar */}
          <TOCNavigation
            years={years}
            activeYear={expandedYear}
            onYearClick={handleYearClick}
            isMobile={isMobile}
          />

          {/* Accordion Content */}
          <div className="flex-1">
            {yearsData.map((yearData) => (
              <Accordion
                key={yearData.year}
                year={yearData.year}
                id={`year-${yearData.year}`}
                isExpanded={expandedYear === yearData.year}
                onToggle={() => handleToggle(yearData.year)}
                content={<YearSummaryCard data={yearData} />}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
