import { ScoreboardData, YearData, Year, isScoreboardData, isYearData } from '@/types';
import { calculateGamesPlayed, calculateWinningPercentage } from './utils';
import scoreboardJson from '@/data/scoreboard.json';

// Valid years range
const VALID_YEARS: Year[] = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
];

/**
 * Load and validate scoreboard data
 */
export function getScoreboardData(): ScoreboardData {
  if (!isScoreboardData(scoreboardJson)) {
    throw new Error('Invalid scoreboard data structure');
  }

  // Add calculated fields to each entry
  const enrichedEntries = scoreboardJson.entries.map(entry => ({
    ...entry,
    record: {
      ...entry.record,
      winningPercentage: calculateWinningPercentage(entry.record.wins, entry.record.losses)
    },
    gamesPlayed: calculateGamesPlayed(entry.record.wins, entry.record.losses)
  }));

  return {
    ...scoreboardJson,
    entries: enrichedEntries
  };
}

/**
 * Load specific year data with runtime validation
 */
export async function getYearData(year: number): Promise<YearData> {
  if (!VALID_YEARS.includes(year as Year)) {
    throw new Error(`Invalid year: ${year}. Must be between 2006 and 2024.`);
  }

  try {
    const yearData = await import(`@/data/years/${year}.json`);

    if (!isYearData(yearData)) {
      throw new Error(`Invalid data structure for year ${year}`);
    }

    return yearData as YearData;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid')) {
      throw error;
    }
    throw new Error(`Failed to load data for year ${year}: ${error}`);
  }
}

/**
 * Get array of all valid years in ascending order
 */
export function getAllYears(): Year[] {
  return [...VALID_YEARS];
}

/**
 * Get sorted list of years for navigation (descending order, newest first)
 */
export function getYearsList(): Year[] {
  return [...VALID_YEARS].reverse();
}
