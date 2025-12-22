# Product Roadmap

1. [x] Migrate to a static react site. `L`

2. [x] Mobile-Responsive Layout — Update inline CSS to use responsive design patterns (flexbox, media queries) so tables, images, and text reflow appropriately on phones and tablets without horizontal scrolling. Test on multiple screen sizes. `S`

3. [x] Separate data from display, storing the data in a json file. `M`

4. [x] Improved Table Accessibility — Add proper semantic HTML table elements (thead, tbody, caption) and ARIA labels to scoreboard and year summary tables, ensuring screen readers can properly navigate and announce table content. `XS`

5. [ ] Search Functionality — Add a client-side JavaScript search feature allowing users to filter years, participants, games, or team names without server-side processing, maintaining the static site architecture. `M`

6. [ ] Participant Profile Pages — Create individual HTML pages for each participant (e.g., `participant-jd.html`) showing their lifetime record, game-by-game history, teams they've been on, and memorable moments, linked from the main scoreboard. `L`

7. [ ] Game Encyclopedia — Build a `games.html` page cataloging all unique games ever played (with descriptions, rules, and which years they appeared), allowing users to see the evolution of game selection across 19 years. `M`

8. [ ] Photo Gallery Per Year — Add a dedicated photo gallery section to each year page with thumbnail grid layout and lightbox functionality (using pure CSS or minimal JavaScript), organizing media assets more effectively than inline embedding. `S`

9. [ ] Timeline Visualization — Create a visual timeline on the index page showing all 19 years with key milestones (first year, largest team, closest game, etc.) using CSS-based timeline layout for quick historical navigation. `M`

10. [ ] Print-Friendly Stylesheet — Add a print-specific CSS stylesheet so users can print year pages or scoreboard cleanly without navigation elements, background colors, or broken page layouts for physical archiving. `XS`

11. [ ] Automated Year Template — Create a documentation guide or simple HTML template file that standardizes the structure for adding new years, ensuring consistency in formatting, table structure, and narrative style across all future additions. `XS`

12. [ ] Historical Statistics Dashboard — Build a `stats.html` page with aggregate data visualizations (using CSS-based charts or SVG) showing trends like most wins by year, most competitive years, game type popularity, and participation rates over time. `L`

> Notes
> - Order prioritizes user experience improvements (mobile, accessibility) before advanced features
> - All enhancements maintain the static HTML architecture - no build process, no frameworks, no backend required
> - Each feature is end-to-end functional and independently testable
> - Features respect the archive's core mission: simplicity, longevity, and accessibility
