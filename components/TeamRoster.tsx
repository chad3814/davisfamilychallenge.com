import { Team } from '@/types';

interface TeamRosterProps {
  teams: Team[];
}

export default function TeamRoster({ teams }: TeamRosterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Teams</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              {teams.map((team, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2 text-black font-semibold w-1/2">
                  {team.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {teams.map((team, index) => (
                <td key={index} className="border border-gray-300 px-4 py-2 align-top w-1/2">
                  <ul className="list-none space-y-1">
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {teams.map((team, index) => (
          <div key={index} className="border border-blue-500 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">{team.name}</h3>
            <ul className="list-disc list-inside">
              {team.members.map((member, memberIndex) => (
                <li key={memberIndex}>{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
