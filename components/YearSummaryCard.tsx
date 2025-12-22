import Link from 'next/link';
import { YearData } from '@/types';

interface YearSummaryCardProps {
  data: YearData;
}

export default function YearSummaryCard({ data }: YearSummaryCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white shadow-sm">
      <h3 className="text-2xl font-bold mb-4 text-center">
        <Link href={`/${data.year}/`} className="text-blue-600 hover:underline">
          {data.year}
        </Link>
      </h3>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-semibold">Team Scheme:</span> {data.teamScheme}
          </div>
          <div>
            <span className="font-semibold">Challenge Theme:</span> {data.challengeTheme}
          </div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Winners:</span> {data.winners}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Games:</h4>
        <ul className="list-disc list-inside text-sm">
          {data.games.map((game, index) => (
            <li key={index}>{game.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Teams:</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                {data.teams.map((team, index) => (
                  <th key={index} className="border border-gray-300 px-3 py-2">
                    {team.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.teams.map((team, index) => (
                  <td key={index} className="border border-gray-300 px-3 py-2 align-top">
                    <ul className="list-none">
                      {team.members.map((member, memberIndex) => (
                        <li key={memberIndex}>{member}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
