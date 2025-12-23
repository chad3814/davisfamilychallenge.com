import Image from 'next/image';
import Layout from '@/components/Layout';
import Scoreboard from '@/components/Scoreboard';
import YearSummaryCard from '@/components/YearSummaryCard';
import { getScoreboardData, getYearData } from '@/lib/data';

export default async function HomePage() {
  const scoreboardData = getScoreboardData();

  // Show only last 3 years on homepage
  const recentYears = [2024, 2023, 2022];
  const yearsData = await Promise.all(recentYears.map(year => getYearData(year)));

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Image */}
        <div className="text-center mb-8">
          <Image
            src="/images/plaque.jpg"
            alt="Davis Family Challenge Plaque"
            width={800}
            height={600}
            className="mx-auto max-w-full h-auto"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-12">
          Davis Family Challenge
        </h1>

        {/* Scoreboard */}
        <Scoreboard data={scoreboardData} />

        {/* Year Summaries */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Yearly Results</h2>
          {yearsData.map((yearData) => (
            <YearSummaryCard key={yearData.year} data={yearData} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
