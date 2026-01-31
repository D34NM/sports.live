import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('GET /api/games', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns games for today by default', async () => {
    const mockUrl = new URL('http://localhost:3000/api/games');
    const request = new NextRequest(mockUrl);
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('games');
    expect(data).toHaveProperty('date');
    expect(Array.isArray(data.games)).toBe(true);
  });

  it('returns games for specific date', async () => {
    const mockUrl = new URL('http://localhost:3000/api/games?date=2026-01-31');
    const request = new NextRequest(mockUrl);
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.date).toBe('2026-01-31');
    expect(Array.isArray(data.games)).toBe(true);
  });

  it('returns games with correct structure', async () => {
    const mockUrl = new URL('http://localhost:3000/api/games');
    const request = new NextRequest(mockUrl);
    
    const response = await GET(request);
    const data = await response.json();
    
    if (data.games.length > 0) {
      const game = data.games[0];
      expect(game).toHaveProperty('id');
      expect(game).toHaveProperty('nbaGameId');
      expect(game).toHaveProperty('homeTeam');
      expect(game).toHaveProperty('awayTeam');
      expect(game).toHaveProperty('gameDate');
      expect(game).toHaveProperty('status');
      expect(game.homeTeam).toHaveProperty('name');
      expect(game.homeTeam).toHaveProperty('abbreviation');
    }
  });
});
