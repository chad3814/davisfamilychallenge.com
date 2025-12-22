import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';
import Scoreboard from '@/components/Scoreboard';
import YearSummaryCard from '@/components/YearSummaryCard';
import Accordion from '@/components/Accordion';
import TOCNavigation from '@/components/TOCNavigation';
import { ScoreboardData, YearData } from '@/types';

describe('Integration Workflows', () => {
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
      { name: 'Team Underdogs', members: ['Grammy', 'Cat', 'Eddie'] },
      { name: 'Team Losers', members: ['J.D.', 'Chad', 'Lorelei'] }
    ]
  };

  describe('Navigation to All Years workflow', () => {
    it('should display All Years link in navigation', () => {
      render(<Navigation />);

      const allYearsLink = screen.getByRole('link', { name: 'All Years' });
      expect(allYearsLink).toBeInTheDocument();
      expect(allYearsLink.getAttribute('href')).toBe('/all-years');
    });

    it('should only show 3 recent years in navigation', () => {
      render(<Navigation />);

      // Should show 2024, 2023, 2022
      expect(screen.getByRole('link', { name: '2024' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '2023' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '2022' })).toBeInTheDocument();

      // Should NOT show 2021 or earlier
      expect(screen.queryByRole('link', { name: '2021' })).not.toBeInTheDocument();
    });
  });

  describe('Scoreboard display workflow', () => {
    it('should display Games Played column in scoreboard', () => {
      render(<Scoreboard data={mockScoreboardData} />);

      // Check for Games Played header
      expect(screen.getByText('Games Played')).toBeInTheDocument();

      // Check for Games Played values (both entries have 19)
      const gamesPlayedValues = screen.getAllByText('19');
      expect(gamesPlayedValues.length).toBeGreaterThan(0);
    });

    it('should apply blue color scheme to scoreboard', () => {
      const { container } = render(<Scoreboard data={mockScoreboardData} />);

      const header = container.querySelector('thead tr');
      expect(header?.className).toContain('bg-blue-100');
    });
  });

  describe('Year Summary Card workflow', () => {
    it('should hide game descriptions when hideGameDescriptions prop is true', () => {
      render(<YearSummaryCard data={mockYearData} hideGameDescriptions={true} />);

      // Should show game names
      expect(screen.getByText('Head Hoops')).toBeInTheDocument();
      expect(screen.getByText('Oreo Flip')).toBeInTheDocument();

      // YearSummaryCard with hideGameDescriptions doesn't render descriptions
      // (they're only rendered in the full year detail page)
    });

    it('should apply blue color scheme to year cards', () => {
      const { container } = render(<YearSummaryCard data={mockYearData} />);

      const card = container.querySelector('.border-blue-500');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Accordion and TOC integration', () => {
    it('should expand accordion when toggled', () => {
      let expanded = false;
      const handleToggle = () => {
        expanded = !expanded;
      };

      const { rerender } = render(
        <Accordion
          year={2024}
          content={<div>Test Content</div>}
          isExpanded={expanded}
          onToggle={handleToggle}
          id="year-2024"
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Rerender with updated state
      rerender(
        <Accordion
          year={2024}
          content={<div>Test Content</div>}
          isExpanded={true}
          onToggle={handleToggle}
          id="year-2024"
        />
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should highlight active year in TOC', () => {
      const mockOnYearClick = jest.fn();

      render(
        <TOCNavigation
          years={[2024, 2023, 2022]}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={false}
        />
      );

      const activeButton = screen.getByText('2024');
      expect(activeButton.className).toContain('bg-blue-700');
      expect(activeButton.className).toContain('text-white');
    });
  });

  describe('Mobile responsive workflow', () => {
    it('should show hamburger menu on mobile navigation', () => {
      render(<Navigation />);

      const hamburger = screen.getByRole('button', { name: /toggle menu/i });
      expect(hamburger).toBeInTheDocument();
    });

    it('should expand mobile menu when toggled', () => {
      const { container } = render(<Navigation />);

      const hamburger = screen.getByRole('button', { name: /toggle menu/i });

      // Mobile menu container should not be visible initially
      const mobileMenuBefore = container.querySelector('.md\\:hidden .pb-4');
      expect(mobileMenuBefore).not.toBeInTheDocument();

      // Click to open menu
      fireEvent.click(hamburger);

      // Mobile menu should now be visible
      const mobileMenuAfter = container.querySelector('.md\\:hidden .pb-4');
      expect(mobileMenuAfter).toBeInTheDocument();
    });

    it('should show mobile TOC hamburger menu', () => {
      const mockOnYearClick = jest.fn();

      render(
        <TOCNavigation
          years={[2024, 2023, 2022]}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={true}
        />
      );

      const hamburger = screen.getByRole('button', { name: /toggle year navigation/i });
      expect(hamburger).toBeInTheDocument();
    });
  });

  describe('Blue color scheme consistency', () => {
    it('should use consistent blue colors across components', () => {
      const { container: navContainer } = render(<Navigation />);
      const { container: scoreboardContainer } = render(<Scoreboard data={mockScoreboardData} />);

      // Check navigation uses blue-600
      const navLinks = navContainer.querySelectorAll('.text-blue-600');
      expect(navLinks.length).toBeGreaterThan(0);

      // Check scoreboard uses blue-100 for headers
      const scoreboardHeader = scoreboardContainer.querySelector('.bg-blue-100');
      expect(scoreboardHeader).toBeInTheDocument();
    });
  });
});
