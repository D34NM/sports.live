<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import type { GameSafe } from '$lib/types/game';
	import GameCard from './GameCard.svelte';

	interface Props {
		games: GameSafe[];
		isLoading?: boolean;
	}

	let { games, isLoading = false }: Props = $props();
</script>

{#if isLoading}
	<div class="flex flex-col items-center justify-center py-16">
		<Loader2
			class="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4"
		/>
		<p class="text-lg text-gray-600 dark:text-gray-400 font-medium">
			Loading games...
		</p>
	</div>
{:else if games.length === 0}
	<div
		class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
	>
		<div class="text-7xl mb-6">🏀</div>
		<p class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
			No games scheduled
		</p>
		<p class="text-gray-500 dark:text-gray-400">
			Check back later or browse other dates
		</p>
	</div>
{:else}
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each games as game (game.id)}
			<GameCard {game} />
		{/each}
	</div>
{/if}
