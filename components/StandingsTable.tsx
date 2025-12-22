import { ScoreboardData } from '@/types';
import { formatRecord, sortByWinningPercentage } from '@/lib/utils';

interface StandingsTableProps {
  data: ScoreboardData;
}

export default function StandingsTable({ data }: StandingsTableProps) {
  const sortedEntries = sortByWinningPercentage(data.entries);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center mb-6">Overall Standings</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-center">Rank</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Record</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr
                key={entry.participant}
                className={`hover:bg-gray-50 ${index < 3 ? 'font-bold' : ''}`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {entry.standing}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.participant}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatRecord(entry.record.wins, entry.record.losses)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedEntries.map((entry, index) => (
          <div
            key={entry.participant}
            className={`border border-gray-300 rounded-lg p-4 bg-white shadow-sm ${
              index < 3 ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`text-lg ${index < 3 ? 'font-bold' : 'font-semibold'}`}>
                {entry.participant}
              </div>
              <div className="text-2xl font-bold text-blue-600">
                #{entry.standing}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Record:</span>
              <div className={index < 3 ? 'font-bold' : 'font-semibold'}>
                {formatRecord(entry.record.wins, entry.record.losses)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
