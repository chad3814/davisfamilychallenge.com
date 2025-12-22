# Specification: Design Cleanup and Reorganization

## Goal
Improve accessibility, consolidate redundant scoreboard tables, establish consistent blue color scheme, simplify navigation and homepage to show recent years only, and create dedicated "All Years" archive page with accordion layout.

## User Stories
- As a visitor, I want readable text with proper contrast so that I can easily read all content regardless of vision capabilities
- As a visitor, I want a simplified homepage showing recent years so that I can quickly see current competition data without scrolling through 19 years
- As a family historian, I want an "All Years" archive page with easy navigation so that I can browse the complete 19-year competition history efficiently

## Specific Requirements

**Accessibility Compliance**
- Update all text to meet WCAG AA contrast standards (4.5:1 ratio minimum)
- Use black text on white backgrounds for primary body content
- Ensure interactive elements meet touch target size requirements (44x44px minimum)
- Implement semantic HTML for all new accordion and navigation components
- Add keyboard navigation support for accordion sections and TOC
- Include ARIA attributes for screen reader accessibility on interactive components

**Blue Color Scheme Implementation**
- Apply Tailwind's default blue scale across all pages and components
- Use blue-600 for primary links and interactive elements
- Use blue-800 for hover states on links
- Use blue-100 for light background accents
- Use blue-500 for borders and highlights on cards/sections
- Maintain black-on-white for body text per accessibility requirements
- Apply consistent blue theming to headers, navigation, and table headers

**Scoreboard Consolidation**
- Remove redundant "Overall Standings" table (currently separate from Lifetime Records)
- Create single unified scoreboard table with columns: Participant Name, Record (W-L format), Winning Percentage (.PCT format), Games Played
- Calculate Games Played as wins + losses from existing scoreboard data
- Sort table by winning percentage in descending order
- Display winning percentage with 3 decimal places and leading period format (.632)
- Maintain responsive design with desktop table view and mobile card layout
- Update Scoreboard component to include new Games Played column

**Navigation Simplification**
- Update header navigation to show only: "2024 | 2023 | 2022 | All Years"
- Remove year links for 2006-2021 from header navigation
- Maintain sticky header behavior with logo as home link
- Keep existing mobile hamburger menu pattern but with reduced year list
- Apply blue color scheme to navigation links (blue-600 default, blue-800 hover)

**Homepage Content Reduction**
- Display only last 3 years (2024, 2023, 2022) on homepage
- Each year summary shows: team scheme, challenge theme, winners, game list, team rosters
- Remove game commentary and play-by-play descriptions from homepage (keep on individual year pages)
- Maintain existing YearSummaryCard component structure but exclude Game.description field
- Keep hero plaque image at top of homepage
- Show consolidated scoreboard above year summaries

**All Years Archive Page**
- Create new route at `/all-years` with dedicated page component
- Implement accordion layout with one section per year (19 sections total)
- Each accordion section displays year summary when expanded (same content as homepage year cards)
- Default state: most recent year (2024) expanded, all others collapsed
- Desktop: sticky sidebar TOC on left showing year numbers only (2024, 2023... 2006)
- TOC links scroll to and expand corresponding accordion section
- Mobile: convert TOC to hamburger menu at top of page
- Apply blue color scheme to accordion headers and TOC active states
- Use smooth scroll behavior for TOC navigation

**Responsive Design Requirements**
- Desktop breakpoint (md: 768px): full sidebar TOC, table layouts for scoreboard and teams
- Mobile: hamburger TOC menu, card layouts for scoreboard, stacked accordion sections
- Touch-friendly targets on mobile (minimum 44x44px for all interactive elements)
- Test accordion behavior on both desktop and mobile viewports
- Ensure TOC hamburger menu closes after navigation on mobile

**Year Detail Pages Updates**
- Apply blue color scheme to match homepage and All Years page
- Update table headers to use blue backgrounds (blue-100 or blue-200)
- Update links to use blue-600 with blue-800 hover states
- Maintain existing content structure including full game commentary
- Ensure text contrast meets WCAG AA standards throughout

**Type System Updates**
- Update ScoreboardEntry interface to include gamesPlayed: number field
- Create AccordionSection component interface for year accordion items
- Create TOC component interface for table of contents navigation
- Maintain existing YearData and Game interfaces

**Component Architecture**
- Create new AllYearsPage component at app/all-years/page.tsx
- Create reusable Accordion component with expand/collapse state management
- Create TOCNavigation component with sticky positioning and mobile hamburger variant
- Update Scoreboard component to add Games Played column
- Remove StandingsTable component (redundant with consolidated scoreboard)
- Update YearSummaryCard to accept optional hideGameDescriptions prop

## Visual Design

No visual mockups provided. Design decisions based on requirements:

**Scoreboard Table Design**
- Clean table layout with borders using gray-300
- Header row with blue-100 background
- Hover state on rows with blue-50 background
- Mobile card layout with blue-500 ring for visual hierarchy

**Accordion Design**
- Year header as clickable button with blue-600 text
- Expand/collapse icon (chevron) that rotates on state change
- Border around each accordion section using blue-200
- Expanded section shows year summary content with padding
- Smooth transition animation for expand/collapse

**TOC Sidebar Design**
- Fixed width sidebar (200-250px) with sticky positioning
- Year numbers as vertical list with blue-600 links
- Active year highlighted with blue-700 background
- Mobile hamburger icon in top-right with blue accent

## Existing Code to Leverage

**Navigation Component (components/Navigation.tsx)**
- Reuse existing hamburger menu pattern for mobile navigation
- Apply same sticky top-0 z-50 positioning for header
- Adapt year list logic to filter for last 3 years only
- Maintain client component pattern with useState for menu toggle

**YearSummaryCard Component (components/YearSummaryCard.tsx)**
- Reuse existing card layout structure for accordion sections
- Leverage team roster table rendering logic
- Apply same responsive grid patterns for team scheme and challenge theme
- Modify to conditionally exclude game descriptions when on homepage

**Scoreboard Component (components/Scoreboard.tsx)**
- Extend existing desktop table and mobile card responsive pattern
- Add Games Played column to both table and card layouts
- Reuse formatRecord utility from lib/utils.ts
- Maintain hover states and border styling patterns

**Utils Library (lib/utils.ts)**
- Use existing formatRecord function for W-L (.PCT) formatting
- Use calculateWinningPercentage for percentage calculations
- Use sortByWinningPercentage for scoreboard ranking logic
- Add new calculateGamesPlayed utility function (wins + losses)

**Type Definitions (types/index.ts)**
- Extend ScoreboardEntry interface for gamesPlayed field
- Reuse existing YearData, Game, and Team interfaces
- Apply existing type guards pattern for new component props

## Out of Scope
- Changes to underlying JSON data structure or file organization
- Search functionality or filtering features for All Years page
- User accounts, authentication, or personalization features
- Backend API development or database integration
- Print stylesheets or PDF export functionality
- Dark mode or theme switching capabilities
- Animation libraries or complex transition effects (use CSS only)
- Third-party component libraries (build with native React and Tailwind)
- SEO optimization or meta tag improvements beyond basic Next.js defaults
- Analytics or tracking implementation
