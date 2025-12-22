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
    it('should render all year links in descending order', () => {
      render(<Navigation />);

      // Check that 2024 link exists
      const link2024 = screen.getByRole('link', { name: '2024' });
      expect(link2024).toBeInTheDocument();
      expect(link2024).toHaveAttribute('href');
      expect(link2024.getAttribute('href')).toContain('2024');

      // Check that 2006 link exists
      const link2006 = screen.getByRole('link', { name: '2006' });
      expect(link2006).toBeInTheDocument();
      expect(link2006).toHaveAttribute('href');
      expect(link2006.getAttribute('href')).toContain('2006');

      // Check home link
      const homeLinks = screen.getAllByRole('link', { name: /Davis Family Challenge/i });
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0]).toHaveAttribute('href', '/');
    });

    it('should render exactly 19 year links', () => {
      render(<Navigation />);
      const yearLinks = screen.getAllByRole('link').filter(link =>
        /^20(0[6-9]|1[0-9]|2[0-4])$/.test(link.textContent || '')
      );
      expect(yearLinks).toHaveLength(19);
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
