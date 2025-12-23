import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import YearPage from '@/app/[year]/page';
import { getScoreboardData } from '@/lib/data';

describe('Integration Tests', () => {
  describe('HomePage Integration', () => {
    it('should render the main title', async () => {
      const element = await HomePage();
      render(element);
      const title = screen.getByRole('heading', { name: 'Davis Family Challenge', level: 1 });
      expect(title).toBeInTheDocument();
    });

    it('should display scoreboard with lifetime records', async () => {
      const element = await HomePage();
      render(element);

      // Check scoreboard section exists
      expect(screen.getByText('Lifetime Records')).toBeInTheDocument();

      // Verify scoreboard data is present
      const scoreboardData = getScoreboardData();
      const topParticipant = scoreboardData.entries.find(e => e.standing === 1);
      if (topParticipant) {
        expect(screen.getAllByText(topParticipant.participant).length).toBeGreaterThan(0);
      }
    });

    it('should display Games Played column in scoreboard', async () => {
      const element = await HomePage();
      render(element);

      // Check for Games Played header (consolidated scoreboard)
      expect(screen.getByText('Games Played')).toBeInTheDocument();
    });

    it('should render year summary cards for only 3 recent years', async () => {
      const element = await HomePage();
      render(element);

      // Check that yearly results section exists
      expect(screen.getByText('Yearly Results')).toBeInTheDocument();

      // Check for recent years using getAllByText since years appear multiple times
      const year2024 = screen.getAllByText('2024');
      const year2023 = screen.getAllByText('2023');
      const year2022 = screen.getAllByText('2022');

      expect(year2024.length).toBeGreaterThan(0);
      expect(year2023.length).toBeGreaterThan(0);
      expect(year2022.length).toBeGreaterThan(0);

      // Should NOT show older years like 2021
      expect(screen.queryByText('2021')).not.toBeInTheDocument();
    });

    it('should display hero image with correct attributes', async () => {
      const element = await HomePage();
      const { container } = render(element);

      const images = container.querySelectorAll('img');
      const plaqueImage = Array.from(images).find(img =>
        img.getAttribute('alt') === 'Davis Family Challenge Plaque'
      );
      expect(plaqueImage).toBeTruthy();
      expect(plaqueImage?.getAttribute('src')).toContain('plaque.jpg');
    });

    it('should have links to year detail pages', async () => {
      const element = await HomePage();
      const { container } = render(element);

      // Check for year links
      const yearLinks = container.querySelectorAll('a[href*="/2024"]');
      expect(yearLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Year Detail Page Integration', () => {
    it('should display year data for 2024', async () => {
      const params = Promise.resolve({ year: '2024' });
      const element = await YearPage({ params });

      const { container } = render(element);

      // Check for year title (contains "Annual Davis Family Challenge")
      const heading = container.querySelector('h1');
      expect(heading?.textContent).toContain('Annual Davis Family Challenge');
    });

    it('should display team roster', async () => {
      const params = Promise.resolve({ year: '2024' });
      const element = await YearPage({ params });

      const { container } = render(element);

      // Check for Teams heading
      expect(container.textContent).toContain('Teams');
    });

    it('should display games section', async () => {
      const params = Promise.resolve({ year: '2024' });
      const element = await YearPage({ params });

      const { container } = render(element);

      // Check for Games heading
      expect(container.textContent).toContain('Games');
    });
  });

  describe('Component Integration', () => {
    it('should display scoreboard and year summaries together on homepage', async () => {
      const element = await HomePage();
      render(element);

      // Both sections should be present
      expect(screen.getByText('Lifetime Records')).toBeInTheDocument();
      expect(screen.getByText('Yearly Results')).toBeInTheDocument();
    });

    it('should apply blue color scheme consistently', async () => {
      const element = await HomePage();
      const { container } = render(element);

      // Check for blue color classes
      const blueElements = container.querySelectorAll('[class*="blue"]');
      expect(blueElements.length).toBeGreaterThan(0);
    });
  });
});
