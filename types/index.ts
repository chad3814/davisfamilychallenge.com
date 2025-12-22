// Core participant and record types
export interface Participant {
  name: string;
  id: string;
}

export interface ParticipantRecord {
  wins: number;
  losses: number;
  winningPercentage: number;
}

export interface ScoreboardEntry {
  participant: string;
  record: ParticipantRecord;
  standing: number;
  gamesPlayed: number;
}

export interface ScoreboardData {
  entries: ScoreboardEntry[];
  lastUpdated: string;
}

// Year data types
export interface Team {
  name: string;
  members: string[];
}

export interface Game {
  name: string;
  description: string;
  playByPlay?: string;
  scoringTable?: string;
}

export interface YearData {
  year: number;
  ordinalName: string;
  teamScheme: string;
  challengeTheme: string;
  winners: string;
  games: Game[];
  teams: Team[];
  narratives?: string;
  images?: string[];
  videos?: string[];
}

// Accordion component types
export interface AccordionSectionProps {
  year: number;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  id: string;
}

// TOC Navigation component types
export interface TOCNavigationProps {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
  isMobile?: boolean;
}

// Utility types
export type Year = 2006 | 2007 | 2008 | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024;

export type ParticipantName =
  | "J.D."
  | "Chad"
  | "Captain"
  | "Cat"
  | "Uncle Giant"
  | "Lorelei"
  | "Grammy"
  | "Eddie"
  | "Shep"
  | "Steph"
  | "Meredith"
  | "Katie"
  | "Jenelle";

// Type guards for runtime validation
export function isYearData(data: unknown): data is YearData {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as globalThis.Record<string, unknown>;

  return (
    typeof obj.year === 'number' &&
    typeof obj.ordinalName === 'string' &&
    typeof obj.teamScheme === 'string' &&
    typeof obj.challengeTheme === 'string' &&
    typeof obj.winners === 'string' &&
    Array.isArray(obj.games) &&
    Array.isArray(obj.teams)
  );
}

export function isScoreboardData(data: unknown): data is ScoreboardData {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as globalThis.Record<string, unknown>;

  return (
    Array.isArray(obj.entries) &&
    typeof obj.lastUpdated === 'string' &&
    obj.entries.every(entry =>
      typeof entry === 'object' &&
      entry !== null &&
      'participant' in entry &&
      'record' in entry &&
      'standing' in entry
    )
  );
}

export function isParticipantRecord(data: unknown): data is ParticipantRecord {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as globalThis.Record<string, unknown>;

  return (
    typeof obj.wins === 'number' &&
    typeof obj.losses === 'number' &&
    typeof obj.winningPercentage === 'number'
  );
}
