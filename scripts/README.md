# Year Data Entry Form

A local HTML form for creating year data JSON files for the Davis Family Challenge site.

## Two Usage Options

### Option 1: With Server (Recommended - Auto-saves to correct location)

1. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

2. **Start the form server**:
   ```bash
   npm run form-server
   ```

3. **Open the form**:
   - **New year**: `http://localhost:3001` (defaults to current year)
   - **Edit existing**: `http://localhost:3001?year=2024` (loads that year's data)
   - **Specific year**: `http://localhost:3001?year=2025` (creates new or edits existing)

4. **Fill out the form** and click **"💾 Save to Server"**
   - Data is saved directly to `/data/years/YYYY.json`
   - No need to move files manually!
   - Warns if file already exists

### Option 2: Standalone HTML (No server needed)

1. **Open the form**: Double-click `year-data-form.html` or open it in your browser
2. **Fill out the form**
3. **Click "Download JSON"** to save as `YYYY.json`
4. **Manually move** the file to `/data/years/`

## Features

- ✅ **📖 Load & Edit** - URL parameter support: `?year=2024` loads existing data for editing
- ✅ **💾 Server mode** - Save directly to `data/years/` with one click (no file management!)
- ✅ **🎲 Random team generator** - Teams are randomized on every page load (4-3 or 3-4 split)
- ✅ **Radio button team assignments** - Assign the 7 regular participants to teams with no typing (prevents typos!)
- ✅ **Live team preview** - See team rosters update as you assign members
- ✅ **Re-randomize button** - Don't like the random draw? Click "🎲 Randomize Teams" to shuffle again
- ✅ **Smart winner dropdown** - Automatically populated from team names you enter
- ✅ Two teams side-by-side (always 2 teams)
- ✅ Minimum 3 games required (can add more)
- ✅ Dynamic add/remove for games
- ✅ JSON preview before save/download
- ✅ Copy to clipboard option
- ✅ Helpful tooltips and examples
- ✅ Responsive design
- ✅ Works standalone or with server

## Tips

- **Editing Previous Years**: Add `?year=2024` to the URL to load and edit that year's data
- **New Year Defaults to Current**: Opening without a year parameter defaults to the current year
- **Fix Mistakes**: Made a typo in 2023? Load it with `?year=2023`, fix it, and save
- **Random Teams**: Every page load generates a fresh random team split (max 4 per team). You can use this as your actual team draw!
- **Re-randomize**: Click the "🎲 Randomize Teams" button anytime to shuffle teams again
- **Manual Adjustments**: Feel free to manually adjust the radio buttons if you want to tweak the random assignments
- **Additional Members**: Use the "Additional Members" field only if you have guest/substitute players
- The form initializes with 3 games - add more as needed with the "+ Add Game" button
- Use markdown in narratives, play-by-play, and scoring tables
- Images/videos are filenames only (place actual files in `/public/images/` or `/public/videos/`)
- You can reset the form at any time (with confirmation)

## After Creating/Editing Year Data

1. **Update the scoreboard**:
   ```bash
   npm run update-scoreboard
   ```
   This automatically calculates wins/losses for all participants based on all year files.

2. **If adding a new year**, also update:
   - `lib/data.ts` - Add year to `VALID_YEARS` array
   - `types/index.ts` - Add year to `Year` union type
   - `__tests__/data-loading.test.ts` - Update expected year count

3. **Test and build**:
   ```bash
   npm test
   npm run build
   ```
