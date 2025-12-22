# Specification: Migrate Davis Family Challenge to Static React Site

## Goal
Transform the Davis Family Challenge website from pure HTML to a modern Next.js/TypeScript application with mobile-responsive design while maintaining static site deployment and separating data from presentation logic.

## User Stories
- As a site visitor, I want to view the competition history on mobile devices so that I can browse comfortably on any screen size
- As a site maintainer, I want data stored in structured JSON files so that adding new years is easier and less error-prone
- As a developer, I want a component-based architecture so that the site is maintainable and follows modern best practices

## Specific Requirements

### Next.js Project Setup with Static Export
- Initialize Next.js 14+ project with TypeScript and App Router
- Configure static site generation with `output: 'export'` in next.config.js
- Set up Tailwind CSS for utility-first styling
- Configure build process to output to `out/` directory for GitHub Pages deployment
- Create `.nojekyll` file in public directory to ensure proper GitHub Pages serving
- Set up proper asset handling for images and videos in public directory

### Data Extraction and JSON Schema Design
- Create `data/` directory for all JSON files
- Design TypeScript interfaces for Year, Team, Game, Participant, and Scoreboard entities
- Extract scoreboard data (participant records, winning percentages, standings) to `data/scoreboard.json`
- Extract each year's data (2006-2024) to individual JSON files `data/years/YYYY.json`
- Each year JSON includes: teamScheme, challengeTheme, winners, games array, teams array, narratives
- Game objects include: name, description, playByPlay text
- Team objects include: name, members array
- Validate all JSON files match TypeScript interfaces

### Component Architecture and Routing
- Create page components: `app/page.tsx` (home), `app/[year]/page.tsx` (dynamic year pages)
- Build reusable components: Scoreboard, StandingsTable, YearSummaryCard, GameNarrative, TeamRoster
- Implement React Server Components for optimal static generation
- Use Next.js dynamic routes for year pages (e.g., `/2024`, `/2023`)
- Generate static paths for all 19 years using `generateStaticParams`
- Create shared layout component with navigation and footer
- Implement proper TypeScript props interfaces for all components

### Mobile-Responsive Design Implementation
- Use Tailwind responsive breakpoints (sm, md, lg, xl) throughout
- Convert scoreboard and standings tables to responsive card layouts on mobile
- Implement horizontal scroll containers for wide tables with visible scrollbars on mobile
- Use flexbox and grid layouts that reflow on smaller screens
- Ensure images scale responsively with max-width constraints
- Make navigation touch-friendly with appropriate tap target sizes
- Test responsive behavior at 320px, 768px, 1024px, and 1920px widths

### Home Page Component Structure
- Display hero image (plaque.jpg) with responsive sizing
- Render scoreboard table showing lifetime records for all participants
- Display overall standings table ranked by winning percentage
- Show year summary cards in descending order (2024 first)
- Each year card links to detail page and shows: teamScheme, challengeTheme, winners, games list, team rosters
- Calculate and display records in "W-L (.PCT)" format with 3 decimal precision

### Year Detail Page Component Structure
- Dynamic route parameter for year (2006-2024)
- Display year title with proper ordinal formatting ("Nineteenth Annual...")
- Render team scheme and challenge theme metadata
- Show complete game narratives with proper formatting
- Display team rosters in table format
- Include images and videos when present in data
- Preserve HTML formatting within narrative text (paragraphs, lists, tables)

### TypeScript Type Safety
- Define strict interfaces for all data structures in `types/` directory
- Create types: Participant, Record, Team, Game, YearData, ScoreboardData
- Use type guards for runtime validation when loading JSON
- Enable strict TypeScript compiler options
- Ensure all component props are properly typed
- Use enums or union types for known values (participant names, years)

### Media Asset Management
- Move all .jpg and .mp4 files to `public/images/` and `public/videos/` directories
- Reference media using Next.js Image component for optimization where appropriate
- Maintain direct file paths for video elements
- Create image manifest mapping year-specific media to their files
- Ensure proper alt text for all images for accessibility
- Use responsive image sizing based on viewport

### GitHub Pages Deployment Configuration
- Configure `basePath` and `assetPrefix` if needed for GitHub Pages subdirectory
- Set up GitHub Actions workflow for automated builds on push to main
- Output static files to `out/` directory
- Ensure CNAME file is preserved in build output for custom domain
- Configure next.config.js for proper trailing slash handling
- Test build output locally before deployment

### Data-Component Separation Architecture
- All data lives in JSON files under `data/` directory
- Components import and consume data via typed interfaces
- No hardcoded content in JSX (except labels and UI text)
- Create data loading utilities in `lib/` directory
- Implement data validation layer to catch malformed JSON
- Future year additions only require new JSON file, no code changes

## Visual Design

No visual mockups provided. Migration preserves existing visual design from HTML site while making it responsive and component-based.

**Existing HTML Tables**
- Convert to responsive card layouts on mobile breakpoints
- Maintain table structure on desktop (md breakpoint and above)
- Use Tailwind border and spacing utilities to match existing table styling
- Preserve center alignment for numeric data
- Keep underline styling for table headers

**Typography and Layout**
- Maintain existing heading hierarchy (h1, h2 structure)
- Preserve centered hero image positioning
- Use similar font sizing and spacing as original inline CSS
- Apply consistent padding and margins using Tailwind spacing scale

**Color Scheme**
- Maintain simple black text on white background
- Preserve table border styling
- Use default link colors or match existing blue for year links

## Existing Code to Leverage

**HTML Structure Patterns from index.html**
- Scoreboard table structure with name, record, and standing columns
- Year summary tables with metadata rows and team roster layout
- Link structure connecting to individual year pages
- Use as reference for data extraction and component structure

**Year Page Structure from 2024.html**
- Title format pattern for ordinal year names
- Game narrative section organization with h2 headings
- Table formatting within game descriptions (e.g., scoring tables in Christmas Slots)
- Use as template for YearPage component design and JSON schema

**CSS Patterns from Inline Styles**
- Table styling: border-collapse, width constraints, text-align rules
- Image responsive sizing with max-width and auto height
- Number class for right/center aligned table cells
- Name class for bold/wider participant name cells
- Replicate these patterns with Tailwind utility classes

**Media Asset References**
- Direct file path references (e.g., `plaque.jpg`, `oreo.mp4`)
- Simple img and video element structure
- Use as guide for public asset organization and component image handling

**Data Patterns from Multiple Years**
- 19 years of historical data (2006-2024) showing schema evolution
- Team naming conventions and roster structures
- Game description formats and scoring table patterns
- Use to design flexible JSON schema accommodating all year variations

## Out of Scope
- Search functionality across years or games
- Participant profile pages with individual statistics
- Game encyclopedia with rules and variations
- Photo gallery enhancements or lightbox viewers
- Timeline visualization of competition history
- Print-friendly stylesheets
- Automated year template generation tools
- Historical statistics dashboard or analytics
- Advanced table accessibility features beyond responsive design
- Backend server or API development
- Database integration
- User authentication or accounts
- Content management system (CMS) interface
- Docker/nginx deployment configuration
- Backward compatibility for .html URL extensions
- Progressive Web App (PWA) features
- Internationalization or multi-language support
- Dark mode theme toggle
- Advanced animations or transitions
- SEO optimization beyond basic meta tags
