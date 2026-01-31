'use client';

import { GameSafe } from '@/types/game';
import { GameCard } from './GameCard';

interface GameListProps {
  games: GameSafe[];
  isLoading?: boolean;
}

export function GameList({ games, isLoading = false }: GameListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏀</div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          No games scheduled for this date
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Check back later or browse other dates
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
