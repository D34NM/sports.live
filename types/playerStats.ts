export interface PlayerStats {
  playerId: string;
  playerName: string;
  jerseyNumber: string;
  position: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fouls: number;
  minutes: string;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
}

export interface GamePlayerStats {
  gameId: string;
  homeTeamStats: PlayerStats[];
  awayTeamStats: PlayerStats[];
}
