'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
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
    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Game Rating
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-3xl font-bold ${getRatingColor(averageRating)}`}
          >
            {averageRating > 0 ? averageRating.toFixed(1) : '—'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/ 10</span>
        </div>
        {votes > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Based on {votes} {votes === 1 ? 'vote' : 'votes'}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote('up')}
          disabled={hasVoted}
          className={`flex items-center gap-2 ${userVote === 'up' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''}`}
          aria-label="Vote up - good game"
        >
          <ThumbsUp className="w-4 h-4" />
          Great
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote('down')}
          disabled={hasVoted}
          className={`flex items-center gap-2 ${userVote === 'down' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : ''}`}
          aria-label="Vote down - boring game"
        >
          <ThumbsDown className="w-4 h-4" />
          Boring
        </Button>
      </div>
    </div>
  );
}
