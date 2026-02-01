export type GameStatus = 'scheduled' | 'live' | 'final';

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl?: string;
}

export interface GameSafe {
  id: string;
  nbaGameId: string;
  homeTeam: Team;
  awayTeam: Team;
  gameDate: string;
  status: GameStatus;
  venue?: string;
  broadcasts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GameScores {
  homeScore: number;
  awayScore: number;
  quarter?: string;
  timeRemaining?: string;
}

export interface GameWithScores extends GameSafe {
  scores: GameScores;
}

export interface GameRating {
  id: string;
  gameId: string;
  userId?: string;
  rating: number;
  voteType: 'up' | 'down';
  createdAt: string;
}

export interface SavedGame {
  id: string;
  userId: string;
  gameId: string;
  notes?: string;
  tags?: string[];
  createdAt: string;
}
