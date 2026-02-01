<script lang="ts">
	import DatePicker from '$lib/components/shared/DatePicker.svelte';
	import GameList from '$lib/components/game/GameList.svelte';
	import PWAInstallPrompt from '$lib/components/shared/PWAInstallPrompt.svelte';
	import { generateMockGames } from '$lib/mockData';
	import type { GameSafe } from '$lib/types/game';

	let selectedDate = $state(new Date());
	let games = $state<GameSafe[]>([]);
	let isLoading = $state(true);

	$effect(() => {
		isLoading = true;
		setTimeout(() => {
			const mockGames = generateMockGames(selectedDate);
			games = mockGames;
			isLoading = false;
		}, 500);
	});

	function handleDateChange(newDate: Date) {
		selectedDate = newDate;
	}

	function isToday(date: Date) {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	}

	function formatDate(date: Date) {
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}
</script>

<main
	class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
>
	<div class="max-w-7xl mx-auto p-4 md:p-8">
		<header class="mb-8 text-center">
			<h1
				class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
			>
				🏀 Sports.Live
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Watch NBA games without spoilers
			</p>
		</header>

		<div class="mb-8">
			<DatePicker {selectedDate} onDateChange={handleDateChange} />
		</div>

		<section>
			<h2 class="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
				<div
					class="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"
				></div>
				{isToday(selectedDate)
					? "Today's Games"
					: `Games for ${formatDate(selectedDate)}`}
			</h2>
			<GameList {games} {isLoading} />
		</section>

		<footer
			class="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400"
		>
			<p class="font-semibold mb-2">
				Sports.Live - Your spoiler-free NBA companion
			</p>
			<p class="text-xs">Built with SvelteKit, TypeScript, and Tailwind CSS</p>
		</footer>

		<PWAInstallPrompt />
	</div>
</main>
