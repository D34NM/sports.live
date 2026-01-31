'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { GameSafe, GameScores } from '@/types/game';

interface GameCardProps {
  game: GameSafe;
}

export function GameCard({ game }: GameCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSpoilerAlert, setShowSpoilerAlert] = useState(false);
  const [scores, setScores] = useState<GameScores | null>(null);

  useEffect(() => {
    const revealed = localStorage.getItem(`revealed-${game.id}`);
    if (revealed === 'true') {
      setIsRevealed(true);
      fetchScores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.id]);

  const fetchScores = async () => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    setScores({
      homeScore: Math.floor(Math.random() * 130) + 70,
      awayScore: Math.floor(Math.random() * 130) + 70,
      quarter: game.status === 'final' ? 'Final' : 'Q3',
      timeRemaining: game.status === 'live' ? '5:42' : undefined,
    });
  };

  const handleRevealClick = () => {
    setShowSpoilerAlert(true);
  };

  const handleConfirmReveal = async () => {
    await fetchScores();
    setIsRevealed(true);
    localStorage.setItem(`revealed-${game.id}`, 'true');
    setShowSpoilerAlert(false);
  };

  const handleHideScores = () => {
    setIsRevealed(false);
    setScores(null);
    localStorage.removeItem(`revealed-${game.id}`);
  };

  const formatGameTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatGameDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = () => {
    const badges = {
      scheduled: 'bg-gray-500',
      live: 'bg-red-500 animate-pulse',
      final: 'bg-green-600',
    };

    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${badges[game.status]}`}
      >
        {game.status === 'scheduled' && 'Upcoming'}
        {game.status === 'live' && 'Live'}
        {game.status === 'final' && 'Final'}
      </span>
    );
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {formatGameDate(game.gameDate)} • {formatGameTime(game.gameDate)}
              </div>
              {getStatusBadge()}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold">
                  {game.awayTeam.abbreviation}
                </div>
                <div>
                  <div className="font-semibold">{game.awayTeam.name}</div>
                  <div className="text-sm text-gray-500">Away</div>
                </div>
              </div>
              {isRevealed && scores && (
                <div className="text-2xl font-bold">{scores.awayScore}</div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold">
                  {game.homeTeam.abbreviation}
                </div>
                <div>
                  <div className="font-semibold">{game.homeTeam.name}</div>
                  <div className="text-sm text-gray-500">Home</div>
                </div>
              </div>
              {isRevealed && scores && (
                <div className="text-2xl font-bold">{scores.homeScore}</div>
              )}
            </div>
          </div>

          {game.venue && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              📍 {game.venue}
            </div>
          )}

          {game.broadcasts && game.broadcasts.length > 0 && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              📺 {game.broadcasts.join(', ')}
            </div>
          )}

          {!isRevealed && game.status !== 'scheduled' && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg text-center">
              <div className="text-lg font-semibold mb-2">⚠️ Spoiler Protected</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                This game has ended or is in progress. Click below to reveal the score.
              </p>
              <Button variant="primary" size="sm" onClick={handleRevealClick}>
                Reveal Score
              </Button>
            </div>
          )}

          {isRevealed && scores && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm font-semibold">
                {scores.quarter}
                {scores.timeRemaining && ` • ${scores.timeRemaining}`}
              </div>
              <Button variant="ghost" size="sm" onClick={handleHideScores}>
                Hide Score
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showSpoilerAlert}
        onClose={() => setShowSpoilerAlert(false)}
        onConfirm={handleConfirmReveal}
        title="⚠️ Spoiler Alert"
        confirmText="Show Me The Score"
        variant="danger"
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to see the score for this game? This action will reveal the
          result and cannot be undone without manually hiding it again.
        </p>
      </Modal>
    </>
  );
}
