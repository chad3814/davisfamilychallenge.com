import { render, screen } from '@testing-library/react';
import Scoreboard from '@/components/Scoreboard';
import YearSummaryCard from '@/components/YearSummaryCard';
import { ScoreboardData, YearData } from '@/types';

/**
 * Tests for responsive behavior across mobile and desktop viewports
 */

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

describe('Responsive Behavior', () => {
  const mockScoreboardData: ScoreboardData = {
    entries: [
      {
        participant: 'J.D.',
        record: { wins: 12, losses: 7, winningPercentage: 0.632 },
        standing: 1,
        gamesPlayed: 19
      },
      {
        participant: 'Cat',
        record: { wins: 10, losses: 9, winningPercentage: 0.526 },
        standing: 2,
        gamesPlayed: 19
      }
    ],
    lastUpdated: '2024-12-22'
  };

  const mockYearData: YearData = {
    year: 2024,
    ordinalName: 'Nineteenth Annual Davis Family Challenge',
    teamScheme: 'Computer Generated Teams',
    challengeTheme: 'Picked from a container',
    winners: 'Losers',
    games: [
      { name: 'Head Hoops', description: 'Basketball game' },
      { name: 'Oreo Flip', description: 'Cookie flipping game' }
    ],
    teams: [
      { name: 'Team Underdogs', members: ['Grammy', 'Cat', 'Eddie', 'Shep'] },
      { name: 'Team Losers', members: ['J.D.', 'Chad', 'Lorelei', 'Steph'] }
    ]
  };

  describe('Scoreboard component', () => {
    it('should render both desktop table and mobile cards', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Desktop elements (hidden on mobile via Tailwind classes)
      const tables = document.querySelectorAll('table');
      expect(tables.length).toBeGreaterThan(0);

      // Mobile elements (hidden on desktop via Tailwind classes)
      // Both mobile and desktop versions should be in the DOM
      expect(screen.getAllByText('J.D.').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cat').length).toBeGreaterThan(0);
    });

    it('should display desktop table with correct structure', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Check for table headers
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Record')).toBeInTheDocument();
      expect(screen.getByText('Winning Percentage')).toBeInTheDocument();
      expect(screen.getByText('Games Played')).toBeInTheDocument();
    });

    it('should display mobile cards with correct layout', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Mobile view should show Games: label
      const mobileGamesLabels = screen.getAllByText(/Games:/);
      expect(mobileGamesLabels.length).toBeGreaterThan(0);
    });
  });

  describe('YearSummaryCard component', () => {
    it('should render all sections', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check main sections exist
      expect(screen.getByText('Team Scheme:')).toBeInTheDocument();
      expect(screen.getByText('Challenge Theme:')).toBeInTheDocument();
      expect(screen.getByText('Winners:')).toBeInTheDocument();
      expect(screen.getByText('Games:')).toBeInTheDocument();
      expect(screen.getByText('Teams:')).toBeInTheDocument();
    });

    it('should render team roster table', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check team names in table
      expect(screen.getByText('Team Underdogs')).toBeInTheDocument();
      expect(screen.getByText('Team Losers')).toBeInTheDocument();

      // Check team members
      expect(screen.getByText('Grammy')).toBeInTheDocument();
      expect(screen.getByText('Lorelei')).toBeInTheDocument();
    });

    it('should display games list', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check games appear in list
      expect(screen.getByText('Head Hoops')).toBeInTheDocument();
      expect(screen.getByText('Oreo Flip')).toBeInTheDocument();
    });

    it('should render year as link', () => {
      render(<YearSummaryCard data={mockYearData} />);

      const yearLink = screen.getByRole('link', { name: '2024' });
      expect(yearLink).toBeInTheDocument();
      // Next.js Link normalizes URLs, so accept both with and without trailing slash
      const href = yearLink.getAttribute('href');
      expect(href === '/2024' || href === '/2024/').toBe(true);
    });
  });

  describe('Responsive classes', () => {
    it('should apply Tailwind responsive classes to scoreboard table', () => {
      const { container } = render(<Scoreboard data={mockScoreboardData} />);

      // Desktop table should have hidden on mobile class
      const desktopTable = container.querySelector('.hidden.md\\:block');
      expect(desktopTable).toBeInTheDocument();

      // Mobile cards should have hidden on desktop class
      const mobileCards = container.querySelector('.md\\:hidden');
      expect(mobileCards).toBeInTheDocument();
    });

    it('should apply grid classes for responsive layout', () => {
      const { container } = render(<YearSummaryCard data={mockYearData} />);

      // Check for responsive grid classes
      const gridElements = container.querySelectorAll('[class*="md:grid-cols"]');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });
});
