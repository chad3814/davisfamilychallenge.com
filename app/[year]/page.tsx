import Layout from '@/components/Layout';
import GameNarrative from '@/components/GameNarrative';
import TeamRoster from '@/components/TeamRoster';
import { getYearData, getAllYears } from '@/lib/data';
import { Year } from '@/types';

interface YearPageProps {
  params: Promise<{
    year: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const years = getAllYears();
  return years.map((year) => ({
    year: year.toString(),
  }));
}

export default async function YearPage({ params }: YearPageProps) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year, 10);
  const yearData = getYearData(year as Year);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          {yearData.ordinalName}
        </h1>

        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Team Scheme:</span> {yearData.teamScheme}
            </div>
            <div>
              <span className="font-semibold">Challenge Theme:</span> {yearData.challengeTheme}
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">Winners:</span> {yearData.winners}
            </div>
          </div>
        </div>

        {/* Team Roster */}
        <TeamRoster teams={yearData.teams} />

        {/* Game Narratives */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Games</h2>
          {yearData.games.map((game, index) => (
            <GameNarrative key={index} game={game} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
