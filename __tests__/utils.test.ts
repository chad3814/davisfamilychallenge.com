import { formatRecord, calculateWinningPercentage, getOrdinalName, sortByWinningPercentage, calculateGamesPlayed, calculateStandings } from '@/lib/utils';
import { ScoreboardEntry } from '@/types';

describe('Utility Functions', () => {
  describe('calculateWinningPercentage', () => {
    it('should calculate percentage with 3 decimal precision', () => {
      expect(calculateWinningPercentage(12, 7)).toBe(0.632);
      expect(calculateWinningPercentage(10, 9)).toBe(0.526);
      expect(calculateWinningPercentage(0, 1)).toBe(0.0);
    });

    it('should handle edge cases', () => {
      expect(calculateWinningPercentage(0, 0)).toBe(0.0);
      expect(calculateWinningPercentage(5, 0)).toBe(1.0);
    });
  });

  describe('formatRecord', () => {
    it('should format record as W-L (.PCT)', () => {
      expect(formatRecord(12, 7)).toBe('12-7 (.632)');
      expect(formatRecord(10, 9)).toBe('10-9 (.526)');
      expect(formatRecord(0, 1)).toBe('0-1 (.000)');
    });

    it('should handle perfect records', () => {
      expect(formatRecord(5, 0)).toBe('5-0 (1.000)');
      expect(formatRecord(0, 5)).toBe('0-5 (.000)');
    });
  });

  describe('getOrdinalName', () => {
    it('should generate correct ordinal names', () => {
      expect(getOrdinalName(2024, 19)).toBe('Nineteenth Annual Davis Family Challenge');
      expect(getOrdinalName(2023, 18)).toBe('Eighteenth Annual Davis Family Challenge');
      expect(getOrdinalName(2006, 1)).toBe('First Annual Davis Family Challenge');
    });
  });

  describe('sortByWinningPercentage', () => {
    it('should sort entries by winning percentage descending', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'Player A',
          record: { wins: 5, losses: 5, winningPercentage: 0.5 },
          standing: 0
        },
        {
          participant: 'Player B',
          record: { wins: 10, losses: 5, winningPercentage: 0.667 },
          standing: 0
        },
        {
          participant: 'Player C',
          record: { wins: 3, losses: 7, winningPercentage: 0.3 },
          standing: 0
        }
      ];

      const sorted = sortByWinningPercentage(entries);
      expect(sorted[0].participant).toBe('Player B');
      expect(sorted[1].participant).toBe('Player A');
      expect(sorted[2].participant).toBe('Player C');
    });
  });

  describe('calculateGamesPlayed', () => {
    it('should calculate total games played from wins and losses', () => {
      expect(calculateGamesPlayed(12, 7)).toBe(19);
      expect(calculateGamesPlayed(10, 9)).toBe(19);
      expect(calculateGamesPlayed(8, 11)).toBe(19);
    });

    it('should handle zero wins', () => {
      expect(calculateGamesPlayed(0, 5)).toBe(5);
      expect(calculateGamesPlayed(0, 1)).toBe(1);
    });

    it('should handle zero losses', () => {
      expect(calculateGamesPlayed(10, 0)).toBe(10);
      expect(calculateGamesPlayed(1, 0)).toBe(1);
    });

    it('should handle equal records', () => {
      expect(calculateGamesPlayed(5, 5)).toBe(10);
      expect(calculateGamesPlayed(9, 9)).toBe(18);
    });

    it('should handle both zero (no games played)', () => {
      expect(calculateGamesPlayed(0, 0)).toBe(0);
    });

    it('should handle large numbers', () => {
      expect(calculateGamesPlayed(100, 50)).toBe(150);
      expect(calculateGamesPlayed(999, 1)).toBe(1000);
    });
  });
});

describe('Hidden Participants Feature - Standings Calculation', () => {
  describe('calculateStandings', () => {
    it('should calculate standings with no ties', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'Player A',
          record: { wins: 10, losses: 5, winningPercentage: 0.667 },
          standing: 0
        },
        {
          participant: 'Player B',
          record: { wins: 5, losses: 5, winningPercentage: 0.5 },
          standing: 0
        },
        {
          participant: 'Player C',
          record: { wins: 3, losses: 7, winningPercentage: 0.3 },
          standing: 0
        }
      ];

      const result = calculateStandings(entries);

      expect(result[0].standing).toBe(1);
      expect(result[1].standing).toBe(2);
      expect(result[2].standing).toBe(3);
    });

    it('should handle 2-way tie correctly', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'J.D.',
          record: { wins: 12, losses: 7, winningPercentage: 0.632 },
          standing: 0
        },
        {
          participant: 'Chad',
          record: { wins: 12, losses: 7, winningPercentage: 0.632 },
          standing: 0
        },
        {
          participant: 'Captain',
          record: { wins: 9, losses: 6, winningPercentage: 0.6 },
          standing: 0
        }
      ];

      const result = calculateStandings(entries);

      // J.D. and Chad tied at 1
      expect(result[0].standing).toBe(1);
      expect(result[1].standing).toBe(1);
      // Captain is 3rd (not 2nd, because two people are tied at 1st)
      expect(result[2].standing).toBe(3);
    });

    it('should handle 3-way tie correctly', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'Captain',
          record: { wins: 9, losses: 6, winningPercentage: 0.6 },
          standing: 0
        },
        {
          participant: 'Cat',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Uncle Giant',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Lorelei',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Grammy',
          record: { wins: 7, losses: 12, winningPercentage: 0.368 },
          standing: 0
        }
      ];

      const result = calculateStandings(entries);

      expect(result[0].standing).toBe(1); // Captain at 1st
      expect(result[1].standing).toBe(2); // Cat at 2nd (tied)
      expect(result[2].standing).toBe(2); // Uncle Giant at 2nd (tied)
      expect(result[3].standing).toBe(2); // Lorelei at 2nd (tied)
      // Grammy is 5th (not 3rd, because three people are tied at 2nd)
      expect(result[4].standing).toBe(5);
    });

    it('should calculate actual Davis Family Challenge standings correctly', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'J.D.',
          record: { wins: 12, losses: 7, winningPercentage: 0.632 },
          standing: 0
        },
        {
          participant: 'Chad',
          record: { wins: 12, losses: 7, winningPercentage: 0.632 },
          standing: 0
        },
        {
          participant: 'Captain',
          record: { wins: 9, losses: 6, winningPercentage: 0.6 },
          standing: 0
        },
        {
          participant: 'Cat',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Uncle Giant',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Lorelei',
          record: { wins: 10, losses: 9, winningPercentage: 0.526 },
          standing: 0
        },
        {
          participant: 'Grammy',
          record: { wins: 7, losses: 12, winningPercentage: 0.368 },
          standing: 0
        },
        {
          participant: 'Eddie',
          record: { wins: 4, losses: 8, winningPercentage: 0.333 },
          standing: 0
        }
      ];

      const result = calculateStandings(entries);

      expect(result[0].standing).toBe(1); // J.D. at 1st
      expect(result[1].standing).toBe(1); // Chad at 1st (tied)
      expect(result[2].standing).toBe(3); // Captain at 3rd
      expect(result[3].standing).toBe(4); // Cat at 4th (tied)
      expect(result[4].standing).toBe(4); // Uncle Giant at 4th (tied)
      expect(result[5].standing).toBe(4); // Lorelei at 4th (tied)
      expect(result[6].standing).toBe(7); // Grammy at 7th
      expect(result[7].standing).toBe(8); // Eddie at 8th
    });

    it('should not mutate input array', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'Player A',
          record: { wins: 10, losses: 5, winningPercentage: 0.667 },
          standing: 0
        },
        {
          participant: 'Player B',
          record: { wins: 5, losses: 5, winningPercentage: 0.5 },
          standing: 0
        }
      ];

      const originalOrder = entries.map(e => e.participant);
      calculateStandings(entries);

      // Original array should not be mutated
      expect(entries.map(e => e.participant)).toEqual(originalOrder);
    });

    it('should handle single entry', () => {
      const entries: ScoreboardEntry[] = [
        {
          participant: 'Only Player',
          record: { wins: 5, losses: 5, winningPercentage: 0.5 },
          standing: 0
        }
      ];

      const result = calculateStandings(entries);
      expect(result.length).toBe(1);
      expect(result[0].standing).toBe(1);
    });
  });
});
