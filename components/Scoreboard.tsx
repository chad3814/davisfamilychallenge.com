import { ScoreboardData } from '@/types';
import { formatRecord, calculateGamesPlayed } from '@/lib/utils';

interface ScoreboardProps {
  data: ScoreboardData;
}

export default function Scoreboard({ data }: ScoreboardProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center mb-6">Lifetime Records</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-black font-semibold">Record</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-black font-semibold">Winning Percentage</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-black font-semibold">Games Played</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry) => {
              const gamesPlayed = calculateGamesPlayed(entry.record.wins, entry.record.losses);
              return (
                <tr key={entry.participant} className="hover:bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {entry.participant}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {entry.record.wins}-{entry.record.losses}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {formatRecord(entry.record.wins, entry.record.losses).split(' ')[1]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {gamesPlayed}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.entries.map((entry) => {
          const gamesPlayed = calculateGamesPlayed(entry.record.wins, entry.record.losses);
          return (
            <div
              key={entry.participant}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm ring-1 ring-blue-500"
            >
              <div className="font-bold text-lg mb-2">{entry.participant}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Record:</span>
                  <div className="font-semibold">
                    {formatRecord(entry.record.wins, entry.record.losses)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Games:</span>
                  <div className="font-semibold">{gamesPlayed}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
