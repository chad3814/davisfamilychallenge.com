import { getScoreboardData, getYearData, getAllYears, getYearsList } from '@/lib/data';
import { ScoreboardData, YearData } from '@/types';

describe('Data Loading Functions', () => {
  describe('getScoreboardData', () => {
    it('should return valid scoreboard data', () => {
      const data = getScoreboardData();
      expect(data).toBeDefined();
      expect(data.entries).toBeInstanceOf(Array);
      expect(data.entries.length).toBeGreaterThan(0);
      expect(data.lastUpdated).toBeDefined();
    });

    it('should have valid structure for each entry', () => {
      const data = getScoreboardData();
      data.entries.forEach(entry => {
        expect(entry.participant).toBeDefined();
        expect(typeof entry.participant).toBe('string');
        expect(entry.record).toBeDefined();
        expect(entry.record.wins).toBeGreaterThanOrEqual(0);
        expect(entry.record.losses).toBeGreaterThanOrEqual(0);
        expect(entry.record.winningPercentage).toBeGreaterThanOrEqual(0);
        expect(entry.record.winningPercentage).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('getYearData', () => {
    it('should return valid year data for 2024', () => {
      const data = getYearData(2024);
      expect(data).toBeDefined();
      expect(data.year).toBe(2024);
      expect(data.ordinalName).toBeDefined();
      expect(data.teamScheme).toBeDefined();
      expect(data.challengeTheme).toBeDefined();
      expect(data.winners).toBeDefined();
      expect(data.games).toBeInstanceOf(Array);
      expect(data.teams).toBeInstanceOf(Array);
    });

    it('should return valid year data for 2006', () => {
      const data = getYearData(2006);
      expect(data).toBeDefined();
      expect(data.year).toBe(2006);
    });

    it('should throw error for invalid year', () => {
      expect(() => getYearData(2025)).toThrow();
      expect(() => getYearData(2005)).toThrow();
    });
  });

  describe('getAllYears', () => {
    it('should return array of all 19 years', () => {
      const years = getAllYears();
      expect(years).toBeInstanceOf(Array);
      expect(years.length).toBe(19);
      expect(years).toContain(2006);
      expect(years).toContain(2024);
    });

    it('should return years in ascending order', () => {
      const years = getAllYears();
      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).toBeLessThan(years[i + 1]);
      }
    });
  });

  describe('getYearsList', () => {
    it('should return sorted list of years for navigation', () => {
      const years = getYearsList();
      expect(years).toBeInstanceOf(Array);
      expect(years.length).toBe(19);
    });

    it('should return years in descending order for navigation', () => {
      const years = getYearsList();
      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).toBeGreaterThan(years[i + 1]);
      }
      expect(years[0]).toBe(2024);
      expect(years[years.length - 1]).toBe(2006);
    });
  });
});

describe('Hidden Participants Feature - Data Structure', () => {
  describe('Scoreboard JSON data structure', () => {
    it('should have 13 total entries', () => {
      const data = getScoreboardData();
      expect(data.entries.length).toBe(13);
    });

    it('should have 5 hidden participants with show: false', () => {
      const data = getScoreboardData();
      const hiddenEntries = data.entries.filter(entry => entry.show === false);
      expect(hiddenEntries.length).toBe(5);

      const hiddenNames = hiddenEntries.map(e => e.participant).sort();
      expect(hiddenNames).toEqual(['Jenelle', 'Katie', 'Meredith', 'Shep', 'Steph']);
    });

    it('should have 8 visible participants', () => {
      const data = getScoreboardData();
      const visibleEntries = data.entries.filter(entry => entry.show !== false);
      expect(visibleEntries.length).toBe(8);

      const visibleNames = visibleEntries.map(e => e.participant).sort();
      expect(visibleNames).toEqual(['Captain', 'Cat', 'Chad', 'Eddie', 'Grammy', 'J.D.', 'Lorelei', 'Uncle Giant']);
    });

    it('should have no standing field in any entry', () => {
      const data = getScoreboardData();
      data.entries.forEach(entry => {
        expect(entry.standing).toBeUndefined();
      });
    });

    it('should have correct winning percentages for new participants', () => {
      const data = getScoreboardData();

      const steph = data.entries.find(e => e.participant === 'Steph');
      expect(steph?.record.winningPercentage).toBe(0.333);

      const katie = data.entries.find(e => e.participant === 'Katie');
      expect(katie?.record.winningPercentage).toBe(0.0);

      const jenelle = data.entries.find(e => e.participant === 'Jenelle');
      expect(jenelle?.record.winningPercentage).toBe(0.0);

      const meredith = data.entries.find(e => e.participant === 'Meredith');
      expect(meredith?.record.winningPercentage).toBe(0.0);
    });

    it('should not have updated lastUpdated date', () => {
      const data = getScoreboardData();
      expect(data.lastUpdated).toBe('2024-12-22');
    });
  });
});
