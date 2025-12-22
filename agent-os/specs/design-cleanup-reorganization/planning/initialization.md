# Spec Initialization: Design Cleanup and Reorganization

## Feature Description

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

## Created
2025-12-22
