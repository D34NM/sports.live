import { GameSafe, GameScores, Team } from '@/types/game';

export const mockTeams: Record<string, Team> = {
  LAL: {
    id: '1',
    name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
    logoUrl: '/logos/lal.png',
  },
  BOS: {
    id: '2',
    name: 'Boston Celtics',
    abbreviation: 'BOS',
    logoUrl: '/logos/bos.png',
  },
  GSW: {
    id: '3',
    name: 'Golden State Warriors',
    abbreviation: 'GSW',
    logoUrl: '/logos/gsw.png',
  },
  MIA: {
    id: '4',
    name: 'Miami Heat',
    abbreviation: 'MIA',
    logoUrl: '/logos/mia.png',
  },
};

export const mockGames: GameSafe[] = [
  {
    id: 'game-1',
    nbaGameId: 'nba-001',
    homeTeam: mockTeams.LAL,
    awayTeam: mockTeams.BOS,
    gameDate: new Date('2026-01-31T19:00:00Z').toISOString(),
    status: 'scheduled',
    venue: 'Crypto.com Arena',
    broadcasts: ['ESPN', 'NBA TV'],
    createdAt: new Date('2026-01-30').toISOString(),
    updatedAt: new Date('2026-01-30').toISOString(),
  },
  {
    id: 'game-2',
    nbaGameId: 'nba-002',
    homeTeam: mockTeams.GSW,
    awayTeam: mockTeams.MIA,
    gameDate: new Date('2026-01-31T22:00:00Z').toISOString(),
    status: 'live',
    venue: 'Chase Center',
    broadcasts: ['TNT'],
    createdAt: new Date('2026-01-30').toISOString(),
    updatedAt: new Date('2026-01-31T22:15:00Z').toISOString(),
  },
  {
    id: 'game-3',
    nbaGameId: 'nba-003',
    homeTeam: mockTeams.BOS,
    awayTeam: mockTeams.GSW,
    gameDate: new Date('2026-01-30T20:00:00Z').toISOString(),
    status: 'final',
    venue: 'TD Garden',
    broadcasts: ['ESPN'],
    createdAt: new Date('2026-01-29').toISOString(),
    updatedAt: new Date('2026-01-30T23:00:00Z').toISOString(),
  },
];

export const mockScores: Record<string, GameScores> = {
  'game-2': {
    homeScore: 105,
    awayScore: 98,
    quarter: 'Q3',
    timeRemaining: '7:23',
  },
  'game-3': {
    homeScore: 112,
    awayScore: 108,
    quarter: 'Final',
    timeRemaining: '0:00',
  },
};

export class MockNbaApiClient {
  async getSchedule(date: string): Promise<GameSafe[]> {
    const targetDate = new Date(date);
    return mockGames.filter((game) => {
      const gameDate = new Date(game.gameDate);
      return (
        gameDate.getFullYear() === targetDate.getFullYear() &&
        gameDate.getMonth() === targetDate.getMonth() &&
        gameDate.getDate() === targetDate.getDate()
      );
    });
  }

  async getGameScores(gameId: string): Promise<GameScores | null> {
    return mockScores[gameId] || null;
  }

  async getGameById(gameId: string): Promise<GameSafe | null> {
    return mockGames.find((game) => game.id === gameId) || null;
  }
}

export const mockNbaApiClient = new MockNbaApiClient();
