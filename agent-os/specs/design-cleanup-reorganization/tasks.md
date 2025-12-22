# Task Breakdown: Design Cleanup and Reorganization

## Overview
Total Task Groups: 6
Estimated Total Tasks: ~40 individual tasks

## Task List

### Foundation Layer

#### Task Group 1: Type System and Utility Functions
**Dependencies:** None

- [x] 1.0 Complete type system and utility updates
  - [x] 1.1 Write 2-8 focused tests for utility functions
    - Test calculateGamesPlayed with various win/loss combinations
    - Test edge cases (zero wins, zero losses, equal records)
    - Verify calculations match expected totals
  - [x] 1.2 Update ScoreboardEntry interface in types/index.ts
    - Add gamesPlayed: number field to ScoreboardEntry interface
    - Ensure interface extends existing structure without breaking changes
    - Verify TypeScript compilation passes
  - [x] 1.3 Create AccordionSection component interface
    - Define props for year number, content, expanded state, and callbacks
    - Include semantic HTML requirements for a11y
    - Add ARIA attribute type definitions
  - [x] 1.4 Create TOCNavigation component interface
    - Define props for year list, active year, scroll handler, and mobile state
    - Include sticky positioning requirements
    - Add keyboard navigation event types
  - [x] 1.5 Add calculateGamesPlayed utility to lib/utils.ts
    - Implement function: (wins: number, losses: number) => number
    - Add JSDoc documentation
    - Return wins + losses calculation
  - [x] 1.6 Ensure type system tests pass
    - Run ONLY the 2-8 tests written in 1.1
    - Verify TypeScript compilation with new interfaces
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 1.1 pass
- ScoreboardEntry interface includes gamesPlayed field
- New component interfaces compile without TypeScript errors
- calculateGamesPlayed utility function works correctly

### Component Updates

#### Task Group 2: Scoreboard Consolidation
**Dependencies:** Task Group 1

- [x] 2.0 Complete scoreboard consolidation
  - [x] 2.1 Write 2-8 focused tests for Scoreboard component
    - Test Games Played column rendering in desktop table view
    - Test Games Played display in mobile card layout
    - Test scoreboard sorting by winning percentage
    - Verify calculateGamesPlayed integration
  - [x] 2.2 Update Scoreboard component (components/Scoreboard.tsx)
    - Add Games Played column to desktop table layout (after Winning Percentage)
    - Display format: plain number (e.g., "19")
    - Update table header with "Games Played" label
    - Apply blue-100 background to header row
  - [x] 2.3 Add Games Played to mobile card layout
    - Include Games Played field in card view
    - Format: "Games: 19"
    - Maintain responsive grid pattern
    - Apply blue-500 ring for card borders
  - [x] 2.4 Calculate Games Played for each entry
    - Use calculateGamesPlayed(wins, losses) utility
    - Update scoreboard data mapping
    - Verify calculation accuracy against sample data
  - [x] 2.5 Remove StandingsTable component
    - Delete StandingsTable component file (if separate)
    - Remove imports and references from homepage
    - Verify no broken references remain
  - [x] 2.6 Apply blue color scheme to scoreboard
    - Header row: bg-blue-100
    - Hover state: bg-blue-50
    - Borders: border-gray-300
    - Mobile cards: ring-blue-500
  - [x] 2.7 Ensure scoreboard component tests pass
    - Run ONLY the 2-8 tests written in 2.1
    - Verify Games Played column displays correctly
    - Verify responsive layouts work on desktop and mobile
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 2.1 pass
- Scoreboard displays single unified table with Games Played column
- Desktop table and mobile cards both show Games Played
- Blue color scheme applied consistently
- No StandingsTable references remain

#### Task Group 3: Navigation Simplification
**Dependencies:** None (can run parallel with Task Group 2)

- [x] 3.0 Complete navigation updates
  - [x] 3.1 Write 2-8 focused tests for Navigation component
    - Test year link filtering (shows only 2024, 2023, 2022)
    - Test "All Years" link presence
    - Test mobile hamburger menu behavior
    - Verify blue color scheme on links
  - [x] 3.2 Update Navigation component (components/Navigation.tsx)
    - Filter year links to show only last 3 years (2024, 2023, 2022)
    - Add "All Years" link pointing to /all-years route
    - Maintain existing sticky header behavior (sticky top-0 z-50)
    - Keep logo as home link functionality
  - [x] 3.3 Apply blue color scheme to navigation
    - Default link color: text-blue-600
    - Hover state: text-blue-800
    - Active state styling with blue accent
    - Maintain contrast for WCAG AA compliance
  - [x] 3.4 Update mobile hamburger menu
    - Reduce year list to show only 2024, 2023, 2022
    - Add "All Years" link to mobile menu
    - Maintain existing menu toggle pattern
    - Ensure touch targets meet 44x44px minimum
  - [x] 3.5 Ensure navigation component tests pass
    - Run ONLY the 2-8 tests written in 3.1
    - Verify correct years display in navigation
    - Verify mobile menu functionality
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 3.1 pass
- Header shows only "2024 | 2023 | 2022 | All Years"
- Mobile hamburger menu displays reduced year list
- Blue color scheme applied to all links
- Touch targets meet accessibility standards

#### Task Group 4: Homepage Simplification
**Dependencies:** Task Group 2 (scoreboard updates)

- [x] 4.0 Complete homepage content reduction
  - [x] 4.1 Write 2-8 focused tests for homepage
    - Test that only 3 most recent years display
    - Test that game descriptions are hidden
    - Test scoreboard placement above year summaries
    - Verify hero plaque image remains at top
  - [x] 4.2 Update YearSummaryCard component (components/YearSummaryCard.tsx)
    - Add optional hideGameDescriptions prop (boolean)
    - Conditionally exclude Game.description field when prop is true
    - Maintain display of: team scheme, challenge theme, winners, game list, team rosters
    - Preserve existing responsive grid patterns
  - [x] 4.3 Update homepage (app/page.tsx)
    - Filter year data to display only last 3 years (2024, 2023, 2022)
    - Pass hideGameDescriptions={true} to YearSummaryCard components
    - Maintain hero plaque image at top
    - Keep consolidated scoreboard above year summaries
  - [x] 4.4 Apply blue color scheme to homepage
    - Update year card headers with blue-600 text
    - Apply blue-100 backgrounds to section headers
    - Use blue-500 for card borders
    - Ensure all text meets WCAG AA contrast standards
  - [x] 4.5 Ensure homepage tests pass
    - Run ONLY the 2-8 tests written in 4.1
    - Verify only 3 years display
    - Verify game descriptions are hidden
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 4.1 pass
- Homepage displays only 2024, 2023, 2022
- Game descriptions excluded from year summaries
- Consolidated scoreboard displays with Games Played column
- Blue color scheme applied consistently

### New Components and Pages

#### Task Group 5: All Years Archive Page
**Dependencies:** Task Groups 1, 2, 3 (requires types, scoreboard updates, navigation links)

- [x] 5.0 Complete All Years page implementation
  - [x] 5.1 Write 2-8 focused tests for All Years page components
    - Test Accordion expand/collapse functionality
    - Test default state (2024 expanded, others collapsed)
    - Test TOC navigation and scroll behavior
    - Test mobile hamburger menu conversion
    - Test keyboard navigation support
    - Verify ARIA attributes for screen readers
  - [x] 5.2 Create Accordion component (components/Accordion.tsx)
    - Accept props: year number, content (React.ReactNode), expanded state, onToggle callback
    - Implement expand/collapse state management
    - Year header as clickable button with blue-600 text
    - Chevron icon that rotates on state change
    - Border around section using blue-200
    - Smooth transition animation (CSS transition)
    - Add ARIA attributes: aria-expanded, aria-controls, role="button"
  - [x] 5.3 Implement keyboard navigation for Accordion
    - Support Enter and Space keys to toggle accordion
    - Support Tab navigation between accordion sections
    - Add focus indicators with blue ring
    - Ensure focus trap within expanded section
  - [x] 5.4 Create TOCNavigation component (components/TOCNavigation.tsx)
    - Display year numbers as vertical list (2024 down to 2006)
    - Fixed width sidebar (200-250px) with sticky positioning
    - Year links with blue-600 color, blue-800 hover
    - Active year highlighted with blue-700 background
    - Smooth scroll behavior on link click
    - Click handler to expand corresponding accordion section
  - [x] 5.5 Implement mobile TOC hamburger menu
    - Detect viewport width (use Tailwind md: breakpoint at 768px)
    - Convert TOC to hamburger icon in top-right on mobile
    - Hamburger menu shows year list when opened
    - Menu closes after year selection
    - Blue accent on hamburger icon
    - Ensure 44x44px minimum touch target
  - [x] 5.6 Add keyboard navigation for TOC
    - Support arrow keys to navigate year list
    - Support Enter to activate selected year link
    - Add focus indicators for keyboard users
    - Maintain tab order for accessibility
  - [x] 5.7 Create All Years page (app/all-years/page.tsx)
    - Import all year data from /data/years/ (2006-2024)
    - Render TOCNavigation component with year list
    - Render Accordion for each year (19 total sections)
    - Default state: 2024 expanded, all others collapsed
    - Desktop layout: sticky TOC on left, accordion content on right
    - Mobile layout: TOC hamburger at top, stacked accordion sections
  - [x] 5.8 Integrate YearSummaryCard into accordion sections
    - Reuse YearSummaryCard component for year content
    - Pass full year data (include game descriptions)
    - Apply same responsive patterns as homepage
    - Maintain team roster table rendering
  - [x] 5.9 Apply blue color scheme to All Years page
    - Accordion headers: text-blue-600, border-blue-200
    - Accordion hover: bg-blue-50
    - TOC links: text-blue-600, hover:text-blue-800
    - TOC active state: bg-blue-700 text-white
    - Section borders: border-blue-500
  - [x] 5.10 Implement smooth scroll behavior
    - Add scroll-behavior: smooth CSS
    - TOC click scrolls to accordion section
    - Account for sticky header offset
    - Test scroll position accuracy
  - [x] 5.11 Ensure All Years page tests pass
    - Run ONLY the 2-8 tests written in 5.1
    - Verify accordion expand/collapse works
    - Verify TOC navigation and scroll behavior
    - Verify mobile hamburger menu functionality
    - Verify keyboard navigation works
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 5.1 pass
- All Years page displays 19 accordion sections
- 2024 defaults to expanded, others collapsed
- Desktop shows sticky TOC sidebar
- Mobile shows hamburger menu for TOC
- Keyboard navigation fully functional
- ARIA attributes present for screen readers
- Smooth scroll works correctly

### Design System and Accessibility

#### Task Group 6: Year Detail Pages and Accessibility Compliance
**Dependencies:** Task Groups 2, 3, 4, 5 (requires all components updated)

- [x] 6.0 Complete year detail page updates and accessibility verification
  - [x] 6.1 Write 2-8 focused tests for accessibility compliance
    - Test text contrast ratios meet WCAG AA (4.5:1 minimum)
    - Test interactive element touch targets (44x44px minimum)
    - Test keyboard navigation across all pages
    - Test screen reader compatibility with ARIA attributes
    - Verify semantic HTML structure
  - [x] 6.2 Update year detail page styling (app/[year]/page.tsx or similar)
    - Apply blue color scheme to match homepage and All Years page
    - Table headers: bg-blue-100 or bg-blue-200
    - Links: text-blue-600 with hover:text-blue-800
    - Section headers: text-blue-600
    - Borders: border-blue-500 or border-gray-300
  - [x] 6.3 Ensure text contrast compliance on year detail pages
    - Body text: black on white (verified 21:1 ratio)
    - Headers: ensure blue shades meet 4.5:1 minimum
    - Links: verify blue-600 on white meets standards
    - Tables: verify blue-100 backgrounds don't reduce readability
  - [x] 6.4 Update game commentary sections
    - Maintain existing content structure
    - Apply blue accents to game titles or headers
    - Ensure play-by-play text remains black on white
    - Verify all text meets WCAG AA standards
  - [x] 6.5 Verify semantic HTML across all pages
    - Check proper heading hierarchy (h1, h2, h3)
    - Ensure tables use proper thead, tbody, th, td elements
    - Verify nav, main, section, article usage
    - Confirm button elements for interactive components
  - [x] 6.6 Test keyboard navigation site-wide
    - Tab through all interactive elements on homepage
    - Tab through navigation menu
    - Tab through All Years accordion sections
    - Tab through TOC navigation
    - Verify focus indicators visible on all elements
  - [x] 6.7 Verify ARIA attributes and screen reader support
    - Test accordion with screen reader (aria-expanded, aria-controls)
    - Test navigation menu with screen reader
    - Test scoreboard table with screen reader (proper headers)
    - Verify skip links or landmarks for navigation
  - [x] 6.8 Test responsive design across breakpoints
    - Desktop (>= 768px): verify sidebar TOC, table layouts
    - Tablet (768px): verify transition to mobile patterns
    - Mobile (< 768px): verify hamburger menus, card layouts, stacked accordions
    - Test touch targets on mobile (44x44px minimum)
  - [x] 6.9 Verify blue color scheme consistency site-wide
    - Check homepage, All Years page, year detail pages
    - Verify link colors consistent (blue-600 default, blue-800 hover)
    - Verify accent colors match (blue-100 backgrounds, blue-500 borders)
    - Ensure no remnants of old color scheme remain
  - [x] 6.10 Run accessibility audit tools
    - Use axe DevTools or similar for automated WCAG checks
    - Fix any remaining contrast, ARIA, or semantic HTML issues
    - Document any known limitations or false positives
  - [x] 6.11 Ensure accessibility tests pass
    - Run ONLY the 2-8 tests written in 6.1
    - Verify WCAG AA compliance across all pages
    - Verify keyboard navigation works everywhere
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 6.1 pass
- All year detail pages use blue color scheme
- Text contrast meets WCAG AA standards (4.5:1 minimum)
- Interactive elements meet 44x44px touch target size
- Keyboard navigation works across entire site
- Screen reader support verified with ARIA attributes
- Responsive design works on desktop, tablet, mobile
- Blue color scheme applied consistently site-wide

### Testing and Quality Assurance

#### Task Group 7: Final Integration Testing and Gap Analysis
**Dependencies:** Task Groups 1-6 (all components complete)

- [x] 7.0 Review existing tests and fill critical gaps only
  - [x] 7.1 Review tests from Task Groups 1-6
    - Review the 2-8 tests written for utilities (Task 1.1)
    - Review the 2-8 tests written for Scoreboard (Task 2.1)
    - Review the 2-8 tests written for Navigation (Task 3.1)
    - Review the 2-8 tests written for Homepage (Task 4.1)
    - Review the 2-8 tests written for All Years page (Task 5.1)
    - Review the 2-8 tests written for Accessibility (Task 6.1)
    - Total existing tests: approximately 12-48 tests
  - [x] 7.2 Analyze test coverage gaps for THIS feature only
    - Identify critical user workflows lacking test coverage
    - Focus on integration points: navigation → pages, TOC → accordion
    - Prioritize end-to-end workflows: homepage → All Years → year detail
    - Check edge cases: empty data, invalid years, mobile interactions
    - Do NOT assess entire application test coverage
  - [x] 7.3 Write up to 10 additional strategic tests maximum
    - Add maximum of 10 new tests to fill identified critical gaps
    - Focus on integration workflows and cross-component interactions
    - Test: homepage navigation → All Years page → specific year accordion
    - Test: mobile TOC hamburger → year selection → accordion expansion
    - Test: keyboard navigation across full user journey
    - Test: responsive breakpoint transitions
    - Do NOT write comprehensive coverage for all scenarios
  - [x] 7.4 Run feature-specific tests only
    - Run ONLY tests related to this spec's feature (tests from 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, and 7.3)
    - Expected total: approximately 22-58 tests maximum
    - Do NOT run the entire application test suite
    - Verify critical workflows pass
  - [x] 7.5 Perform manual testing checklist
    - [x] Test homepage: verify 3 years display, scoreboard shows Games Played
    - [x] Test navigation: verify only 2024/2023/2022/All Years links present
    - [x] Test All Years page: verify 19 accordions, default state correct
    - [x] Test TOC navigation: click each year, verify scroll and expand
    - [x] Test mobile: verify hamburger menus work for nav and TOC
    - [x] Test year detail pages: verify blue color scheme applied
    - [x] Test accessibility: keyboard tab through all pages
    - [x] Test responsive: resize browser through all breakpoints
  - [x] 7.6 Verify no regressions
    - Check that existing year detail page content still displays correctly
    - Verify year data loads properly from JSON files
    - Confirm no broken links or missing routes
    - Ensure no console errors in browser
  - [x] 7.7 Code quality checks
    - Run TypeScript compiler (tsc --noEmit)
    - Run ESLint on modified files
    - Verify no unused imports or variables
    - Ensure consistent code formatting

**Acceptance Criteria:**
- All feature-specific tests pass (approximately 22-58 tests total)
- Critical user workflows for this feature are covered
- No more than 10 additional tests added when filling in testing gaps
- Testing focused exclusively on this spec's feature requirements
- Manual testing checklist complete
- No regressions in existing functionality
- Code quality checks pass

## Execution Order

Recommended implementation sequence:

1. **Foundation Layer** (Task Group 1): Type system and utility functions - enables all other work
2. **Parallel Track A** - Component Updates:
   - Task Group 2: Scoreboard consolidation (depends on Task Group 1)
   - Task Group 3: Navigation simplification (independent, can run parallel)
   - Task Group 4: Homepage simplification (depends on Task Group 2)
3. **Parallel Track B** - New Features:
   - Task Group 5: All Years page (depends on Task Groups 1, 2, 3)
4. **Design System** (Task Group 6): Year detail pages and accessibility (depends on all previous groups)
5. **Quality Assurance** (Task Group 7): Final integration testing (depends on all components complete)

## Notes

**Test-Driven Approach:**
- Each task group starts with writing 2-8 focused tests
- Tests verify only critical behaviors for that group
- Task group ends with running ONLY those specific tests
- Final integration testing (Task Group 7) adds maximum 10 strategic tests for gaps

**Accessibility Focus:**
- WCAG AA compliance is a primary requirement throughout
- Keyboard navigation and ARIA attributes required for new components
- Touch target size (44x44px) enforced on all interactive elements
- Text contrast (4.5:1 minimum) verified across all pages

**Blue Color Scheme:**
- Tailwind's default blue scale used consistently
- blue-600: primary links and text
- blue-800: hover states
- blue-100/blue-200: light backgrounds
- blue-500: borders and highlights
- blue-700: active/selected states

**Responsive Design:**
- Desktop breakpoint: md (768px)
- Desktop features: sticky TOC sidebar, table layouts
- Mobile features: hamburger menus, card layouts, stacked accordions
- All touch targets meet 44x44px minimum on mobile

**Data Integrity:**
- Games Played calculated from existing scoreboard data (wins + losses)
- No changes to underlying JSON data structure
- All 19 years of data (2006-2024) preserved and accessible
