import { json } from '@sveltejs/kit';
import { generateMockGames } from '$lib/mockData';
import type { RequestHandler } from './$types';

// GET /api/games?date=YYYY-MM-DD
export const GET: RequestHandler = async ({ url }) => {
	const dateParam = url.searchParams.get('date');

	// Parse date or use today
	const date = dateParam ? new Date(dateParam) : new Date();

	// Validate date
	if (isNaN(date.getTime())) {
		return json(
			{ error: 'Invalid date format. Use YYYY-MM-DD' },
			{ status: 400 }
		);
	}

	// Generate mock games for the date
	// TODO: Replace with actual Supabase query when integration is ready
	const games = generateMockGames(date);

	return json({
		games,
		date: date.toISOString().split('T')[0],
		count: games.length,
	});
};
