import { GameSafe } from '@/types/game';

const NBA_TEAMS = [
  { id: '1', name: 'Los Angeles Lakers', abbreviation: 'LAL' },
  { id: '2', name: 'Boston Celtics', abbreviation: 'BOS' },
  { id: '3', name: 'Golden State Warriors', abbreviation: 'GSW' },
  { id: '4', name: 'Miami Heat', abbreviation: 'MIA' },
  { id: '5', name: 'Milwaukee Bucks', abbreviation: 'MIL' },
  { id: '6', name: 'Brooklyn Nets', abbreviation: 'BKN' },
  { id: '7', name: 'Phoenix Suns', abbreviation: 'PHX' },
  { id: '8', name: 'Denver Nuggets', abbreviation: 'DEN' },
];

export function generateMockGames(date: Date): GameSafe[] {
  const games: GameSafe[] = [];
  const numGames = Math.floor(Math.random() * 5) + 2;

  for (let i = 0; i < numGames; i++) {
    const homeTeam = NBA_TEAMS[Math.floor(Math.random() * NBA_TEAMS.length)];
    let awayTeam = NBA_TEAMS[Math.floor(Math.random() * NBA_TEAMS.length)];

    while (awayTeam.id === homeTeam.id) {
      awayTeam = NBA_TEAMS[Math.floor(Math.random() * NBA_TEAMS.length)];
    }

    const gameDate = new Date(date);
    gameDate.setHours(18 + i * 2, 0, 0, 0);

    const now = new Date();
    let status: 'scheduled' | 'live' | 'final';

    if (gameDate > now) {
      status = 'scheduled';
    } else if (gameDate.getTime() + 3 * 60 * 60 * 1000 > now.getTime()) {
      status = 'live';
    } else {
      status = 'final';
    }

    games.push({
      id: `game-${date.toISOString().split('T')[0]}-${i}`,
      nbaGameId: `nba-${date.toISOString().split('T')[0]}-${i}`,
      homeTeam,
      awayTeam,
      gameDate: gameDate.toISOString(),
      status,
      venue: `${homeTeam.name} Arena`,
      broadcasts: ['ESPN', 'TNT', 'ABC'][Math.floor(Math.random() * 3)]
        ? [['ESPN', 'TNT', 'ABC'][Math.floor(Math.random() * 3)]]
        : ['Local'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return games;
}
