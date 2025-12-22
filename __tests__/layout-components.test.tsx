import { render, screen } from '@testing-library/react';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

describe('Layout Components', () => {
  describe('Layout', () => {
    it('should render children', () => {
      render(
        <Layout>
          <div data-testid="child-content">Test Content</div>
        </Layout>
      );
      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('should render navigation and footer', () => {
      render(
        <Layout>
          <div>Test</div>
        </Layout>
      );
      // Navigation should have home link(s) - both mobile and desktop
      const homeLinks = screen.getAllByText('Davis Family Challenge');
      expect(homeLinks.length).toBeGreaterThan(0);
      // Footer should exist
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should render only last 3 years plus All Years link', () => {
      render(<Navigation />);

      // Check that 2024, 2023, 2022 links exist
      const link2024 = screen.getByRole('link', { name: '2024' });
      expect(link2024).toBeInTheDocument();
      expect(link2024).toHaveAttribute('href');
      expect(link2024.getAttribute('href')).toContain('2024');

      const link2023 = screen.getByRole('link', { name: '2023' });
      expect(link2023).toBeInTheDocument();

      const link2022 = screen.getByRole('link', { name: '2022' });
      expect(link2022).toBeInTheDocument();

      // Check All Years link
      const allYearsLink = screen.getByRole('link', { name: 'All Years' });
      expect(allYearsLink).toBeInTheDocument();
      expect(allYearsLink).toHaveAttribute('href', '/all-years');

      // Check home link
      const homeLinks = screen.getAllByRole('link', { name: /Davis Family Challenge/i });
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0]).toHaveAttribute('href', '/');
    });

    it('should NOT render year 2021 or older in navigation', () => {
      render(<Navigation />);

      // Query for 2021 link - should not exist
      const link2021 = screen.queryByRole('link', { name: '2021' });
      expect(link2021).not.toBeInTheDocument();

      // Query for 2006 link - should not exist
      const link2006 = screen.queryByRole('link', { name: '2006' });
      expect(link2006).not.toBeInTheDocument();
    });

    it('should apply blue color scheme to links', () => {
      render(<Navigation />);

      // Check that year links have blue color classes
      const link2024 = screen.getByRole('link', { name: '2024' });
      expect(link2024.className).toContain('text-blue-600');
      expect(link2024.className).toContain('hover:text-blue-800');
    });

    it('should have accessible touch targets on mobile', () => {
      render(<Navigation />);

      // Check hamburger button has min-h-[44px]
      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(toggleButton.className).toContain('min-h-[44px]');
      expect(toggleButton.className).toContain('min-w-[44px]');
    });
  });

  describe('Footer', () => {
    it('should render correctly', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });
});
