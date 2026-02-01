'use client';

import { useState, useEffect } from 'react';
import { MapPin, Tv, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { GameSafe, GameScores } from '@/types/game';
import { GameRating } from './GameRating';
import { TeamIcon } from './TeamIcon';
import { PlayerStatsTable } from './PlayerStatsTable';
import { generateMockPlayerStatsForGame } from '@/lib/mockPlayerStats';

interface GameCardProps {
  game: GameSafe;
}

export function GameCard({ game }: GameCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSpoilerAlert, setShowSpoilerAlert] = useState(false);
  const [scores, setScores] = useState<GameScores | null>(null);
  const [showPlayerStats, setShowPlayerStats] = useState(false);

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

    const statusText = {
      scheduled: 'Upcoming',
      live: '● LIVE',
      final: 'Final',
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full ${badges[game.status]}`}
      >
        {statusText[game.status]}
      </span>
    );
  };

  const playerStats =
    isRevealed && (game.status === 'live' || game.status === 'final')
      ? generateMockPlayerStatsForGame(
          game.id,
          game.homeTeam.abbreviation,
          game.awayTeam.abbreviation
        )
      : null;

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 dark:hover:border-blue-700">
        <CardContent className="p-6">
          {/* Header with date and status */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                {formatGameDate(game.gameDate)} •{' '}
                {formatGameTime(game.gameDate)}
              </div>
              {getStatusBadge()}
            </div>
          </div>

          {/* Teams Display */}
          <div className="space-y-4 mb-4">
            {/* Away Team */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <TeamIcon
                  teamAbbreviation={game.awayTeam.abbreviation}
                  teamName={game.awayTeam.name}
                  size="lg"
                />
                <div>
                  <div className="font-bold text-lg">{game.awayTeam.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Away
                  </div>
                </div>
              </div>
              {isRevealed && scores && (
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {scores.awayScore}
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="text-center">
              <span className="inline-block px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">
                VS
              </span>
            </div>

            {/* Home Team */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <TeamIcon
                  teamAbbreviation={game.homeTeam.abbreviation}
                  teamName={game.homeTeam.name}
                  size="lg"
                />
                <div>
                  <div className="font-bold text-lg">{game.homeTeam.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Home
                  </div>
                </div>
              </div>
              {isRevealed && scores && (
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {scores.homeScore}
                </div>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-2 mb-4">
            {game.venue && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{game.venue}</span>
              </div>
            )}

            {game.broadcasts && game.broadcasts.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <Tv className="w-4 h-4 flex-shrink-0" />
                <span>{game.broadcasts.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Spoiler Protection Overlay */}
          {!isRevealed && game.status !== 'scheduled' && (
            <div className="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Spoiler Protected
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                This game has ended or is in progress. Click below to reveal the
                score and player statistics.
              </p>
              <Button variant="primary" size="md" onClick={handleRevealClick}>
                Reveal Score & Stats
              </Button>
            </div>
          )}

          {/* Score Details and Player Stats Toggle */}
          {isRevealed && scores && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {scores.quarter}
                    {scores.timeRemaining && ` • ${scores.timeRemaining}`}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleHideScores}>
                  Hide Score
                </Button>
              </div>

              {/* Player Stats Toggle */}
              {playerStats && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowPlayerStats(!showPlayerStats)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {showPlayerStats ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Player Statistics
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show Player Statistics
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Player Statistics Section */}
          {showPlayerStats && playerStats && (
            <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 space-y-6">
              <PlayerStatsTable
                teamName={game.awayTeam.name}
                players={playerStats.awayTeamStats}
              />
              <PlayerStatsTable
                teamName={game.homeTeam.name}
                players={playerStats.homeTeamStats}
              />
            </div>
          )}

          {/* Game Rating */}
          {game.status === 'final' && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <GameRating
                gameId={game.id}
                initialRating={Math.random() * 4 + 5}
                totalVotes={Math.floor(Math.random() * 100) + 10}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showSpoilerAlert}
        onClose={() => setShowSpoilerAlert(false)}
        onConfirm={handleConfirmReveal}
        title="Spoiler Alert"
        confirmText="Show Me The Score"
        variant="danger"
      >
        <div className="text-center mb-4">
          <div className="text-6xl mb-4">⚠️</div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Are you sure you want to see the score for this game? This action will
          reveal the result and player statistics.
        </p>
      </Modal>
    </>
  );
}
