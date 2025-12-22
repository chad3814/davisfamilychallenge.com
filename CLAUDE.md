# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Davis Family Challenge - an annual family game competition that has been running since 2006. The site is a pure HTML archive with no build process, JavaScript, or CSS frameworks.

## Architecture

**Static HTML Site**: Each year's competition gets its own HTML file (e.g., `2024.html`, `2023.html`, etc.)

**Main Entry Point**: `index.html` contains:
- A scoreboard table showing lifetime records for all participants (wins-losses and winning percentage)
- An overall standings table ranking participants
- Summary tables for each year linking to the detailed year pages

**Year Pages** (`YYYY.html`): Each contains:
- Title and narrative of that year's competition
- Team scheme and challenge theme
- Game-by-game descriptions with detailed play-by-play
- Team rosters and results

**Deployment**: Containerized using nginx via `Dockerfile` which copies all HTML files to the nginx html directory

**Media Assets**: Images (`.jpg`) and videos (`.mp4`) are referenced directly from HTML files and stored at root or in `videos/` directory

## Common Tasks

### Adding a New Year

1. Create `YYYY.html` following the pattern of previous years (e.g., `2024.html`)
2. Update `index.html`:
   - Add new year section with summary table
   - Update scoreboard records and standings based on results
   - Insert the new year at the top of the "Yearly Results" section

### Local Development

Since this is static HTML with no build process:
- Open `index.html` or any year file directly in a browser
- No local server required

### Deployment

The site uses Docker with nginx:
```bash
docker build -t davisfamilychallenge .
docker run -p 80:80 davisfamilychallenge
```

## Content Patterns

**Scoreboard Calculations**:
- Record format: `W-L (.PCT)` where PCT is wins/(wins+losses) with 3 decimal places
- Overall standings are ranked by winning percentage

**Year Summary Tables**: Each year in `index.html` includes:
- Team Scheme (how teams were formed)
- Challenge Theme
- Winners
- Games (list of games played)
- Teams (roster for each team)

**Consistency Notes**:
- Years are listed in descending order (newest first) in `index.html`
- Inline CSS is used consistently across files (no external stylesheets)
- Tables use `border="1"` attribute for styling
- Domain is `davisfamilychallenge.com` (see `CNAME` file)
