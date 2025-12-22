import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from '@/components/Scoreboard';
import Navigation from '@/components/Navigation';
import YearSummaryCard from '@/components/YearSummaryCard';
import { ScoreboardData, YearData } from '@/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock data loading
jest.mock('@/lib/data', () => ({
  getYearsList: () => [2024, 2023, 2022],
}));

describe('Responsive Behavior', () => {
  const mockScoreboardData: ScoreboardData = {
    entries: [
      {
        participant: 'J.D.',
        record: { wins: 12, losses: 7, winningPercentage: 0.632 },
        standing: 1
      },
      {
        participant: 'Cat',
        record: { wins: 10, losses: 9, winningPercentage: 0.526 },
        standing: 2
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
    it('should have both desktop table and mobile card layouts', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Desktop table should exist (hidden on mobile)
      const tables = document.querySelectorAll('table');
      expect(tables.length).toBeGreaterThan(0);

      // Mobile cards should exist
      const mobileCards = document.querySelectorAll('.md\\:hidden');
      expect(mobileCards.length).toBeGreaterThan(0);
    });

    it('should render all participant data in both layouts', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Check that participant names appear
      const jdElements = screen.getAllByText('J.D.');
      expect(jdElements.length).toBeGreaterThanOrEqual(2); // Once in desktop, once in mobile

      const catElements = screen.getAllByText('Cat');
      expect(catElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Navigation component', () => {
    it('should have hamburger menu button for mobile', () => {
      render(<Navigation />);

      // Look for the hamburger button (aria-label)
      const menuButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should render year links', () => {
      render(<Navigation />);

      // Check for year links
      const year2024Links = screen.getAllByText('2024');
      expect(year2024Links.length).toBeGreaterThan(0);
    });

    it('should toggle mobile menu and display year links in grid', () => {
      const { container } = render(<Navigation />);

      // Initially, grid should not be visible
      let gridContainer = container.querySelector('.grid');
      expect(gridContainer).not.toBeInTheDocument();

      // Click the hamburger menu to open it
      const menuButton = screen.getByRole('button', { name: /toggle menu/i });
      fireEvent.click(menuButton);

      // After clicking, grid container should be visible
      gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();

      // Verify grid has year links
      const year2022Link = screen.getAllByText('2022');
      expect(year2022Link.length).toBeGreaterThan(0);
    });
  });

  describe('YearSummaryCard component', () => {
    it('should use responsive grid layout for metadata', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check for responsive grid classes
      const gridElements = document.querySelectorAll('.grid-cols-1');
      expect(gridElements.length).toBeGreaterThan(0);
    });

    it('should have overflow scroll for team rosters', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check for overflow-x-auto class on team roster table
      const overflowContainer = document.querySelector('.overflow-x-auto');
      expect(overflowContainer).toBeInTheDocument();
    });

    it('should render all teams and games', () => {
      render(<YearSummaryCard data={mockYearData} />);

      // Check games are listed
      expect(screen.getByText('Head Hoops')).toBeInTheDocument();
      expect(screen.getByText('Oreo Flip')).toBeInTheDocument();

      // Check teams are listed
      expect(screen.getByText('Team Underdogs')).toBeInTheDocument();
      expect(screen.getByText('Team Losers')).toBeInTheDocument();
    });
  });

  describe('Responsive breakpoint classes', () => {
    it('Scoreboard should use md: breakpoint for table/card toggle', () => {
      const { container } = render(<Scoreboard data={mockScoreboardData} />);

      // Check for md:block (desktop table) and md:hidden (mobile cards)
      const desktopTable = container.querySelector('.md\\:block');
      const mobileCards = container.querySelector('.md\\:hidden');

      expect(desktopTable).toBeInTheDocument();
      expect(mobileCards).toBeInTheDocument();
    });

    it('Navigation should have separate mobile and desktop layouts', () => {
      const { container } = render(<Navigation />);

      // Check for desktop navigation (hidden md:flex)
      const desktopNav = container.querySelector('.md\\:flex');
      expect(desktopNav).toBeInTheDocument();

      // Check for mobile-only elements (md:hidden)
      const mobileNav = container.querySelector('.md\\:hidden');
      expect(mobileNav).toBeInTheDocument();
    });
  });
});
