# Spec Requirements: Migrate to Static React Site

## Initial Description
Migrate the Davis Family Challenge website from pure HTML to a static React-based site while maintaining the static site architecture (no backend required).

**Current State:**
- Pure HTML with no build process, JavaScript, or CSS frameworks
- Individual year pages (2024.html, 2023.html, etc.) for each competition
- index.html with scoreboard tables and yearly summaries
- 19 years of competition data (2006-2024)
- Inline CSS styling
- Docker/nginx deployment
- Media assets (.jpg, .mp4) referenced directly
- Hosted via GitHub Pages at davisfamilychallenge.com

**Goal:**
Transform to a modern React application while preserving simplicity, longevity, and static deployment model.

## Requirements Discussion

### First Round Questions

**Q1:** React Framework Choice - I'm assuming you'd want to use Vite for this migration since it offers fast build times, excellent static export capabilities, and minimal configuration overhead. Would that work, or would you prefer Next.js (for its static export features) or another React framework?

**Answer:** Next.js

**Q2:** Data Management Strategy - I'm thinking the 19 years of competition data should be extracted into structured JSON files (one per year, plus a scoreboard data file) that React components consume. This would align with roadmap item #3 ("Separate data from display"). Should we do this as part of the migration, or keep data hardcoded in components initially?

**Answer:** Extract to structured JSON files (ticks off roadmap item 3)

**Q3:** Styling Approach - Given the current inline CSS approach and the simplicity goal, I assume you'd want to use CSS Modules (scoped CSS files per component) or plain CSS files to maintain that simplicity without adding heavy dependencies. Would that be correct, or are you open to Tailwind CSS for utility-first styling?

**Answer:** Tailwind CSS

**Q4:** Component Architecture - I'm envisioning a structure like:
- App.jsx (main router)
- HomePage.jsx (scoreboard + year summaries)
- YearPage.jsx (individual year details)
- Shared components: Scoreboard.jsx, YearSummaryTable.jsx, GameNarrative.jsx

Does this structure align with your vision, or do you have specific component organization preferences?

**Answer:** Approved the proposed structure

**Q5:** Migration Strategy - Should we migrate all at once (replace entire HTML site with React version in one go), or would you prefer an incremental approach (perhaps start with index.html → HomePage, then migrate year pages one by one)?

**Answer:** All at once

**Q6:** Build and Deployment - I assume the build output should be static HTML/CSS/JS files that can still be served via nginx in the existing Docker container, maintaining GitHub Pages compatibility. Is that correct?

**Answer:** Static HTML/CSS/JS/JSON files served via GitHub Pages (not nginx/Docker)

**Q7:** Routing Strategy - For URLs like /2024.html to continue working, should we use React Router with HTML5 History API and configure nginx to handle routing, or keep the .html extensions in routes for backwards compatibility?

**Answer:** No backward compatibility required (modern routing)

**Q8:** Enhanced Features - Since you're introducing a build process anyway, are there specific improvements from the roadmap you'd like to tackle during this migration (mobile responsiveness, search functionality, accessibility improvements), or should we focus purely on the React migration first and keep feature parity with the current site?

**Answer:** Include only roadmap items #1 (Mobile-Responsive Design) and #3 (Separate data from display)

**Q9:** TypeScript - Would you like to use TypeScript for type safety with the data structures (especially useful with JSON data files), or stick with plain JavaScript to keep it simpler?

**Answer:** Yes, use TypeScript

**Q10:** What should we explicitly exclude? Are there any roadmap features or enhancements we should definitely NOT include in this migration scope (to keep it focused)?

**Answer:** Exclude all roadmap items except #1 and #3

### Existing Code to Reference

No similar existing features identified for reference.

The codebase currently contains only pure HTML files with no existing React, Next.js, or TypeScript projects to reference.

### Follow-up Questions

No follow-up questions needed. All requirements are clearly defined.

## Visual Assets

### Files Provided:

No visual assets provided.

### Visual Insights:

No visual assets to analyze. The migration will preserve the existing visual design and layout patterns from the current HTML site while making them responsive and component-based.

## Requirements Summary

### Functional Requirements

**Core Migration:**
- Migrate from pure HTML to Next.js with TypeScript
- Extract all 19 years of competition data into structured JSON files
- Create component-based architecture for reusability
- Implement modern routing (no .html extensions, no backward compatibility needed)
- Generate static HTML/CSS/JS/JSON output for GitHub Pages deployment
- Preserve all existing content: scoreboard, standings, year summaries, game narratives, media assets

**Data Management (Roadmap Item #3):**
- Create JSON schema for year data (team schemes, themes, winners, games, rosters, narratives)
- Create JSON file for scoreboard data (lifetime records, winning percentages, standings)
- Design TypeScript interfaces/types for all data structures
- Separate data from presentation logic completely

**Mobile-Responsive Design (Roadmap Item #1):**
- Implement responsive layout using Tailwind CSS
- Ensure tables reflow appropriately on phones and tablets
- Prevent horizontal scrolling on mobile devices
- Use flexbox and responsive design patterns
- Test across multiple screen sizes
- Ensure images and videos are responsive

**Component Architecture:**
- App.tsx (main application and routing)
- HomePage.tsx (scoreboard + year summaries from index.html)
- YearPage.tsx (individual year competition details)
- Scoreboard.tsx (lifetime records table)
- YearSummaryTable.tsx (yearly summary tables)
- GameNarrative.tsx (game descriptions and play-by-play)
- Additional shared components as needed

**Media Asset Management:**
- Preserve existing .jpg and .mp4 files
- Reference media assets from React components
- Ensure proper paths in static build output
- Maintain direct file references (no CDN required)

### Reusability Opportunities

No existing components or patterns to reuse. This is a greenfield React/Next.js implementation for a pure HTML site.

### Scope Boundaries

**In Scope:**
- Next.js setup with TypeScript and Tailwind CSS
- Complete migration of all 19 year pages from HTML to React components
- Migration of index.html to React HomePage component
- Extraction of all data into structured JSON files
- TypeScript interfaces for all data structures
- Mobile-responsive design implementation
- Static site generation (SSG) configuration for GitHub Pages
- Component-based architecture
- Modern routing without .html extensions
- Preservation of all existing content and media

**Out of Scope:**
- Search functionality (roadmap item #5)
- Participant profile pages (roadmap item #6)
- Game encyclopedia (roadmap item #7)
- Photo gallery enhancements (roadmap item #8)
- Timeline visualization (roadmap item #9)
- Print-friendly stylesheet (roadmap item #10)
- Automated year template (roadmap item #11)
- Historical statistics dashboard (roadmap item #12)
- Improved table accessibility beyond basic responsive design (roadmap item #4)
- Backend or server-side logic
- CMS or content editing interface
- User authentication or accounts
- Database integration
- API development
- Docker/nginx deployment (switching to GitHub Pages static hosting)

### Technical Considerations

**Technology Stack:**
- Next.js (React framework with SSG capabilities)
- TypeScript (type safety for data structures)
- Tailwind CSS (utility-first styling framework)
- React Router (built into Next.js App Router or Pages Router)

**Build and Deployment:**
- Next.js static export (`next export` or `output: 'export'`)
- Build output: Static HTML/CSS/JS/JSON files
- Deployment target: GitHub Pages
- No server-side rendering or API routes needed
- No Docker container or nginx configuration needed

**Data Structure:**
- JSON files for all competition data
- Separate JSON file per year (2006.json through 2024.json)
- Central scoreboard.json for lifetime records and standings
- TypeScript interfaces to enforce data structure consistency

**Migration Constraints:**
- Must preserve all 19 years of historical content
- Must maintain media asset references (images and videos)
- Must work as pure static site (no backend)
- Must be deployable to GitHub Pages
- Must be mobile-responsive from day one

**Design Principles:**
- Maintain simplicity and longevity philosophy
- Keep deployment straightforward (static files)
- Ensure universal accessibility
- Prioritize maintainability for future year additions
- Component reusability for consistent UI patterns
