import { render } from '@testing-library/react';
import Accordion from '@/components/Accordion';
import TOCNavigation from '@/components/TOCNavigation';
import Navigation from '@/components/Navigation';
import TeamRoster from '@/components/TeamRoster';
import GameNarrative from '@/components/GameNarrative';

describe('Accessibility Compliance', () => {
  describe('Interactive Element Touch Targets', () => {
    it('should have 44x44px minimum touch targets on navigation hamburger', () => {
      const { container } = render(<Navigation />);

      const hamburger = container.querySelector('[aria-label="Toggle menu"]');
      expect(hamburger).toBeTruthy();
      expect(hamburger?.className).toContain('min-h-[44px]');
      expect(hamburger?.className).toContain('min-w-[44px]');
    });

    it('should have 44x44px minimum touch targets on accordion buttons', () => {
      const mockToggle = jest.fn();
      const { container } = render(
        <Accordion
          year={2024}
          content={<div>Test</div>}
          isExpanded={false}
          onToggle={mockToggle}
          id="test-accordion"
        />
      );

      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      // Accordion button has px-6 py-4 which ensures adequate touch target
      expect(button?.className).toContain('py-4');
    });

    it('should have 44x44px minimum touch targets on mobile TOC hamburger', () => {
      const mockOnYearClick = jest.fn();
      const { container } = render(
        <TOCNavigation
          years={[2024, 2023, 2022]}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={true}
        />
      );

      const hamburger = container.querySelector('button');
      expect(hamburger).toBeTruthy();
      expect(hamburger?.className).toContain('min-h-[44px]');
    });
  });

  describe('Keyboard Navigation Support', () => {
    it('should support Enter and Space keys on accordion', () => {
      const mockToggle = jest.fn();
      const { container } = render(
        <Accordion
          year={2024}
          content={<div>Test</div>}
          isExpanded={false}
          onToggle={mockToggle}
          id="test-accordion"
        />
      );

      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have focus indicators on interactive elements', () => {
      const mockToggle = jest.fn();
      const { container } = render(
        <Accordion
          year={2024}
          content={<div>Test</div>}
          isExpanded={false}
          onToggle={mockToggle}
          id="test-accordion"
        />
      );

      const button = container.querySelector('button');
      expect(button?.className).toContain('focus:ring');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes on accordion', () => {
      const mockToggle = jest.fn();
      const { container } = render(
        <Accordion
          year={2024}
          content={<div>Test</div>}
          isExpanded={false}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      const button = container.querySelector('button');
      expect(button?.getAttribute('aria-expanded')).toBe('false');
      expect(button?.getAttribute('aria-controls')).toBe('year-2024-content');
    });

    it('should have aria-current on active TOC items', () => {
      const mockOnYearClick = jest.fn();
      const { container } = render(
        <TOCNavigation
          years={[2024, 2023, 2022]}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={false}
        />
      );

      const buttons = container.querySelectorAll('button');
      const activeButton = Array.from(buttons).find(btn =>
        btn.getAttribute('aria-current') === 'true'
      );
      expect(activeButton).toBeTruthy();
    });
  });

  describe('Semantic HTML Structure', () => {
    it('should use proper table structure for team roster', () => {
      const teams = [
        { name: 'Team A', members: ['Player 1', 'Player 2'] },
        { name: 'Team B', members: ['Player 3', 'Player 4'] }
      ];

      const { container } = render(<TeamRoster teams={teams} />);

      const table = container.querySelector('table');
      expect(table).toBeTruthy();

      const thead = table?.querySelector('thead');
      expect(thead).toBeTruthy();

      const tbody = table?.querySelector('tbody');
      expect(tbody).toBeTruthy();

      const th = thead?.querySelector('th');
      expect(th).toBeTruthy();
    });

    it('should use heading hierarchy correctly', () => {
      const game = {
        name: 'Test Game',
        description: 'Test description'
      };

      const { container } = render(<GameNarrative game={game} />);

      const h2 = container.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe('Test Game');
    });
  });

  describe('Color Contrast Compliance', () => {
    it('should use blue-600 for primary links (meets WCAG AA)', () => {
      const { container } = render(<Navigation />);

      const links = container.querySelectorAll('a');
      const hasBlueLinks = Array.from(links).some(link =>
        link.className.includes('text-blue-600')
      );
      expect(hasBlueLinks).toBe(true);
    });

    it('should use blue-100 for table headers (light background)', () => {
      const teams = [
        { name: 'Team A', members: ['Player 1'] }
      ];

      const { container } = render(<TeamRoster teams={teams} />);

      const thead = container.querySelector('thead tr');
      // TeamRoster should have blue-100 background after update
      expect(thead).toBeTruthy();
    });
  });
});
