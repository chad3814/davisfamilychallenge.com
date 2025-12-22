import { formatRecord, calculateWinningPercentage, getOrdinalName, sortByWinningPercentage, calculateGamesPlayed } from '@/lib/utils';
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
          standing: 0,
          gamesPlayed: 10
        },
        {
          participant: 'Player B',
          record: { wins: 10, losses: 5, winningPercentage: 0.667 },
          standing: 0,
          gamesPlayed: 15
        },
        {
          participant: 'Player C',
          record: { wins: 3, losses: 7, winningPercentage: 0.3 },
          standing: 0,
          gamesPlayed: 10
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
