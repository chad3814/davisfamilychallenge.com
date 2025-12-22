import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '@/components/Accordion';
import TOCNavigation from '@/components/TOCNavigation';

describe('All Years Page Components', () => {
  describe('Accordion', () => {
    const mockContent = <div>Test Year Content</div>;

    it('should expand and collapse on toggle', () => {
      const mockToggle = jest.fn();

      const { rerender } = render(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={false}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      // Content should not be visible when collapsed
      expect(screen.queryByText('Test Year Content')).not.toBeInTheDocument();

      // Click to expand
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockToggle).toHaveBeenCalled();

      // Rerender with expanded state
      rerender(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={true}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      // Content should now be visible
      expect(screen.getByText('Test Year Content')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes', () => {
      const mockToggle = jest.fn();

      render(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={false}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', 'year-2024-content');
    });

    it('should support keyboard navigation (Enter and Space)', () => {
      const mockToggle = jest.fn();

      render(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={false}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      const button = screen.getByRole('button');

      // Test Enter key
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(mockToggle).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(button, { key: ' ' });
      expect(mockToggle).toHaveBeenCalledTimes(2);
    });

    it('should rotate chevron icon when expanded', () => {
      const mockToggle = jest.fn();

      const { rerender } = render(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={false}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      const svgClassName = svg?.className.baseVal || svg?.getAttribute('class') || '';
      expect(svgClassName).not.toContain('rotate-180');

      // Rerender as expanded
      rerender(
        <Accordion
          year={2024}
          content={mockContent}
          isExpanded={true}
          onToggle={mockToggle}
          id="year-2024"
        />
      );

      const svgExpanded = button.querySelector('svg');
      const svgExpandedClassName = svgExpanded?.className.baseVal || svgExpanded?.getAttribute('class') || '';
      expect(svgExpandedClassName).toContain('rotate-180');
    });
  });

  describe('TOCNavigation', () => {
    const mockYears = [2024, 2023, 2022, 2021, 2020];
    const mockOnYearClick = jest.fn();

    beforeEach(() => {
      mockOnYearClick.mockClear();
    });

    it('should render all year links in desktop mode', () => {
      render(
        <TOCNavigation
          years={mockYears}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={false}
        />
      );

      mockYears.forEach((year) => {
        expect(screen.getByText(year.toString())).toBeInTheDocument();
      });
    });

    it('should highlight active year', () => {
      render(
        <TOCNavigation
          years={mockYears}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={false}
        />
      );

      const activeButton = screen.getByText('2024');
      expect(activeButton.className).toContain('bg-blue-700');
      expect(activeButton.className).toContain('text-white');
    });

    it('should call onYearClick when year is clicked', () => {
      render(
        <TOCNavigation
          years={mockYears}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={false}
        />
      );

      const year2023Button = screen.getByText('2023');
      fireEvent.click(year2023Button);

      expect(mockOnYearClick).toHaveBeenCalledWith(2023);
    });

    it('should render hamburger menu in mobile mode', () => {
      render(
        <TOCNavigation
          years={mockYears}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={true}
        />
      );

      const toggleButton = screen.getByRole('button', { name: /toggle year navigation/i });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.className).toContain('min-h-[44px]');
    });

    it('should expand and collapse mobile menu', () => {
      render(
        <TOCNavigation
          years={mockYears}
          activeYear={2024}
          onYearClick={mockOnYearClick}
          isMobile={true}
        />
      );

      // Menu should be collapsed initially
      expect(screen.queryByText('2020')).not.toBeInTheDocument();

      // Click to open menu
      const toggleButton = screen.getByRole('button', { name: /toggle year navigation/i });
      fireEvent.click(toggleButton);

      // Years should now be visible
      expect(screen.getByText('2020')).toBeInTheDocument();
    });
  });
});
