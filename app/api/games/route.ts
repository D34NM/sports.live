import { NextResponse } from 'next/server';
import { GameSafe } from '@/types/game';

// GET /api/games?date=YYYY-MM-DD
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  // TODO: Replace with actual Supabase query
  // const games = await fetchGamesFromSupabase(date);

  // Mock response for now
  const mockGames: GameSafe[] = [
    {
      id: '1',
      nbaGameId: 'nba-123',
      homeTeam: {
        id: '1',
        name: 'Los Angeles Lakers',
        abbreviation: 'LAL',
      },
      awayTeam: {
        id: '2',
        name: 'Boston Celtics',
        abbreviation: 'BOS',
      },
      gameDate: new Date(date + 'T19:00:00Z').toISOString(),
      status: 'scheduled',
      venue: 'Crypto.com Arena',
      broadcasts: ['ESPN', 'NBA TV'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ games: mockGames, date });
}
