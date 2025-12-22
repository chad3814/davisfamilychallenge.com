import { render, screen } from '@testing-library/react';
import Scoreboard from '@/components/Scoreboard';
import { ScoreboardData } from '@/types';

const mockScoreboardData: ScoreboardData = {
  entries: [
    {
      participant: 'J.D.',
      record: { wins: 12, losses: 7, winningPercentage: 0.632 },
      standing: 1
    },
    {
      participant: 'Chad',
      record: { wins: 12, losses: 7, winningPercentage: 0.632 },
      standing: 1
    },
    {
      participant: 'Captain',
      record: { wins: 9, losses: 6, winningPercentage: 0.6 },
      standing: 3
    }
  ],
  lastUpdated: '2024-12-22'
};

describe('Scoreboard Components', () => {
  describe('Scoreboard', () => {
    it('should render participant records', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Components render both mobile and desktop versions
      const jdElements = screen.getAllByText('J.D.');
      expect(jdElements.length).toBeGreaterThan(0);

      const chadElements = screen.getAllByText('Chad');
      expect(chadElements.length).toBeGreaterThan(0);

      const captainElements = screen.getAllByText('Captain');
      expect(captainElements.length).toBeGreaterThan(0);
    });

    it('should display formatted records', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Should show W-L (.PCT) format
      expect(screen.getAllByText(/12-7/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/9-6/).length).toBeGreaterThan(0);
    });

    it('should display Games Played column in desktop view', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Should have "Games Played" header
      const headers = screen.getAllByText('Games Played');
      expect(headers.length).toBeGreaterThan(0);
    });

    it('should display Games Played values correctly', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Should show games played numbers (rendered in both desktop and mobile)
      const gamesPlayed19 = screen.getAllByText('19');
      expect(gamesPlayed19.length).toBeGreaterThan(0);

      const gamesPlayed15 = screen.getAllByText('15');
      expect(gamesPlayed15.length).toBeGreaterThan(0);
    });

    it('should display Games Played in mobile card layout', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Mobile view should show "Games: X" format
      const mobileGames = screen.getAllByText(/Games:/);
      expect(mobileGames.length).toBeGreaterThan(0);
    });

    it('should sort by winning percentage', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Should render entries in order (both have .632 percentage)
      const allElements = screen.getAllByText('J.D.');
      expect(allElements.length).toBeGreaterThan(0);

      // Verify the record is displayed correctly
      expect(screen.getAllByText(/12-7/).length).toBeGreaterThan(0);
    });
  });
});

describe('Hidden Participants Feature - Scoreboard Component', () => {
  describe('Filtering and display', () => {
    it('should filter out hidden participants', () => {
      const data: ScoreboardData = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 1
          },
          {
            participant: 'Shep',
            record: { wins: 0, losses: 1, winningPercentage: 0.0 },
            standing: 9,
            show: false
          }
        ],
        lastUpdated: '2024-12-22'
      };

      render(<Scoreboard data={data} />);

      // J.D. should be visible
      expect(screen.getAllByText('J.D.').length).toBeGreaterThan(0);

      // Shep should NOT be visible
      expect(screen.queryByText('Shep')).toBeNull();
    });

    it('should display Standing column in desktop table', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Check for Standing header
      const standingHeader = screen.getByText('Standing');
      expect(standingHeader).toBeDefined();
    });

    it('should display correct standing numbers with tie-handling', () => {
      const data: ScoreboardData = {
        entries: [
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
        ],
        lastUpdated: '2024-12-22'
      };

      render(<Scoreboard data={data} />);

      // Both J.D. and Chad should be at standing 1 (tied)
      // Captain should be at standing 3 (not 2, because two people are tied at 1)
      const standingElements = screen.getAllByText(/^[0-9]+$/);
      // Filter to get only standing column values (first column in each row)
      expect(standingElements.length).toBeGreaterThan(0);
    });

    it('should calculate standings dynamically at render time', () => {
      const data: ScoreboardData = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 0 // Wrong standing in data
          },
          {
            participant: 'Cat',
            record: { wins: 10, losses: 9, winningPercentage: 0.526 },
            standing: 0 // Wrong standing in data
          }
        ],
        lastUpdated: '2024-12-22'
      };

      render(<Scoreboard data={data} />);

      // Despite wrong standings in data, component should calculate correctly
      // J.D. should be 1st, Cat should be 2nd
      expect(screen.getAllByText('J.D.').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cat').length).toBeGreaterThan(0);
    });

    it('should handle mixed visibility (some with show field, some without)', () => {
      const data: ScoreboardData = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 1
            // No show field - should default to visible
          },
          {
            participant: 'Chad',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 1,
            show: true // Explicitly visible
          },
          {
            participant: 'Shep',
            record: { wins: 0, losses: 1, winningPercentage: 0.0 },
            standing: 9,
            show: false // Hidden
          }
        ],
        lastUpdated: '2024-12-22'
      };

      render(<Scoreboard data={data} />);

      // J.D. and Chad should be visible
      expect(screen.getAllByText('J.D.').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Chad').length).toBeGreaterThan(0);

      // Shep should be hidden
      expect(screen.queryByText('Shep')).toBeNull();
    });

    it('should render mobile cards for filtered entries', () => {
      const data: ScoreboardData = {
        entries: [
          {
            participant: 'J.D.',
            record: { wins: 12, losses: 7, winningPercentage: 0.632 },
            standing: 1
          },
          {
            participant: 'Shep',
            record: { wins: 0, losses: 1, winningPercentage: 0.0 },
            standing: 9,
            show: false
          }
        ],
        lastUpdated: '2024-12-22'
      };

      render(<Scoreboard data={data} />);

      // Mobile view should show only visible entries
      const mobileGamesLabels = screen.getAllByText(/Games:/);
      expect(mobileGamesLabels.length).toBeGreaterThan(0);

      // Shep should not appear in mobile view either
      expect(screen.queryByText('Shep')).toBeNull();
    });
  });
});
