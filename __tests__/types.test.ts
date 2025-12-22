import { isYearData, isScoreboardData, isParticipantRecord, type YearData, type ScoreboardData, type ParticipantRecord, type ScoreboardEntry } from '@/types';

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

describe('Hidden Participants Feature - Type Definitions', () => {
  describe('ScoreboardEntry with optional show field', () => {
    it('should accept entry with show: true', () => {
      const entry: ScoreboardEntry = {
        participant: 'J.D.',
        record: { wins: 12, losses: 7, winningPercentage: 0.632 },
        standing: 1,
        show: true
      };
      expect(entry.show).toBe(true);
    });

    it('should accept entry with show: false', () => {
      const entry: ScoreboardEntry = {
        participant: 'Shep',
        record: { wins: 0, losses: 1, winningPercentage: 0.0 },
        standing: 9,
        show: false
      };
      expect(entry.show).toBe(false);
    });

    it('should accept entry without show field (backward compatibility)', () => {
      const entry: ScoreboardEntry = {
        participant: 'Chad',
        record: { wins: 12, losses: 7, winningPercentage: 0.632 },
        standing: 1
      };
      expect(entry.show).toBeUndefined();
    });
  });

  describe('isScoreboardData type guard with optional show field', () => {
    it('should accept data with entries having show: false', () => {
      const data = {
        entries: [
          {
            participant: 'Shep',
            record: { wins: 0, losses: 1, winningPercentage: 0.0 },
            show: false
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(true);
    });

    it('should accept data with entries having show: true', () => {
      const data = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            show: true
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(true);
    });

    it('should accept data with entries without show field (backward compatibility)', () => {
      const data = {
        entries: [
          {
            participant: 'Chad',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 }
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(true);
    });

    it('should accept data without standing field in entries', () => {
      const data = {
        entries: [
          {
            participant: 'Captain',
            record: { wins: 9, losses: 6, winningPercentage: 0.6 }
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(true);
    });

    it('should reject data with non-boolean show field', () => {
      const data = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            show: 'yes' // Invalid: should be boolean
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(false);
    });

    it('should accept mixed entries (some with show, some without)', () => {
      const data = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 }
          },
          {
            participant: 'Shep',
            record: { wins: 0, losses: 1, winningPercentage: 0.0 },
            show: false
          }
        ],
        lastUpdated: '2024-12-22'
      };
      expect(isScoreboardData(data)).toBe(true);
    });
  });
});
