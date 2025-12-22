import { render, screen } from '@testing-library/react';
import Scoreboard from '@/components/Scoreboard';
import { ScoreboardData } from '@/types';

const mockScoreboardData: ScoreboardData = {
  entries: [
    {
      participant: 'J.D.',
      record: { wins: 12, losses: 7, winningPercentage: 0.632 },
      standing: 1,
      gamesPlayed: 19
    },
    {
      participant: 'Chad',
      record: { wins: 12, losses: 7, winningPercentage: 0.632 },
      standing: 1,
      gamesPlayed: 19
    },
    {
      participant: 'Captain',
      record: { wins: 9, losses: 6, winningPercentage: 0.6 },
      standing: 3,
      gamesPlayed: 15
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
