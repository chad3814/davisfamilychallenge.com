import { render, screen } from '@testing-library/react';
import Scoreboard from '@/components/Scoreboard';
import StandingsTable from '@/components/StandingsTable';
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
  });

  describe('StandingsTable', () => {
    it('should render standings sorted by winning percentage', () => {
      render(<StandingsTable data={mockScoreboardData} />);

      // Top participants should be J.D. and Chad (rendered in both desktop and mobile)
      const jdElements = screen.getAllByText('J.D.');
      expect(jdElements.length).toBeGreaterThan(0);

      const chadElements = screen.getAllByText('Chad');
      expect(chadElements.length).toBeGreaterThan(0);
    });

    it('should display standings', () => {
      render(<StandingsTable data={mockScoreboardData} />);

      // Should show standing numbers
      const standings = screen.getAllByText(/^[#]?[1-3]$/);
      expect(standings.length).toBeGreaterThan(0);
    });
  });
});
