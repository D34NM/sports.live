'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Target,
  Users,
  Shield,
  Zap,
  Clock,
  Activity,
} from 'lucide-react';
import { PlayerStats } from '@/types/playerStats';

interface PlayerStatsTableProps {
  teamName: string;
  players: PlayerStats[];
}

export function PlayerStatsTable({ teamName, players }: PlayerStatsTableProps) {
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  const togglePlayer = (playerId: string) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const calculateFGPercentage = (made: number, attempted: number) => {
    if (attempted === 0) return '0.0';
    return ((made / attempted) * 100).toFixed(1);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Users className="w-5 h-5" />
        {teamName} - Player Statistics
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg text-xs font-semibold">
            <div className="col-span-3">Player</div>
            <div className="col-span-1 text-center" title="Points">
              <TrendingUp className="w-4 h-4 mx-auto" />
            </div>
            <div className="col-span-1 text-center" title="Rebounds">
              <Target className="w-4 h-4 mx-auto" />
            </div>
            <div className="col-span-1 text-center" title="Assists">
              <Users className="w-4 h-4 mx-auto" />
            </div>
            <div className="col-span-1 text-center" title="Steals">
              <Zap className="w-4 h-4 mx-auto" />
            </div>
            <div className="col-span-1 text-center" title="Blocks">
              <Shield className="w-4 h-4 mx-auto" />
            </div>
            <div className="col-span-2 text-center" title="Field Goal %">
              FG%
            </div>
            <div className="col-span-2 text-center" title="Minutes Played">
              <Clock className="w-4 h-4 mx-auto" />
            </div>
          </div>

          {/* Players */}
          {players.map((player) => (
            <div
              key={player.playerId}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => togglePlayer(player.playerId)}
                className="w-full grid grid-cols-12 gap-2 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="col-span-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                    #{player.jerseyNumber}
                  </span>
                  <div>
                    <div className="font-medium text-sm">
                      {player.playerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {player.position}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 text-center font-bold text-blue-600 dark:text-blue-400">
                  {player.points}
                </div>
                <div className="col-span-1 text-center text-sm">
                  {player.rebounds}
                </div>
                <div className="col-span-1 text-center text-sm">
                  {player.assists}
                </div>
                <div className="col-span-1 text-center text-sm">
                  {player.steals}
                </div>
                <div className="col-span-1 text-center text-sm">
                  {player.blocks}
                </div>
                <div className="col-span-2 text-center text-sm">
                  <div className="font-medium">
                    {calculateFGPercentage(
                      player.fieldGoalsMade,
                      player.fieldGoalsAttempted
                    )}
                    %
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {player.fieldGoalsMade}/{player.fieldGoalsAttempted}
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  {player.minutes}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedPlayer === player.playerId && (
                <div className="px-3 py-3 bg-gray-50 dark:bg-gray-900 space-y-2">
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          3-Pointers
                        </div>
                        <div className="font-medium">
                          {player.threePointersMade}/
                          {player.threePointersAttempted}
                          <span className="text-xs ml-1">
                            (
                            {calculateFGPercentage(
                              player.threePointersMade,
                              player.threePointersAttempted
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Free Throws
                        </div>
                        <div className="font-medium">
                          {player.freeThrowsMade}/{player.freeThrowsAttempted}
                          <span className="text-xs ml-1">
                            (
                            {calculateFGPercentage(
                              player.freeThrowsMade,
                              player.freeThrowsAttempted
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-600" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Fouls
                        </div>
                        <div className="font-medium">{player.fouls}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
