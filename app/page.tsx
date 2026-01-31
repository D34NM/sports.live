'use client';

import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/shared/DatePicker';
import { GameList } from '@/components/game/GameList';
import { generateMockGames } from '@/lib/mockData';
import { GameSafe } from '@/types/game';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<GameSafe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockGames = generateMockGames(selectedDate);
      setGames(mockGames);
      setIsLoading(false);
    }, 500);
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🏀 Sports.Live
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Watch NBA games without spoilers
          </p>
        </header>

        <div className="mb-6">
          <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedDate.toDateString() === new Date().toDateString()
              ? "Today's Games"
              : 'Games'}
          </h2>
          <GameList games={games} isLoading={isLoading} />
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500">
          <p>
            Sports.Live - Your spoiler-free NBA companion
          </p>
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}
