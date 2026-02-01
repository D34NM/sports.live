/**
 * Mock data fixtures for testing and development
 * Provides various game scenarios for comprehensive testing
 */

import { GameSafe, GameScores, GameWithScores } from '@/types/game';

/**
 * Classic rivalry game - Lakers vs Celtics
 */
export const RIVALRY_GAME_FINAL: GameWithScores = {
  id: 'game-rivalry-lal-bos',
  nbaGameId: 'nba-2026-01-25-LAL-BOS',
  homeTeam: {
    id: 'BOS',
    name: 'Boston Celtics',
    abbreviation: 'BOS',
  },
  awayTeam: {
    id: 'LAL',
    name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
  },
  gameDate: new Date('2026-01-25T19:30:00Z').toISOString(),
  status: 'final',
  venue: 'TD Garden',
  broadcasts: ['ABC', 'ESPN'],
  createdAt: new Date('2026-01-24T12:00:00Z').toISOString(),
  updatedAt: new Date('2026-01-25T22:30:00Z').toISOString(),
  scores: {
    homeScore: 118,
    awayScore: 115,
    quarter: 'Final',
    timeRemaining: undefined,
  },
};

/**
 * Exciting overtime game
 */
export const OVERTIME_GAME: GameWithScores = {
  id: 'game-overtime-gsw-phx',
  nbaGameId: 'nba-2026-01-26-GSW-PHX',
  homeTeam: {
    id: 'PHX',
    name: 'Phoenix Suns',
    abbreviation: 'PHX',
  },
  awayTeam: {
    id: 'GSW',
    name: 'Golden State Warriors',
    abbreviation: 'GSW',
  },
  gameDate: new Date('2026-01-26T22:00:00Z').toISOString(),
  status: 'final',
  venue: 'Footprint Center',
  broadcasts: ['TNT', 'League Pass'],
  createdAt: new Date('2026-01-25T12:00:00Z').toISOString(),
  updatedAt: new Date('2026-01-27T01:15:00Z').toISOString(),
  scores: {
    homeScore: 135,
    awayScore: 132,
    quarter: 'OT',
    timeRemaining: undefined,
  },
};

/**
 * Currently live game in the 3rd quarter
 */
export const LIVE_GAME_3RD_QUARTER: GameSafe = {
  id: 'game-live-mia-mil',
  nbaGameId: 'nba-2026-02-01-MIA-MIL',
  homeTeam: {
    id: 'MIL',
    name: 'Milwaukee Bucks',
    abbreviation: 'MIL',
  },
  awayTeam: {
    id: 'MIA',
    name: 'Miami Heat',
    abbreviation: 'MIA',
  },
  gameDate: new Date().toISOString(), // Current time
  status: 'live',
  venue: 'Fiserv Forum',
  broadcasts: ['ESPN', 'Local'],
  createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const LIVE_GAME_3RD_QUARTER_SCORES: GameScores = {
  homeScore: 82,
  awayScore: 79,
  quarter: '3rd',
  timeRemaining: '5:42',
};

/**
 * Upcoming game scheduled for tonight
 */
export const SCHEDULED_GAME_TONIGHT: GameSafe = {
  id: 'game-scheduled-bkn-phi',
  nbaGameId: 'nba-2026-02-01-BKN-PHI',
  homeTeam: {
    id: 'PHI',
    name: 'Philadelphia 76ers',
    abbreviation: 'PHI',
  },
  awayTeam: {
    id: 'BKN',
    name: 'Brooklyn Nets',
    abbreviation: 'BKN',
  },
  gameDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
  status: 'scheduled',
  venue: 'Wells Fargo Center',
  broadcasts: ['TNT'],
  createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * High-scoring game
 */
export const HIGH_SCORING_GAME: GameWithScores = {
  id: 'game-high-score-sac-dal',
  nbaGameId: 'nba-2026-01-20-SAC-DAL',
  homeTeam: {
    id: 'DAL',
    name: 'Dallas Mavericks',
    abbreviation: 'DAL',
  },
  awayTeam: {
    id: 'SAC',
    name: 'Sacramento Kings',
    abbreviation: 'SAC',
  },
  gameDate: new Date('2026-01-20T20:30:00Z').toISOString(),
  status: 'final',
  venue: 'American Airlines Center',
  broadcasts: ['NBA TV'],
  createdAt: new Date('2026-01-19T12:00:00Z').toISOString(),
  updatedAt: new Date('2026-01-20T23:30:00Z').toISOString(),
  scores: {
    homeScore: 142,
    awayScore: 138,
    quarter: 'Final',
    timeRemaining: undefined,
  },
};

/**
 * Low-scoring defensive battle
 */
export const LOW_SCORING_GAME: GameWithScores = {
  id: 'game-low-score-det-ind',
  nbaGameId: 'nba-2026-01-18-DET-IND',
  homeTeam: {
    id: 'IND',
    name: 'Indiana Pacers',
    abbreviation: 'IND',
  },
  awayTeam: {
    id: 'DET',
    name: 'Detroit Pistons',
    abbreviation: 'DET',
  },
  gameDate: new Date('2026-01-18T19:00:00Z').toISOString(),
  status: 'final',
  venue: 'Gainbridge Fieldhouse',
  broadcasts: ['Local'],
  createdAt: new Date('2026-01-17T12:00:00Z').toISOString(),
  updatedAt: new Date('2026-01-18T22:00:00Z').toISOString(),
  scores: {
    homeScore: 88,
    awayScore: 85,
    quarter: 'Final',
    timeRemaining: undefined,
  },
};

/**
 * Blowout game
 */
export const BLOWOUT_GAME: GameWithScores = {
  id: 'game-blowout-okc-por',
  nbaGameId: 'nba-2026-01-22-OKC-POR',
  homeTeam: {
    id: 'POR',
    name: 'Portland Trail Blazers',
    abbreviation: 'POR',
  },
  awayTeam: {
    id: 'OKC',
    name: 'Oklahoma City Thunder',
    abbreviation: 'OKC',
  },
  gameDate: new Date('2026-01-22T22:00:00Z').toISOString(),
  status: 'final',
  venue: 'Moda Center',
  broadcasts: ['League Pass'],
  createdAt: new Date('2026-01-21T12:00:00Z').toISOString(),
  updatedAt: new Date('2026-01-22T23:45:00Z').toISOString(),
  scores: {
    homeScore: 98,
    awayScore: 128,
    quarter: 'Final',
    timeRemaining: undefined,
  },
};

/**
 * Collection of all fixture scenarios
 */
export const ALL_FIXTURES: GameSafe[] = [
  RIVALRY_GAME_FINAL,
  OVERTIME_GAME,
  LIVE_GAME_3RD_QUARTER,
  SCHEDULED_GAME_TONIGHT,
  HIGH_SCORING_GAME,
  LOW_SCORING_GAME,
  BLOWOUT_GAME,
];

/**
 * Get scores for a fixture by ID
 */
export function getFixtureScores(gameId: string): GameScores | null {
  const game = ALL_FIXTURES.find(g => g.id === gameId);
  if (!game) return null;
  
  if ('scores' in game) {
    return (game as GameWithScores).scores;
  }
  
  if (game.id === LIVE_GAME_3RD_QUARTER.id) {
    return LIVE_GAME_3RD_QUARTER_SCORES;
  }
  
  return null;
}
