import { NextResponse } from 'next/server';
import { GameScores } from '@/types/game';

// GET /api/games/[id]/scores
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // TODO: Replace with actual Supabase query
  // const scores = await fetchScoresFromSupabase(id);

  // Mock response for now
  const mockScores: GameScores = {
    homeScore: Math.floor(Math.random() * 130) + 70,
    awayScore: Math.floor(Math.random() * 130) + 70,
    quarter: 'Final',
    timeRemaining: undefined,
  };

  return NextResponse.json({ scores: mockScores, gameId: id });
}
