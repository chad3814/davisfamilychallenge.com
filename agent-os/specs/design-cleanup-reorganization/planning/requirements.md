# Spec Requirements: Design Cleanup and Reorganization

## Initial Description
The user wants to clean up the design and reorganize content of the Davis Family Challenge website:

### 1. Fix Accessibility Issues
- Light-grey text on white background needs better contrast

### 2. Simplify Scoreboard
- Currently has both "lifetime" and "overall records" tables
- Only need one table (they're redundant)

### 3. Color Scheme
- Establish consistent color scheme using shades of blue

### 4. Navigation Simplification
- Header should only show links to last 3 years (currently shows all 19)

### 5. Homepage Simplification
- Show only last 3 years on homepage (currently shows all 19)

### 6. New "All Years" Page
- Create a dedicated page for browsing all years
- Use accordion layout for year data
- Include table of contents on the left side

## Current Context
- Next.js/TypeScript/React application
- Tailwind CSS for styling
- 19 years of data (2006-2024)
- Currently shows all years on homepage

## Requirements Discussion

### First Round Questions

**Q1:** I assume you want to use WCAG AA compliant contrast ratios (4.5:1 for normal text). Should I target dark blue text on white backgrounds, or would you prefer a different approach like light backgrounds with darker text?
**Answer:** Stick with black-on-white for most content, target WCAG AA compliance (4.5:1 contrast ratio)

**Q2:** I'm thinking we keep one unified scoreboard table showing participant name, wins-losses, and winning percentage ranked by percentage. Should this table include any additional columns like "total games played" or "championships won," or keep it minimal?
**Answer:** Add "games played" column. User asks: can we calculate this from team data for each year?

**Q3:** For a blue-based color scheme, I assume you want a professional palette with perhaps 3-5 shades (light background blue, medium accent blue, dark text blue). Do you have specific blue preferences (navy, sky blue, royal blue), or should I propose a harmonious palette using Tailwind's blue scale?
**Answer:** Use Tailwind's blue scale (default blue palette)

**Q4:** I'm thinking the header navigation shows "2024 | 2023 | 2022" with an "All Years" link. Should there also be a "Home" link, or does clicking the site logo/title navigate home?
**Answer:** Header shows "2024 | 2023 | 2022 | All Years", logo navigates home

**Q5:** When showing only the last 3 years on the homepage, should each year display the full summary table (team scheme, theme, winners, games, teams) as it does currently, or a condensed version?
**Answer:** Show team scheme, game theme, teams, game list, and winners. Game commentary should only be on individual year pages (not homepage)

**Q6:** For the accordion design, I assume each year is a collapsible section showing the year summary when expanded. Should the accordion default to all collapsed, all expanded, or just the most recent year expanded?
**Answer:** Default to most recent year expanded

**Q7:** I'm thinking the left sidebar TOC shows years as clickable links (2024, 2023, 2022... 2006) that scroll to or expand that year's accordion section. Should the TOC be sticky (stays visible while scrolling) or static?
**Answer:** Sticky sidebar, show just year numbers

**Q8:** For mobile devices where a left sidebar TOC might not work well, should the TOC move to the top on smaller screens, or convert to a dropdown/hamburger menu?
**Answer:** TOC converts to hamburger menu on mobile

**Q9:** Since you mentioned the data is separated into JSON files (roadmap item 3), I assume the year data is already structured. Should this redesign maintain the existing data structure, or is this an opportunity to refactor how data is organized?
**Answer:** Individual year detail pages should be updated to match new color scheme

**Q10:** Are there any features you explicitly want to exclude from this redesign? For example, should I avoid touching the individual year detail pages (keeping them as-is), or do they need design updates too to match the new color scheme?
**Answer:** None - include everything in scope

### Existing Code to Reference

No similar existing features identified for reference.

### Games Played Calculation Analysis

**Question:** Can we calculate "games played" from team data for each year?

**Answer:** YES - The data structure supports this calculation:

**Data Structure Found:**
- `/data/scoreboard.json` contains participant records with wins/losses
- `/data/years/YYYY.json` contains yearly data including teams array
- Each year file has a `teams` array with `members` lists showing which participants competed that year

**Calculation Method:**
- Total games played = wins + losses (already in scoreboard.json)
- This can be calculated directly: `gamesPlayed = record.wins + record.losses`
- Alternative verification: Count how many years each participant appears in team rosters across all year files

**Example from data:**
- J.D.: 12 wins + 7 losses = 19 games played
- Chad: 12 wins + 7 losses = 19 games played
- Shep: 0 wins + 1 loss = 1 game played

**Recommendation:** Use the simple addition method (wins + losses) as it's already available in the scoreboard data and requires no additional data processing.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
No visual files found in the visuals directory.

## Requirements Summary

### Functional Requirements

**Accessibility Improvements:**
- Update text contrast to meet WCAG AA standards (4.5:1 ratio)
- Use black text on white backgrounds for primary content
- Ensure all interactive elements meet accessibility standards

**Scoreboard Consolidation:**
- Merge redundant "lifetime" and "overall records" tables into one unified table
- Display columns: Participant Name, Wins-Losses (W-L format), Winning Percentage, Games Played
- Games Played calculated as: wins + losses
- Rank by winning percentage (descending)

**Color Scheme:**
- Implement Tailwind's default blue scale across the site
- Apply consistent blue theming to headers, links, accents, and interactive elements
- Maintain black-on-white for body text

**Navigation Updates:**
- Header navigation shows: "2024 | 2023 | 2022 | All Years"
- Site logo/title acts as home link
- Remove links to years 2006-2021 from header navigation

**Homepage Simplification:**
- Display only the last 3 years (2024, 2023, 2022)
- Each year shows: team scheme, game theme, teams, game list, winners
- Exclude game commentary/descriptions from homepage (keep on year detail pages only)

**New "All Years" Page:**
- Create dedicated route for browsing complete archive (all 19 years)
- Implement accordion layout with year sections
- Each accordion section displays year summary when expanded
- Default state: most recent year (2024) expanded, all others collapsed
- Sticky sidebar table of contents on desktop
- TOC shows year numbers only (2024, 2023, ... 2006)
- TOC links scroll to or expand corresponding accordion section
- Mobile: TOC converts to hamburger menu

**Year Detail Pages:**
- Update color scheme to match new blue palette
- Maintain existing content structure and game commentary
- Apply consistent styling with homepage and All Years page

### Reusability Opportunities

No existing components identified for reuse. This will establish new patterns for:
- Accordion components
- Sticky sidebar navigation
- Responsive hamburger menu
- Unified color theming

### Scope Boundaries

**In Scope:**
- Accessibility fixes (text contrast)
- Scoreboard table consolidation and enhancement
- Blue color scheme implementation across all pages
- Header navigation simplification
- Homepage content reduction (show 3 years only)
- New "All Years" page with accordion and TOC
- Year detail page styling updates
- Mobile responsive design for all new components

**Out of Scope:**
- Data structure changes (existing JSON format is sufficient)
- New features beyond reorganization (search, filters, etc.)
- Backend or deployment changes
- Content updates or new year additions

### Technical Considerations

**Data Structure:**
- Scoreboard data: `/data/scoreboard.json`
- Year data: `/data/years/YYYY.json` (2006-2024)
- Games played calculation: `wins + losses` from existing scoreboard data
- Team roster data available in year files for verification

**Technology Stack:**
- Next.js with React and TypeScript
- Tailwind CSS for styling (use default blue scale)
- No external component libraries needed

**Responsive Design:**
- Desktop: Sticky sidebar TOC, full accordion layout
- Mobile: Hamburger menu TOC, stacked accordion sections
- Breakpoint strategy follows Tailwind defaults

**Accessibility:**
- WCAG AA compliance (4.5:1 contrast ratio)
- Semantic HTML for accordion and navigation
- Keyboard navigation support for interactive elements
- Screen reader support for table data and navigation
