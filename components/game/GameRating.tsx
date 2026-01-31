'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface GameRatingProps {
  gameId: string;
  initialRating?: number;
  totalVotes?: number;
}

export function GameRating({
  gameId,
  initialRating = 0,
  totalVotes = 0,
}: GameRatingProps) {
  const [averageRating, setAverageRating] = useState(initialRating);
  const [votes, setVotes] = useState(totalVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem(`vote-${gameId}`);
    if (voted) {
      setUserVote(voted as 'up' | 'down');
      setHasVoted(true);
    }
  }, [gameId]);

  const handleVote = (voteType: 'up' | 'down') => {
    if (hasVoted) return;

    // Simulate vote
    const newVotes = votes + 1;
    const adjustment = voteType === 'up' ? 0.5 : -0.5;
    const newRating = (averageRating * votes + (5 + adjustment)) / newVotes;

    setAverageRating(newRating);
    setVotes(newVotes);
    setUserVote(voteType);
    setHasVoted(true);

    localStorage.setItem(`vote-${gameId}`, voteType);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 7) return 'text-green-600 dark:text-green-400';
    if (rating >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="flex-1">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Game Rating
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold ${getRatingColor(averageRating)}`}
          >
            {averageRating > 0 ? averageRating.toFixed(1) : '—'}
          </span>
          <span className="text-sm text-gray-500">/ 10</span>
        </div>
        {votes > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {votes} {votes === 1 ? 'vote' : 'votes'}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote('up')}
          disabled={hasVoted}
          className={`${userVote === 'up' ? 'bg-green-100 dark:bg-green-900' : ''}`}
          aria-label="Vote up - good game"
        >
          👍
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote('down')}
          disabled={hasVoted}
          className={`${userVote === 'down' ? 'bg-red-100 dark:bg-red-900' : ''}`}
          aria-label="Vote down - boring game"
        >
          👎
        </Button>
      </div>
    </div>
  );
}
