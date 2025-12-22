import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import YearPage from '@/app/[year]/page';
import { getScoreboardData, getYearData, getAllYears } from '@/lib/data';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width: number; height: number; priority?: boolean; className?: string }) => {
    return <img src={props.src} alt={props.alt} className={props.className} />;
  },
}));

describe('Integration Tests', () => {
  describe('Home Page Integration', () => {
    it('should load and display all scoreboard data', () => {
      render(<HomePage />);

      // Check main title using getAllByText since it appears in nav and h1
      const titles = screen.getAllByText('Davis Family Challenge');
      expect(titles.length).toBeGreaterThan(0);

      // Check scoreboard section
      expect(screen.getByText('Lifetime Records')).toBeInTheDocument();

      // Check that participant names are displayed
      const scoreboardData = getScoreboardData();
      scoreboardData.entries.forEach(entry => {
        const elements = screen.getAllByText(entry.participant);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('should display standings table with correct data', () => {
      render(<HomePage />);

      // Check standings section exists
      expect(screen.getByText('Overall Standings')).toBeInTheDocument();

      // Verify standings data is present
      const scoreboardData = getScoreboardData();
      const topParticipant = scoreboardData.entries.find(e => e.standing === 1);
      if (topParticipant) {
        expect(screen.getAllByText(topParticipant.participant).length).toBeGreaterThan(0);
      }
    });

    it('should render year summary cards for recent years', () => {
      render(<HomePage />);

      // Check that yearly results section exists
      expect(screen.getByText('Yearly Results')).toBeInTheDocument();

      // Check for recent years using getAllByText since years appear multiple times
      const year2024 = screen.getAllByText('2024');
      const year2023 = screen.getAllByText('2023');
      const year2022 = screen.getAllByText('2022');

      expect(year2024.length).toBeGreaterThan(0);
      expect(year2023.length).toBeGreaterThan(0);
      expect(year2022.length).toBeGreaterThan(0);
    });

    it('should display hero image with correct attributes', () => {
      const { container } = render(<HomePage />);

      const image = container.querySelector('img[alt="Davis Family Challenge Plaque"]');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/plaque.jpg');
    });

    it('should have links to year detail pages', () => {
      const { container } = render(<HomePage />);

      // Check for year links
      const yearLinks = container.querySelectorAll('a[href*="/2024/"]');
      expect(yearLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Year Detail Page Integration', () => {
    it('should display year data for 2024', async () => {
      const params = Promise.resolve({ year: '2024' });
      const page = await YearPage({ params });
      render(page);

      const yearData = getYearData(2024);

      // Check year title
      expect(screen.getByText(yearData.ordinalName)).toBeInTheDocument();

      // Check team scheme and challenge theme
      expect(screen.getByText(/Team Scheme/i)).toBeInTheDocument();
      expect(screen.getByText(/Challenge Theme/i)).toBeInTheDocument();

      // Check winners
      expect(screen.getByText(/Winners/i)).toBeInTheDocument();
    });

    it('should display games section for a year', async () => {
      const params = Promise.resolve({ year: '2023' });
      const page = await YearPage({ params });
      render(page);

      // Check that games section exists
      expect(screen.getByText('Games')).toBeInTheDocument();
    });

    it('should display team rosters for a year', async () => {
      const params = Promise.resolve({ year: '2022' });
      const page = await YearPage({ params });
      render(page);

      const yearData = getYearData(2022);

      // Check for team names
      yearData.teams.forEach(team => {
        expect(screen.getByText(team.name)).toBeInTheDocument();

        // Check for team members
        team.members.forEach(member => {
          expect(screen.getByText(member)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Data Integrity', () => {
    it('should have valid scoreboard data structure', () => {
      const scoreboardData = getScoreboardData();

      expect(scoreboardData).toBeDefined();
      expect(scoreboardData.entries).toBeInstanceOf(Array);
      expect(scoreboardData.entries.length).toBeGreaterThan(0);

      scoreboardData.entries.forEach(entry => {
        expect(entry.participant).toBeDefined();
        expect(entry.record.wins).toBeGreaterThanOrEqual(0);
        expect(entry.record.losses).toBeGreaterThanOrEqual(0);
        expect(entry.record.winningPercentage).toBeGreaterThanOrEqual(0);
        expect(entry.record.winningPercentage).toBeLessThanOrEqual(1);
        expect(entry.standing).toBeGreaterThan(0);
      });
    });

    it('should have valid year data for all years', () => {
      const years = getAllYears();

      years.forEach(year => {
        const yearData = getYearData(year as any);

        expect(yearData).toBeDefined();
        expect(yearData.year).toBe(year);
        expect(yearData.ordinalName).toBeDefined();
        expect(yearData.teamScheme).toBeDefined();
        expect(yearData.challengeTheme).toBeDefined();
        expect(yearData.winners).toBeDefined();
        expect(yearData.games).toBeInstanceOf(Array);
        expect(yearData.teams).toBeInstanceOf(Array);

        // Some years might have empty games or teams arrays in test data
        // Just verify structure exists
      });
    });

    it('should calculate winning percentages correctly', () => {
      const scoreboardData = getScoreboardData();

      scoreboardData.entries.forEach(entry => {
        const { wins, losses, winningPercentage } = entry.record;
        const totalGames = wins + losses;

        if (totalGames > 0) {
          const expectedPercentage = wins / totalGames;
          // Allow for small rounding differences
          expect(Math.abs(winningPercentage - expectedPercentage)).toBeLessThan(0.001);
        }
      });
    });
  });
});
