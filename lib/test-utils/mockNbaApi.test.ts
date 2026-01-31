import { describe, it, expect } from 'vitest';
import { MockNbaApiClient, mockGames } from './mockNbaApi';

describe('MockNbaApiClient', () => {
  const client = new MockNbaApiClient();

  describe('getSchedule', () => {
    it('returns games for specific date', async () => {
      const games = await client.getSchedule('2026-01-31');
      expect(games).toBeDefined();
      expect(Array.isArray(games)).toBe(true);
      expect(games.length).toBeGreaterThan(0);
    });

    it('filters games by date correctly', async () => {
      const games = await client.getSchedule('2026-01-31');
      games.forEach((game) => {
        const gameDate = new Date(game.gameDate);
        expect(gameDate.getFullYear()).toBe(2026);
        expect(gameDate.getMonth()).toBe(0); // January is 0
        expect(gameDate.getDate()).toBe(31);
      });
    });

    it('returns empty array for date with no games', async () => {
      const games = await client.getSchedule('2026-01-01');
      expect(games).toEqual([]);
    });
  });

  describe('getGameScores', () => {
    it('returns scores for live game', async () => {
      const scores = await client.getGameScores('game-2');
      expect(scores).toBeDefined();
      expect(scores?.homeScore).toBeDefined();
      expect(scores?.awayScore).toBeDefined();
    });

    it('returns scores for final game', async () => {
      const scores = await client.getGameScores('game-3');
      expect(scores).toBeDefined();
      expect(scores?.quarter).toBe('Final');
    });

    it('returns null for scheduled game', async () => {
      const scores = await client.getGameScores('game-1');
      expect(scores).toBeNull();
    });
  });

  describe('getGameById', () => {
    it('returns game by id', async () => {
      const game = await client.getGameById('game-1');
      expect(game).toBeDefined();
      expect(game?.id).toBe('game-1');
    });

    it('returns null for non-existent game', async () => {
      const game = await client.getGameById('non-existent');
      expect(game).toBeNull();
    });

    it('returns game with correct structure', async () => {
      const game = await client.getGameById('game-1');
      expect(game).toMatchObject({
        id: expect.any(String),
        nbaGameId: expect.any(String),
        homeTeam: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          abbreviation: expect.any(String),
        }),
        awayTeam: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          abbreviation: expect.any(String),
        }),
        gameDate: expect.any(String),
        status: expect.stringMatching(/scheduled|live|final/),
      });
    });
  });
});
