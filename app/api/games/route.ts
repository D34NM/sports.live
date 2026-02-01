import { NextResponse } from 'next/server';
import { generateMockGames } from '@/lib/mockData';

// GET /api/games?date=YYYY-MM-DD
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');

  // Parse date or use today
  const date = dateParam ? new Date(dateParam) : new Date();

  // Validate date
  if (isNaN(date.getTime())) {
    return NextResponse.json(
      { error: 'Invalid date format. Use YYYY-MM-DD' },
      { status: 400 }
    );
  }

  // Generate mock games for the date
  // TODO: Replace with actual Supabase query when integration is ready
  const games = generateMockGames(date);

  return NextResponse.json({
    games,
    date: date.toISOString().split('T')[0],
    count: games.length,
  });
}
