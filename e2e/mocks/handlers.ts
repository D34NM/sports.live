import { http, HttpResponse } from 'msw';
import { mockGames, mockScores } from '@/lib/test-utils/mockNbaApi';

export const handlers = [
  // Mock games API
  http.get('/api/games', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    const filteredGames = mockGames.filter((game) => {
      const gameDate = new Date(game.gameDate);
      const targetDate = new Date(date);
      return (
        gameDate.getFullYear() === targetDate.getFullYear() &&
        gameDate.getMonth() === targetDate.getMonth() &&
        gameDate.getDate() === targetDate.getDate()
      );
    });

    return HttpResponse.json({
      games: filteredGames,
      date,
    });
  }),

  // Mock game scores API
  http.get('/api/games/:id/scores', ({ params }) => {
    const gameId = params.id as string;
    const scores = mockScores[gameId];
    
    if (!scores) {
      return HttpResponse.json({ error: 'Scores not available' }, { status: 404 });
    }
    
    return HttpResponse.json(scores);
  }),
];
