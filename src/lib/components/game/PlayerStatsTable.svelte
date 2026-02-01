<script lang="ts">
	import { TrendingUp, Target, Users, Shield, Zap, Clock } from 'lucide-svelte';
	import type { PlayerStats } from '$lib/types/playerStats';

	interface Props {
		teamName: string;
		players: PlayerStats[];
	}

	let { teamName, players }: Props = $props();

	let expandedPlayer = $state<string | null>(null);

	function togglePlayer(playerId: string) {
		expandedPlayer = expandedPlayer === playerId ? null : playerId;
	}

	function calculateFGPercentage(made: number, attempted: number) {
		if (attempted === 0) return '0.0';
		return ((made / attempted) * 100).toFixed(1);
	}
</script>

<div class="space-y-2">
	<h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
		<Users class="w-5 h-5" />
		{teamName} - Player Statistics
	</h3>

	<div class="overflow-x-auto">
		<div class="min-w-full">
			<!-- Header -->
			<div
				class="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg text-xs font-semibold"
			>
				<div class="col-span-3">Player</div>
				<div class="col-span-1 text-center" title="Points">
					<TrendingUp class="w-4 h-4 mx-auto" />
				</div>
				<div class="col-span-1 text-center" title="Rebounds">
					<Target class="w-4 h-4 mx-auto" />
				</div>
				<div class="col-span-1 text-center" title="Assists">
					<Users class="w-4 h-4 mx-auto" />
				</div>
				<div class="col-span-1 text-center" title="Steals">
					<Zap class="w-4 h-4 mx-auto" />
				</div>
				<div class="col-span-1 text-center" title="Blocks">
					<Shield class="w-4 h-4 mx-auto" />
				</div>
				<div class="col-span-2 text-center" title="Field Goal %">FG%</div>
				<div class="col-span-2 text-center" title="Minutes Played">
					<Clock class="w-4 h-4 mx-auto" />
				</div>
			</div>

			<!-- Players -->
			{#each players as player (player.playerId)}
				<div class="border-b border-gray-200 dark:border-gray-700">
					<button
						onclick={() => togglePlayer(player.playerId)}
						class="w-full grid grid-cols-12 gap-2 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
					>
						<div class="col-span-3 flex items-center gap-2">
							<span class="text-xs text-gray-500 dark:text-gray-400 w-8">
								#{player.jerseyNumber}
							</span>
							<div>
								<div class="font-medium text-sm">{player.playerName}</div>
								<div class="text-xs text-gray-500 dark:text-gray-400">
									{player.position}
								</div>
							</div>
						</div>
						<div class="col-span-1 text-center font-semibold">
							{player.points}
						</div>
						<div class="col-span-1 text-center">{player.rebounds}</div>
						<div class="col-span-1 text-center">{player.assists}</div>
						<div class="col-span-1 text-center">{player.steals}</div>
						<div class="col-span-1 text-center">{player.blocks}</div>
						<div class="col-span-2 text-center text-sm">
							{calculateFGPercentage(
								player.fieldGoalsMade,
								player.fieldGoalsAttempted
							)}%
							<span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
								({player.fieldGoalsMade}/{player.fieldGoalsAttempted})
							</span>
						</div>
						<div class="col-span-2 text-center">{player.minutes}</div>
					</button>

					{#if expandedPlayer === player.playerId}
						<div class="px-3 py-4 bg-gray-50 dark:bg-gray-900 text-sm">
							<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
								<div>
									<div class="text-xs text-gray-500 dark:text-gray-400">
										3-Point
									</div>
									<div class="font-semibold">
										{player.threePointersMade}/{player.threePointersAttempted}
										({calculateFGPercentage(
											player.threePointersMade,
											player.threePointersAttempted
										)}%)
									</div>
								</div>
								<div>
									<div class="text-xs text-gray-500 dark:text-gray-400">
										Free Throws
									</div>
									<div class="font-semibold">
										{player.freeThrowsMade}/{player.freeThrowsAttempted}
										({calculateFGPercentage(
											player.freeThrowsMade,
											player.freeThrowsAttempted
										)}%)
									</div>
								</div>
								<div>
									<div class="text-xs text-gray-500 dark:text-gray-400">
										Turnovers
									</div>
									<div class="font-semibold">{player.turnovers}</div>
								</div>
								<div>
									<div class="text-xs text-gray-500 dark:text-gray-400">
										Fouls
									</div>
									<div class="font-semibold">{player.fouls}</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
