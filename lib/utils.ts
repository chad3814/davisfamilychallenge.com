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
