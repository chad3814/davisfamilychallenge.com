# Davis Family Challenge

A static website showcasing the annual Davis Family Challenge - a family game competition running since 2006. Built with Next.js, TypeScript, and Tailwind CSS as a static site deployed to GitHub Pages.

## Project Overview

This is a modern React/Next.js implementation of the Davis Family Challenge website, featuring:
- 19 years of competition history (2006-2024)
- Mobile-responsive design
- Data-driven architecture with JSON data files
- Static site generation for GitHub Pages deployment

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
# Create static build
npm run build

# Preview static build locally
npx serve out
```

The static site will be generated in the `out/` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (scoreboard + year summaries)
│   ├── [year]/page.tsx    # Dynamic year detail pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Scoreboard.tsx
│   ├── StandingsTable.tsx
│   ├── YearSummaryCard.tsx
│   ├── GameNarrative.tsx
│   ├── TeamRoster.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Layout.tsx
├── lib/                   # Utility functions
│   ├── data.ts           # Data loading functions
│   └── utils.ts          # Helper utilities
├── types/                # TypeScript type definitions
│   └── index.ts
├── data/                 # JSON data files
│   ├── scoreboard.json   # Lifetime records and standings
│   └── years/            # Individual year data
│       ├── 2024.json
│       ├── 2023.json
│       └── ...
├── public/               # Static assets
│   ├── images/          # Image files
│   ├── videos/          # Video files
│   ├── .nojekyll        # GitHub Pages config
│   └── CNAME            # Custom domain config
└── __tests__/           # Jest tests
```

## Adding a New Year

To add data for a new year:

1. Create a new JSON file in `data/years/` named `YYYY.json`
2. Follow this structure:

```json
{
  "year": 2025,
  "ordinalName": "Twentieth Annual Davis Family Challenge",
  "teamScheme": "How teams were formed",
  "challengeTheme": "How challenges were selected",
  "winners": "Winning team name",
  "games": [
    {
      "name": "Game Name",
      "description": "Game description and narrative",
      "playByPlay": "Optional detailed play-by-play",
      "scoringTable": "Optional HTML table for scores"
    }
  ],
  "teams": [
    {
      "name": "Team Name",
      "members": ["Member 1", "Member 2", "Member 3", "Member 4"]
    }
  ],
  "images": ["optional-image.jpg"],
  "videos": ["optional-video.mp4"]
}
```

3. Update `data/scoreboard.json` with new results:
   - Update participant records (wins/losses)
   - Recalculate winning percentages
   - Update standings

4. Add any new images to `public/images/`
5. Add any new videos to `public/videos/`

The site will automatically include the new year when you rebuild.

## Deployment

### GitHub Pages (Automated)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

**Setup Requirements:**
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Configure custom domain: davisfamilychallenge.com

### Manual Deployment

```bash
# Build the site
npm run build

# The out/ directory contains the static site
# Upload contents to any static hosting service
```

## Technology Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Deployment:** GitHub Pages (static export)

## Responsive Design

The site is fully responsive with breakpoints at:
- Mobile: 320px - 767px (card layouts, hamburger menu)
- Tablet: 768px - 1023px (hybrid layouts)
- Desktop: 1024px+ (table layouts, full navigation)

## Data Architecture

All content is stored in JSON files in the `data/` directory:
- Separation of data from presentation logic
- Type-safe with TypeScript interfaces
- Easy to update without code changes
- Version controlled alongside code

## License

This is a private family project.

## Legacy Migration

This site replaces the original static HTML version. The original HTML files have been archived but the same content and visual design are preserved with added mobile responsiveness.
