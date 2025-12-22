#!/usr/bin/env python3
"""
Script to extract data from HTML files and convert to JSON format
for the Davis Family Challenge website migration.
"""

import json
import re
from html.parser import HTMLParser
from pathlib import Path


class YearHTMLParser(HTMLParser):
    """Parse a year HTML file to extract structured data."""

    def __init__(self):
        super().__init__()
        self.current_tag = None
        self.current_game = None
        self.games = []
        self.year_title = ""
        self.in_game_section = False
        self.current_text = []

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag

    def handle_endtag(self, tag):
        if tag == 'h2' and self.in_game_section:
            # Finalize previous game if exists
            if self.current_game:
                self.games.append(self.current_game)
        self.current_tag = None

    def handle_data(self, data):
        data = data.strip()
        if not data:
            return

        if self.current_tag == 'h1' and not self.year_title:
            self.year_title = data
        elif self.current_tag == 'h2':
            # Start a new game
            if self.current_game:
                self.games.append(self.current_game)
            # Parse game name from h2 like "Cat's Game: Christmas Slots"
            match = re.match(r"(?:.*?[:']\s*)?(.+)", data)
            game_name = match.group(1) if match else data
            self.current_game = {
                'name': game_name,
                'description': ''
            }
            self.in_game_section = True
        elif self.current_tag == 'p' and self.current_game:
            if self.current_game['description']:
                self.current_game['description'] += '\n\n'
            self.current_game['description'] += data


def extract_year_data(year: int, html_file: Path) -> dict:
    """Extract data from a year HTML file."""

    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    parser = YearHTMLParser()
    parser.feed(html_content)

    # If there's a game still being processed, add it
    if parser.current_game:
        parser.games.append(parser.current_game)

    # Map year numbers to ordinal names
    ordinals = {
        2006: 'First',
        2007: 'Second',
        2008: 'Third',
        2009: 'Fourth',
        2010: 'Fifth',
        2011: 'Sixth',
        2012: 'Seventh',
        2013: 'Eighth',
        2014: 'Ninth',
        2015: 'Tenth',
        2016: 'Eleventh',
        2017: 'Twelfth',
        2018: 'Thirteenth',
        2019: 'Fourteenth',
        2020: 'Fifteenth',
        2021: 'Sixteenth',
        2022: 'Seventeenth',
        2023: 'Eighteenth',
        2024: 'Nineteenth'
    }

    ordinal_name = f"{ordinals.get(year, 'Unknown')} Annual Davis Family Challenge"

    # Extract team and game information from index.html summary
    # We'll do this separately for each year
    teams_data = extract_teams_from_index(year)

    return {
        'year': year,
        'ordinalName': ordinal_name,
        'teamScheme': teams_data.get('teamScheme', ''),
        'challengeTheme': teams_data.get('challengeTheme', ''),
        'winners': teams_data.get('winners', ''),
        'games': parser.games,
        'teams': teams_data.get('teams', [])
    }


def extract_teams_from_index(year: int) -> dict:
    """Extract team scheme, theme, winners, and team rosters from index.html."""

    index_file = Path(__file__).parent.parent / 'index.html'

    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the year section
    year_pattern = rf'<h2><a href="{year}\.html">{year}</a></h2>(.*?)(?=<h2>|</body>)'
    year_match = re.search(year_pattern, content, re.DOTALL)

    if not year_match:
        return {}

    year_section = year_match.group(1)

    # Extract team scheme
    team_scheme_match = re.search(r'<th>Team Scheme</th>\s*<td>(.*?)</td>', year_section, re.DOTALL)
    team_scheme = team_scheme_match.group(1).strip() if team_scheme_match else ''

    # Extract challenge theme
    theme_match = re.search(r'<th>Challenge Theme</th>\s*<td>(.*?)</td>', year_section, re.DOTALL)
    challenge_theme = theme_match.group(1).strip() if theme_match else ''

    # Extract winners
    winners_match = re.search(r'<th>Winners</th>\s*<td>(.*?)</td>', year_section, re.DOTALL)
    winners = winners_match.group(1).strip() if winners_match else ''

    # Extract teams
    teams = []
    team_headers = re.findall(r'<th>([^<]+?(?:Team|Cards|Timers|Youngins|Jobs|Boys|Girls|Parents|Winners|Losers|Underdogs|Awesome|Plan B|A|B|Heads|Tails|Married|Unmarried|Catchers|Tossers|Bacon|Music Box).*?)</th>', year_section)

    if team_headers:
        # Try to extract team rosters
        for team_name in team_headers[:2]:  # Usually two teams
            team_name = re.sub(r'&nbsp;', '', team_name).strip()
            teams.append({
                'name': team_name,
                'members': []
            })

        # Extract member rows
        member_pattern = r'<tr>\s*<td>(.*?)</td>\s*<td>(.*?)</td>\s*</tr>'
        member_rows = re.findall(member_pattern, year_section, re.DOTALL)

        for row in member_rows:
            member1 = re.sub(r'<.*?>|&nbsp;', '', row[0]).strip()
            member2 = re.sub(r'<.*?>|&nbsp;', '', row[1]).strip()

            if member1 and len(teams) > 0:
                teams[0]['members'].append(member1)
            if member2 and len(teams) > 1:
                teams[1]['members'].append(member2)

    return {
        'teamScheme': team_scheme,
        'challengeTheme': challenge_theme,
        'winners': winners,
        'teams': teams
    }


def extract_scoreboard() -> dict:
    """Extract scoreboard data from index.html."""

    index_file = Path(__file__).parent.parent / 'index.html'

    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract scoreboard table
    scoreboard_pattern = r'<h1>Score Board</h1>\s*<table[^>]*>(.*?)</table>'
    scoreboard_match = re.search(scoreboard_pattern, content, re.DOTALL)

    if not scoreboard_match:
        return {'entries': [], 'lastUpdated': '2024-12-22'}

    table_content = scoreboard_match.group(1)

    # Extract rows
    row_pattern = r'<tr>\s*<td class="name">(.*?)</td>\s*<td class="number">(.*?)</td>\s*<td class="number">(.*?)</td>\s*</tr>'
    rows = re.findall(row_pattern, table_content, re.DOTALL)

    entries = []
    for row in rows:
        participant = row[0].strip()
        record_str = row[1].strip()
        standing = row[2].strip()

        # Parse record like "12-7 (.632)"
        record_match = re.match(r'(\d+)-(\d+)\s*\(?([\d.]+)', record_str)
        if record_match:
            wins = int(record_match.group(1))
            losses = int(record_match.group(2))
            win_pct = float(record_match.group(3))

            entries.append({
                'participant': participant,
                'record': {
                    'wins': wins,
                    'losses': losses,
                    'winningPercentage': win_pct
                },
                'standing': int(standing) if standing.isdigit() else 0
            })

    return {
        'entries': entries,
        'lastUpdated': '2024-12-22'
    }


def main():
    """Main extraction function."""

    base_dir = Path(__file__).parent.parent
    data_dir = base_dir / 'data'
    years_dir = data_dir / 'years'

    # Create directories
    years_dir.mkdir(parents=True, exist_ok=True)

    # Extract scoreboard
    print("Extracting scoreboard data...")
    scoreboard = extract_scoreboard()
    with open(data_dir / 'scoreboard.json', 'w', encoding='utf-8') as f:
        json.dump(scoreboard, f, indent=2)
    print(f"  ✓ Saved scoreboard.json ({len(scoreboard['entries'])} participants)")

    # Extract each year
    for year in range(2006, 2025):
        html_file = base_dir / f'{year}.html'
        if not html_file.exists():
            print(f"  ✗ Skipping {year} (file not found)")
            continue

        print(f"Extracting data for {year}...")
        year_data = extract_year_data(year, html_file)

        output_file = years_dir / f'{year}.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(year_data, f, indent=2)

        print(f"  ✓ Saved {year}.json ({len(year_data['games'])} games, {len(year_data['teams'])} teams)")

    print("\n✓ Data extraction complete!")


if __name__ == '__main__':
    main()
