import { isYearData, isScoreboardData, isParticipantRecord, type YearData, type ScoreboardData, type ParticipantRecord } from '@/types';

describe('Type Guards', () => {
  describe('isParticipantRecord', () => {
    it('should validate a valid record object', () => {
      const record: ParticipantRecord = {
        wins: 12,
        losses: 7,
        winningPercentage: 0.632
      };
      expect(isParticipantRecord(record)).toBe(true);
    });

    it('should reject invalid record objects', () => {
      expect(isParticipantRecord({ wins: 12, losses: '7' })).toBe(false);
      expect(isParticipantRecord({ wins: 12 })).toBe(false);
      expect(isParticipantRecord(null)).toBe(false);
    });
  });

  describe('isScoreboardData', () => {
    it('should validate valid scoreboard data', () => {
      const scoreboard: ScoreboardData = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 1
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(scoreboard)).toBe(true);
    });

    it('should reject invalid scoreboard data', () => {
      expect(isScoreboardData({ entries: 'not-array' })).toBe(false);
      expect(isScoreboardData(null)).toBe(false);
    });
  });

  describe('isYearData', () => {
    it('should validate valid year data', () => {
      const yearData: YearData = {
        year: 2024,
        ordinalName: 'Nineteenth Annual Davis Family Challenge',
        teamScheme: 'Computer Generated Teams',
        challengeTheme: 'Picked from a container',
        winners: 'Losers',
        games: [{ name: 'Head Hoops', description: 'Basketball game' }],
        teams: [{ name: 'Team Underdogs', members: ['Grammy', 'Cat', 'Eddie', 'Shep'] }]
      };
      expect(isYearData(yearData)).toBe(true);
    });

    it('should reject invalid year data', () => {
      expect(isYearData({ year: '2024' })).toBe(false);
      expect(isYearData(null)).toBe(false);
    });
  });
});
