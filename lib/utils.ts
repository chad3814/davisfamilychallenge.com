import { ScoreboardEntry } from '@/types';

/**
 * Calculate winning percentage with 3 decimal precision
 */
export function calculateWinningPercentage(wins: number, losses: number): number {
  const total = wins + losses;
  if (total === 0) return 0.0;
  const percentage = wins / total;
  return Math.round(percentage * 1000) / 1000;
}

/**
 * Format record as "W-L (.PCT)"
 */
export function formatRecord(wins: number, losses: number): string {
  const pct = calculateWinningPercentage(wins, losses);
  let pctFormatted = pct.toFixed(3);

  // Add leading period for percentages less than 1 (e.g., "0.632" -> ".632")
  if (pctFormatted.startsWith('0.')) {
    pctFormatted = pctFormatted.substring(1);
  }

  return `${wins}-${losses} (${pctFormatted})`;
}

/**
 * Calculate total games played from wins and losses
 */
export function calculateGamesPlayed(wins: number, losses: number): number {
  return wins + losses;
}

/**
 * Get ordinal name for year
 * Maps year number (1-19) to ordinal string
 */
export function getOrdinalName(year: number, yearNumber: number): string {
  const ordinals = [
    '', 'First', 'Second', 'Third', 'Fourth', 'Fifth',
    'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
    'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth',
    'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth'
  ];

  const ordinal = ordinals[yearNumber] || `${yearNumber}th`;
  return `${ordinal} Annual Davis Family Challenge`;
}

/**
 * Sort scoreboard entries by winning percentage (descending)
 */
export function sortByWinningPercentage(entries: ScoreboardEntry[]): ScoreboardEntry[] {
  return [...entries].sort((a, b) => {
    return b.record.winningPercentage - a.record.winningPercentage;
  });
}

/**
 * Calculate standings for scoreboard entries with tie-handling
 *
 * Entries with the same winning percentage receive the same standing number.
 * The next standing number after tied entries accounts for the number of tied participants.
 *
 * Example: Two participants tied at 1st means the next participant is 3rd (not 2nd).
 * Example: Three participants tied at 4th means the next participant is 7th (not 5th).
 *
 * @param entries Array of scoreboard entries (should be pre-filtered for visible participants)
 * @returns Array of entries with calculated standing property
 */
export function calculateStandings(entries: ScoreboardEntry[]): ScoreboardEntry[] {
  // Sort by winning percentage descending
  const sorted = sortByWinningPercentage(entries);

  // Calculate standings with tie-handling
  let currentStanding = 1;
  let previousPercentage: number | null = null;
  let tieCount = 0;

  return sorted.map((entry, index) => {
    if (previousPercentage === null || entry.record.winningPercentage !== previousPercentage) {
      // New percentage - update standing
      currentStanding = index + 1;
      tieCount = 1;
    } else {
      // Tie - keep same standing and increment tie count
      tieCount++;
    }

    previousPercentage = entry.record.winningPercentage;

    return {
      ...entry,
      standing: currentStanding
    };
  });
}
