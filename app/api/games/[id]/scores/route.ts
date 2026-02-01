import { NextResponse } from 'next/server';
import { generateMockScores } from '@/lib/mockData';

// GET /api/games/[id]/scores
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  // Extract status from game ID if available (format: game-YYYY-MM-DD-index)
  // For mock purposes, randomly determine if it's live or final
  const isLive = id.includes('-0') || id.includes('-2') || id.includes('-4');
  const status = isLive ? 'live' : 'final';
  
  // Generate mock scores
  // TODO: Replace with actual Supabase query when integration is ready
  const scores = generateMockScores(id, status);
  
  return NextResponse.json({
    gameId: id,
    scores,
    lastUpdated: new Date().toISOString(),
  });
}
