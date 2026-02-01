'use client';

import { Loader2 } from 'lucide-react';
import { GameSafe } from '@/types/game';
import { GameCard } from './GameCard';

interface GameListProps {
  games: GameSafe[];
  isLoading?: boolean;
}

export function GameList({ games, isLoading = false }: GameListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          Loading games...
        </p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-7xl mb-6">🏀</div>
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          No games scheduled
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check back later or browse other dates
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
