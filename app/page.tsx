'use client';

import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/shared/DatePicker';
import { GameList } from '@/components/game/GameList';
import { PWAInstallPrompt } from '@/components/shared/PWAInstallPrompt';
import { generateMockGames } from '@/lib/mockData';
import { GameSafe } from '@/types/game';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<GameSafe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Register service worker for PWA
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockGames = generateMockGames(selectedDate);
      setGames(mockGames);
      setIsLoading(false);
    }, 500);
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏀 Sports.Live
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Watch NBA games without spoilers
          </p>
        </header>

        <div className="mb-8">
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            {selectedDate.toDateString() === new Date().toDateString()
              ? "Today's Games"
              : `Games for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
          </h2>
          <GameList games={games} isLoading={isLoading} />
        </section>

        <footer className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="font-semibold mb-2">
            Sports.Live - Your spoiler-free NBA companion
          </p>
          <p className="text-xs">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>

        <PWAInstallPrompt />
      </div>
    </main>
  );
}
