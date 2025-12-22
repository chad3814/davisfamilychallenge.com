# Spec Requirements: Hidden Participants

## Initial Description
The user wants to modify the scoreboard to support hiding certain participants who are no longer involved with the family:

1. **Historical Context:**
   - Over the years, significant others have played but are no longer involved with the family
   - Previously, their stats were kept but not shown in the overall scoreboard table
   - Shep (who is no longer involved with Lorelei) should also be hidden

2. **Requirements:**
   - Modify scoreboard.json to add a "hidden" flag/field to participant entries
   - Keep all historical data (don't delete entries)
   - Mark certain participants as hidden
   - Update Scoreboard component to filter out hidden participants
   - Hidden participants should still exist in the data for historical accuracy

3. **Participants to Hide:**
   - Former significant others (user will identify which ones)
   - Shep (no longer involved with Lorelei)

**Current Context:**
- scoreboard.json contains all participant lifetime records
- Scoreboard component displays all entries
- Data structure uses ScoreboardEntry interface with participant name, record (wins/losses), standing, gamesPlayed

## Requirements Discussion

### First Round Questions

**Q1:** I assume you want hidden participants to be completely invisible in the scoreboard display (not shown at all), rather than shown in a separate "Hidden Participants" section. Is that correct, or would you prefer a collapsed/expandable section showing hidden participants for historical reference?
**Answer:** Completely invisible (not shown at all)

**Q2:** For standings calculation, I'm thinking hidden participants should be excluded from the rankings entirely (so if Shep at standing 9 is hidden, the standings would go 1, 1, 3, 4, 4, 4, 7, 8 without the 9). Should we recalculate standings to be continuous (1, 1, 3, 4, 4, 4, 7, 8 becomes the new sequence), or keep the gaps to preserve historical context?
**Answer:** Calculate standings at render time instead of hardcoding them. Handle ties correctly (e.g., J.D. and Chad tied for first means next person is 3rd, not 2nd)

**Q3:** You mentioned Shep should be hidden. Can you provide the complete list of all participants who should be marked as hidden? Looking at the current scoreboard, I see: J.D., Chad, Captain, Cat, Uncle Giant, Lorelei, Grammy, Eddie, and Shep. Which others beyond Shep need to be hidden?
**Answer:** Need to check original index.html for commented participants. Found "J.D.'s Exes" commented out with record 1-5. User says there are 3-4 others besides Shep. Current participants: J.D., Chad, Captain, Cat, Uncle Giant, Lorelei, Grammy, Eddie, Shep.

**Q4:** I assume the "hidden" field should be an optional boolean flag in the JSON (defaulting to false if not present) to maintain backward compatibility. Is that correct, or would you prefer a different approach?
**Answer:** Use positive option instead of negative - add optional `show` property (defaults to true if not present). Hidden participants have `show: false`

**Q5:** Should the "lastUpdated" date in scoreboard.json be automatically updated when we mark participants as hidden, or should that only update when win/loss records change?
**Answer:** Only update when win/loss records change, not when marking participants as hidden

**Q6:** For the types, I'm thinking we should add the "hidden" field to the ScoreboardEntry interface and update the type guard accordingly. Any preference on whether this should be a required or optional field in TypeScript?
**Answer:** `show` should be optional field in ScoreboardEntry

### Existing Code to Reference

No similar existing features identified for reference.

### Follow-up Questions

**Follow-up 1:** I found "J.D.'s Exes" (1-5 record) commented out in archive/html/index.html. You mentioned there are 3-4 hidden participants total besides Shep. Can you provide the complete list of all participants who should be marked with `show: false`?
**Answer:** The complete list of hidden participants is:
1. Shep (0-1, no longer involved with Lorelei)
2. Steph (1-2, ex)
3. Katie (0-1, ex)
4. Jenelle (0-2, ex)

**Clarification:** Meredith (0-1) is NOT an ex - she's Steph's daughter, so she should remain visible.

**Verification:** The individual ex records sum to 1-5 (1 win, 5 losses), which matches the "J.D.'s Exes" consolidated entry (1-5) from archive/html/index.html.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
No visual assets provided.

## Requirements Summary

### Functional Requirements
- Add optional `show?: boolean` property to ScoreboardEntry interface (defaults to true if not present)
- Add new participant entries to scoreboard.json for: Steph (1-2), Katie (0-1), Jenelle (0-2), Meredith (0-1)
- Mark hidden participants with `show: false`: Shep, Steph, Katie, Jenelle
- Filter out entries with `show: false` from display in Scoreboard component
- Calculate standings dynamically at render time based on visible participants only
- Handle ties correctly in standings (tied participants get same rank, next rank skips appropriately)
- Preserve all historical data in scoreboard.json (no deletion of entries)
- Calculate winning percentages for new entries (to 3 decimal places)

### Reusability Opportunities
No existing patterns identified to reuse.

### Scope Boundaries

**In Scope:**
- Add `show?: boolean` property to ScoreboardEntry TypeScript interface
- Update type guard (isScoreboardData) to handle optional `show` field
- Add new entries to scoreboard.json for: Steph, Katie, Jenelle, Meredith
- Mark Shep, Steph, Katie, Jenelle with `show: false` in scoreboard.json
- Update Scoreboard.tsx component to filter entries where `show !== false`
- Remove hardcoded `standing` field from scoreboard.json entries
- Implement dynamic standings calculation at render time
- Implement correct tie-handling logic for standings (same percentage = same standing, next standing skips ranks)

**Out of Scope:**
- Updating lastUpdated date (only changes with win/loss record updates)
- UI for toggling visibility of hidden participants
- Admin interface for managing hidden status
- Historical view showing hidden participants
- Changing the "J.D.'s Exes" consolidated entry in archive files

### Technical Considerations
- Maintain backward compatibility by making `show` optional (defaults to true if not present)
- Standings should be calculated dynamically at render time, not stored in JSON
- Remove the hardcoded `standing` field from JSON entries since it will be calculated
- Tie-handling: participants with same winning percentage get same standing, next standing number accounts for number of tied participants (e.g., two people tied for 1st means next person is 3rd)
- Filter logic: `data.entries.filter(entry => entry.show !== false)` to show entries by default
- Winning percentage calculation: wins / (wins + losses), formatted to 3 decimal places
- Sort order for display: highest winning percentage first (descending)

### Participant Data Reference

**Hidden Participants (show: false):**
1. Shep: 0-1 (.000) - already exists in scoreboard.json, no longer with Lorelei
2. Steph: 1-2 (.333) - needs to be added, no longer in family
3. Katie: 0-1 (.000) - needs to be added, no longer in family
4. Jenelle: 0-2 (.000) - needs to be added, no longer in family
5. Meredith: 0-1 (.000) - needs to be added, Steph's daughter, no longer in family

**Visible Participants (show: true or field omitted):**
1. J.D.: 12-7 (.632)
2. Chad: 12-7 (.632)
3. Captain: 9-6 (.600)
4. Cat: 10-9 (.526)
5. Uncle Giant: 10-9 (.526)
6. Lorelei: 10-9 (.526)
7. Grammy: 7-12 (.368)
8. Eddie: 4-8 (.333)
