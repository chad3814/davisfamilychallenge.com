# Specification: Hidden Participants

## Goal
Enable selective visibility of participants in the scoreboard by adding a `show` field to participant entries, filtering display to exclude historical participants no longer involved with the family, while preserving all data for historical accuracy.

## User Stories
- As a site maintainer, I want to hide former significant others from the scoreboard so that only current family members are displayed
- As a site visitor, I want to see lifetime records for active participants without clutter from participants no longer involved

## Specific Requirements

**Add optional `show` field to ScoreboardEntry interface**
- Field name: `show` with type `boolean | undefined`
- Default behavior: if field is absent, treat as `true` (backward compatible)
- Located in `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
- Remove `gamesPlayed` from interface (calculated at runtime, not stored)
- Keep `standing` field in interface for now but deprecate from JSON data

**Update type guard to handle optional show field**
- Modify `isScoreboardData` function in `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
- Remove validation requirement for `standing` field (will be calculated dynamically)
- Add optional validation for `show` field (if present, must be boolean)
- Ensure backward compatibility with existing data lacking `show` field

**Add new participant entries to scoreboard.json**
- Add Steph with record 1-2 (.333), `show: false`
- Add Katie with record 0-1 (.000), `show: false`
- Add Jenelle with record 0-2 (.000), `show: false`
- Add Meredith with record 0-1 (.000), `show: false` (Steph's daughter, no longer in family)
- Calculate winningPercentage to 3 decimal places using wins/(wins+losses)
- Place entries in appropriate position based on alphabetical or performance order

**Mark existing Shep entry as hidden**
- Set `show: false` on Shep's existing entry
- No change to record data (0-1, .000)
- Maintain entry position in JSON array

**Remove hardcoded standing field from all entries**
- Delete `standing` field from all entries in scoreboard.json
- Standings will be calculated at render time instead
- Ensures standings auto-update when visibility changes

**Filter scoreboard display for visible participants**
- In `/Users/cwalker/Projects/davisfamilychallenge.com/components/Scoreboard.tsx`, filter entries before rendering
- Filter logic: `data.entries.filter(entry => entry.show !== false)`
- Apply filter to both desktop table view and mobile card view
- Ensure filtered list flows to both rendering sections

**Calculate standings dynamically at render time**
- Create utility function `calculateStandings` in `/Users/cwalker/Projects/davisfamilychallenge.com/lib/utils.ts`
- Sort visible entries by winningPercentage descending
- Implement tie-handling: same percentage = same standing, next standing skips appropriate ranks
- Example: two tied at 1st means next person is 3rd (not 2nd)
- Return entries with calculated `standing` property

**Display standings in Scoreboard component**
- Add "Standing" column to desktop table view (first column)
- Calculate standings from filtered entries before rendering
- Display standing number for each visible participant
- Maintain current styling and responsive behavior

## Existing Code to Leverage

**calculateWinningPercentage utility function**
- Located in `/Users/cwalker/Projects/davisfamilychallenge.com/lib/utils.ts`
- Use for calculating new participant percentages (Steph, Katie, Jenelle, Meredith)
- Formula: wins / (wins + losses), rounded to 3 decimal places
- Returns 0.0 for participants with no games played

**sortByWinningPercentage utility function**
- Located in `/Users/cwalker/Projects/davisfamilychallenge.com/lib/utils.ts`
- Use as foundation for standings calculation logic
- Already implements descending sort by winningPercentage
- Extend with tie-handling logic for standings assignment

**ScoreboardEntry interface and ParticipantRecord**
- Located in `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
- Existing structure includes participant, record, standing
- Extend with optional `show` field
- ParticipantRecord already has wins, losses, winningPercentage structure

**Scoreboard component filtering pattern**
- Desktop table at lines 14-46 in `/Users/cwalker/Projects/davisfamilychallenge.com/components/Scoreboard.tsx`
- Mobile cards at lines 49-73 in same file
- Both use `data.entries.map()` - convert to `data.entries.filter().map()`
- Maintain existing className and styling patterns

**ParticipantName type union**
- Already includes Steph, Katie, Jenelle, Meredith in `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
- No changes needed to type definitions
- Confirms all new participants are recognized in type system

## Out of Scope
- Do NOT update lastUpdated date in scoreboard.json (only changes with win/loss record updates)
- Do NOT create UI toggle for showing/hiding participants dynamically
- Do NOT build admin interface for managing visibility status
- Do NOT implement historical view showing all participants including hidden ones
- Do NOT modify archive HTML files or "J.D.'s Exes" consolidated entry
- Do NOT add sorting controls or filtering UI for end users
- Do NOT create separate sections for hidden vs visible participants
- Do NOT implement undo/redo functionality for visibility changes
- Do NOT add audit log for visibility status changes
- Do NOT create API endpoints for managing participant visibility
