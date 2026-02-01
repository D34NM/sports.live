import { json } from '@sveltejs/kit';
import { generateMockScores } from '$lib/mockData';
import type { RequestHandler } from './$types';

// GET /api/games/[id]/scores
export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	// Extract status from game ID if available (format: game-YYYY-MM-DD-index)
	// For mock purposes, randomly determine if it's live or final
	const isLive = id.includes('-0') || id.includes('-2') || id.includes('-4');
	const status = isLive ? 'live' : 'final';

	// Generate mock scores
	// TODO: Replace with actual Supabase query when integration is ready
	const scores = generateMockScores(id, status as 'live' | 'final');

	return json({
		gameId: id,
		scores,
		lastUpdated: new Date().toISOString(),
	});
};
