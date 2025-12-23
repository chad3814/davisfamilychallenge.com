/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const yearsDir = path.join(__dirname, '..', 'data', 'years');
const scoreboardPath = path.join(__dirname, '..', 'data', 'scoreboard.json');

// Track wins and losses for each participant
const records = {};

// Get all year files
const yearFiles = fs.readdirSync(yearsDir)
  .filter(file => file.endsWith('.json'))
  .sort((a, b) => {
    const yearA = parseInt(a.replace('.json', ''));
    const yearB = parseInt(b.replace('.json', ''));
    return yearA - yearB;
  });

console.log(`\n📊 Calculating scoreboard from ${yearFiles.length} years...\n`);

// Process each year
yearFiles.forEach(file => {
  const yearData = JSON.parse(fs.readFileSync(path.join(yearsDir, file), 'utf8'));
  const year = yearData.year;
  const winningTeam = yearData.winners;

  if (!winningTeam) {
    console.log(`⚠️  Year ${year}: No winner specified, skipping`);
    return;
  }

  // Find the winning and losing teams
  const teams = yearData.teams || [];
  const winningTeamData = teams.find(t => t.name === winningTeam);
  const losingTeamData = teams.find(t => t.name !== winningTeam);

  if (!winningTeamData || !losingTeamData) {
    console.log(`⚠️  Year ${year}: Could not find team data, skipping`);
    return;
  }

  // Update records for winners
  winningTeamData.members.forEach(member => {
    // Normalize name - remove (Honory) suffix since it's the same person
    const normalizedName = member.replace(' (Honory)', '');
    if (!records[normalizedName]) {
      records[normalizedName] = { wins: 0, losses: 0 };
    }
    records[normalizedName].wins++;
  });

  // Update records for losers
  losingTeamData.members.forEach(member => {
    // Normalize name - remove (Honory) suffix since it's the same person
    const normalizedName = member.replace(' (Honory)', '');
    if (!records[normalizedName]) {
      records[normalizedName] = { wins: 0, losses: 0 };
    }
    records[normalizedName].losses++;
  });

  console.log(`✅ Year ${year}: ${winningTeam} defeated ${losingTeamData.name}`);
});

// Create scoreboard entries
const entries = Object.entries(records).map(([participant, record]) => ({
  participant,
  record: {
    wins: record.wins,
    losses: record.losses
  },
  // Include show field for hidden participants
  ...(isHiddenParticipant(participant) ? { show: false } : {})
}));

// Sort by winning percentage (descending), then by wins
entries.sort((a, b) => {
  const pctA = a.record.wins / (a.record.wins + a.record.losses);
  const pctB = b.record.wins / (b.record.wins + b.record.losses);
  if (pctA !== pctB) return pctB - pctA;
  return b.record.wins - a.record.wins;
});

// Create scoreboard object
const scoreboard = {
  entries,
  lastUpdated: new Date().toISOString().split('T')[0]
};

// Write to file
fs.writeFileSync(scoreboardPath, JSON.stringify(scoreboard, null, 2), 'utf8');

console.log(`\n💾 Scoreboard updated: ${scoreboardPath}`);
console.log(`📈 Total participants: ${entries.length}`);
console.log(`📅 Last updated: ${scoreboard.lastUpdated}\n`);

// Show top 5
console.log('🏆 Top 5 participants:');
entries.slice(0, 5).forEach((entry, index) => {
  const pct = (entry.record.wins / (entry.record.wins + entry.record.losses)).toFixed(3);
  console.log(`  ${index + 1}. ${entry.participant}: ${entry.record.wins}-${entry.record.losses} (${pct})`);
});

console.log('');

// Helper function to determine if a participant should be hidden
function isHiddenParticipant(name) {
  // Hidden participants - those not in the current regular 7
  // (Cat, Chad, Eddie, Grammy, J.D., Lorelei, Uncle Giant)
  // Plus Captain who has passed away but should remain visible
  const hiddenList = ['Jenelle', 'Katie', 'Meredith', 'Shep', 'Steph'];

  // Check for exact match or if name starts with one of the hidden names
  // This handles variations like "Meredith (Honory)"
  return hiddenList.some(hidden =>
    name === hidden || name.startsWith(hidden + ' ')
  );
}
