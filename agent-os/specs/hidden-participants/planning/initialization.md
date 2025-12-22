# Spec Initialization: Hidden Participants

## Feature Description

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
