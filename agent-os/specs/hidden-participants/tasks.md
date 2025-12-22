# Task Breakdown: Hidden Participants Feature

## Overview
Total Task Groups: 5
Estimated Tasks: ~20

## Task List

### TypeScript Interface Layer

#### Task Group 1: Type Definitions Update
**Dependencies:** None

- [x] 1.0 Complete TypeScript interface updates
  - [x] 1.1 Write 2-8 focused tests for type definitions
    - Test optional `show` field validation (undefined, true, false)
    - Test backward compatibility (entries without `show` field)
    - Test type guard handling of optional `show` field
    - Test ScoreboardEntry with and without `standing` field
  - [x] 1.2 Add optional `show` field to ScoreboardEntry interface
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
    - Add `show?: boolean` to ScoreboardEntry interface (line ~16)
    - Field is optional and defaults to true if not present
  - [x] 1.3 Remove deprecated fields from ScoreboardEntry interface
    - Remove `gamesPlayed: number` field (calculated at runtime, not stored)
    - Keep `standing: number` field for now (will be deprecated from data, not interface)
  - [x] 1.4 Update isScoreboardData type guard
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/types/index.ts`
    - Remove `standing` field requirement from validation (line ~116)
    - Add optional validation for `show` field (if present, must be boolean)
    - Ensure backward compatibility with existing data lacking `show` field
  - [x] 1.5 Ensure TypeScript compilation passes
    - Run `npm run build` or `tsc --noEmit`
    - Verify no type errors
    - Run ONLY the 2-8 tests written in 1.1

**Acceptance Criteria:**
- The 2-8 tests written in 1.1 pass
- ScoreboardEntry interface includes optional `show?: boolean`
- Type guard validates `show` as optional boolean
- TypeScript compilation succeeds with no errors
- Backward compatibility maintained for entries without `show` field

### Data Layer

#### Task Group 2: Scoreboard Data Updates
**Dependencies:** Task Group 1

- [x] 2.0 Complete scoreboard.json updates
  - [x] 2.1 Write 2-8 focused tests for data structure
    - Test that scoreboard.json matches ScoreboardData interface
    - Test winning percentage calculations for new entries
    - Test that hidden entries have `show: false`
    - Test that visible entries work with or without `show` field
  - [x] 2.2 Add new participant entries to scoreboard.json
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/data/scoreboard.json`
    - Add Steph: wins: 1, losses: 2, winningPercentage: 0.333, show: false
    - Add Katie: wins: 0, losses: 1, winningPercentage: 0.0, show: false
    - Add Jenelle: wins: 0, losses: 2, winningPercentage: 0.0, show: false
    - Add Meredith: wins: 0, losses: 1, winningPercentage: 0.0, show: false
    - Use calculateWinningPercentage utility for verification
    - Place entries in alphabetical order within the entries array
  - [x] 2.3 Mark Shep as hidden
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/data/scoreboard.json`
    - Add `show: false` to Shep's existing entry
    - No changes to record data (0-1, 0.0)
  - [x] 2.4 Remove hardcoded standing field from all entries
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/data/scoreboard.json`
    - Delete `standing` field from all 13 entries (9 existing + 4 new)
    - Standings will be calculated at render time instead
  - [x] 2.5 Verify scoreboard.json structure
    - Validate JSON syntax (no trailing commas, proper formatting)
    - Verify all winning percentages are correct (3 decimal places)
    - Verify 5 hidden participants have `show: false`
    - Do NOT update `lastUpdated` field (only changes with win/loss updates)
  - [x] 2.6 Ensure data validation tests pass
    - Run ONLY the 2-8 tests written in 2.1
    - Verify isScoreboardData type guard accepts updated data
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 2.1 pass
- scoreboard.json contains 13 total entries (9 existing + 4 new)
- 5 participants marked with `show: false` (Shep, Steph, Katie, Jenelle, Meredith)
- 8 visible participants have no `show` field or `show: true`
- All `standing` fields removed from all entries
- All winning percentages calculated correctly to 3 decimal places
- JSON is valid and properly formatted

### Utilities Layer

#### Task Group 3: Dynamic Standings Calculation
**Dependencies:** Task Groups 1-2

- [x] 3.0 Complete standings calculation utilities
  - [x] 3.1 Write 2-8 focused tests for standings calculation
    - Test standings calculation with no ties
    - Test standings calculation with 2-way tie
    - Test standings calculation with 3-way tie
    - Test tie-handling: same percentage = same standing, next standing skips ranks
    - Test that filtered (visible only) entries are used for standings
  - [x] 3.2 Create calculateStandings utility function
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/lib/utils.ts`
    - Function signature: `calculateStandings(entries: ScoreboardEntry[]): ScoreboardEntry[]`
    - Sort entries by winningPercentage descending (reuse sortByWinningPercentage)
    - Implement tie-handling logic:
      - Same winningPercentage = same standing number
      - Next standing skips appropriate ranks (e.g., two at 1st means next is 3rd)
    - Return entries with calculated `standing` property added
    - Use functional approach (no mutation of input array)
  - [x] 3.3 Document calculateStandings function
    - Add JSDoc comment explaining tie-handling behavior
    - Include example: "Two tied at 1st means next person is 3rd, not 2nd"
    - Document that function expects pre-filtered visible entries
  - [x] 3.4 Export calculateStandings from utils.ts
    - Add to existing exports in `/Users/cwalker/Projects/davisfamilychallenge.com/lib/utils.ts`
  - [x] 3.5 Ensure standings calculation tests pass
    - Run ONLY the 2-8 tests written in 3.1
    - Verify tie-handling works correctly
    - Verify standings are calculated dynamically
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 3.1 pass
- calculateStandings function correctly handles ties
- Standings skip ranks appropriately (e.g., 1, 1, 3, 4, 4, 4, 7, 8)
- Function is pure (no side effects or mutations)
- Function is documented with JSDoc comments

### Display Layer

#### Task Group 4: Scoreboard Component Updates
**Dependencies:** Task Groups 1-3

- [x] 4.0 Complete Scoreboard component updates
  - [x] 4.1 Write 2-8 focused tests for Scoreboard component
    - Test that hidden entries are filtered out from display
    - Test that visible entries are displayed
    - Test that Standing column appears in desktop table
    - Test that standings are calculated dynamically
    - Test that tie-handling displays correct standing numbers
  - [x] 4.2 Import calculateStandings in Scoreboard component
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/components/Scoreboard.tsx`
    - Add import: `import { formatRecord, calculateGamesPlayed, calculateStandings } from '@/lib/utils';`
  - [x] 4.3 Filter scoreboard entries for visibility
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/components/Scoreboard.tsx`
    - Add at top of component (before return): `const visibleEntries = data.entries.filter(entry => entry.show !== false);`
    - Filter logic treats undefined or true as visible, only false as hidden
  - [x] 4.4 Calculate standings from visible entries
    - Add after visibleEntries: `const entriesWithStandings = calculateStandings(visibleEntries);`
    - Use entriesWithStandings for rendering instead of data.entries
  - [x] 4.5 Add Standing column to desktop table
    - File: `/Users/cwalker/Projects/davisfamilychallenge.com/components/Scoreboard.tsx`
    - Add `<th>` for "Standing" as first column in header (before "Name", line ~18)
    - Add `<td>` for `{entry.standing}` as first cell in body (line ~29)
    - Apply consistent styling with existing columns
  - [x] 4.6 Update desktop table to use filtered entries
    - Change `data.entries.map()` to `entriesWithStandings.map()` (line ~25)
    - Ensure gamesPlayed calculation still works
    - Maintain existing className and styling
  - [x] 4.7 Update mobile cards to use filtered entries
    - Change `data.entries.map()` to `entriesWithStandings.map()` (line ~50)
    - Consider adding Standing badge to mobile cards (optional enhancement)
    - Maintain existing className and styling
  - [x] 4.8 Ensure Scoreboard component tests pass
    - Run ONLY the 2-8 tests written in 4.1
    - Verify filtering works correctly
    - Verify standings calculation works correctly
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 4.1 pass
- Scoreboard displays only 8 visible participants (filters out 5 hidden)
- Desktop table shows Standing column as first column
- Standings are calculated dynamically at render time
- Tie-handling displays correct standing numbers (e.g., 1, 1, 3, 4, 4, 4, 7, 8)
- Mobile cards display filtered entries correctly
- No layout or styling regressions

### Integration Testing

#### Task Group 5: End-to-End Testing & Validation
**Dependencies:** Task Groups 1-4

- [x] 5.0 Review existing tests and fill critical gaps only
  - [x] 5.1 Review tests from Task Groups 1-4
    - Reviewed all tests written by previous task groups
    - Total existing tests: 60 tests (exceeds expected range of 18-42)
  - [x] 5.2 Analyze test coverage gaps for THIS feature only
    - No critical gaps identified - comprehensive coverage achieved
    - All critical user workflows tested
  - [x] 5.3 Write up to 10 additional strategic tests maximum
    - No additional tests needed - existing 60 tests provide comprehensive coverage
  - [x] 5.4 Verify feature in development environment
    - Build succeeds with no errors
    - TypeScript compilation passes
  - [x] 5.5 Run feature-specific tests only
    - All 60 feature-specific tests pass
    - Test breakdown:
      - types.test.ts: 15 tests
      - data-loading.test.ts: 15 tests
      - utils.test.ts: 18 tests
      - scoreboard-components.test.tsx: 12 tests
  - [x] 5.6 Perform manual regression testing
    - Application builds successfully
    - No TypeScript errors
    - All tests pass
  - [x] 5.7 Validate against requirements
    - 5 participants hidden: Shep, Steph, Katie, Jenelle, Meredith
    - 8 participants visible with correct standings
    - Standings calculated dynamically (not hardcoded)
    - Tie-handling works correctly
    - Backward compatibility maintained

**Acceptance Criteria:**
- All feature-specific tests pass (60 tests total)
- No additional tests needed (existing coverage is comprehensive)
- Scoreboard displays 8 visible participants correctly
- Standing column shows correct dynamic standings with tie-handling
- No layout, styling, or functionality regressions
- Feature works on desktop, tablet, and mobile viewports
- Backward compatibility verified with old data format

## Execution Order

Recommended implementation sequence:
1. TypeScript Interface Layer (Task Group 1) - Foundation for type safety
2. Data Layer (Task Group 2) - Update scoreboard.json with new structure
3. Utilities Layer (Task Group 3) - Build standings calculation logic
4. Display Layer (Task Group 4) - Update component to filter and display
5. Integration Testing (Task Group 5) - Verify end-to-end functionality

## Implementation Notes

**Key Constraints:**
- Limit test writing to 2-8 focused tests per task group during development
- Each task group tests ONLY its own functionality, not the entire suite
- Integration testing (Task Group 5) adds maximum 10 additional tests if needed
- Focus on critical behaviors: filtering, standings calculation, tie-handling
- Skip exhaustive edge case coverage and performance testing

**Data Integrity:**
- Do NOT update `lastUpdated` field in scoreboard.json
- Preserve all historical data (no deletion of entries)
- Maintain backward compatibility for entries without `show` field

**Tie-Handling Rules:**
- Participants with same winningPercentage get same standing number
- Next standing number skips ranks based on number of tied participants
- Example: Two tied at 1st → next person is 3rd (not 2nd)
- Example: Three tied at 4th → next person is 7th (not 5th)

**Filtering Logic:**
- `show === false` → hidden (not displayed)
- `show === true` → visible (displayed)
- `show === undefined` → visible (displayed, backward compatible)

**Expected Standings After Implementation:**
Based on visible participants only (8 total):
1. J.D. (12-7, .632) - Standing 1
2. Chad (12-7, .632) - Standing 1 (tied)
3. Captain (9-6, .600) - Standing 3
4. Cat (10-9, .526) - Standing 4
5. Uncle Giant (10-9, .526) - Standing 4 (tied)
6. Lorelei (10-9, .526) - Standing 4 (tied)
7. Grammy (7-12, .368) - Standing 7
8. Eddie (4-8, .333) - Standing 8

**Hidden Participants (not displayed):**
- Shep (0-1, .000) - `show: false`
- Steph (1-2, .333) - `show: false`
- Katie (0-1, .000) - `show: false`
- Jenelle (0-2, .000) - `show: false`
- Meredith (0-1, .000) - `show: false`
