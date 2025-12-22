# Raw Idea

## Feature Description
Migrate to a static React site

## Context
The current Davis Family Challenge website is pure HTML with no build process, JavaScript, or CSS frameworks. Each year's competition has its own HTML file (e.g., `2024.html`, `2023.html`), with `index.html` containing scoreboard tables and yearly summaries.

## User Request
Migrate this to a static React-based site while maintaining the static site architecture (no backend required).

## Initial Considerations
- Current site: Pure HTML, inline CSS, no build process
- Deployment: Containerized using nginx via Dockerfile
- Content: 19 years of competition data across multiple HTML files
- Media: Images (.jpg) and videos (.mp4) referenced directly
- Goal: Migrate to React while preserving simplicity and static deployment model

## Date Initiated
2025-12-22
