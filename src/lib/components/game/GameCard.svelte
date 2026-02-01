<script lang="ts">
import { onMount } from 'svelte';
import { MapPin, Tv, ChevronDown, ChevronUp } from 'lucide-svelte';
import Card from '../ui/Card.svelte';
import Button from '../ui/Button.svelte';
import Modal from '../ui/Modal.svelte';
import type { GameSafe, GameScores } from '$lib/types/game';
import GameRating from './GameRating.svelte';
import TeamIcon from './TeamIcon.svelte';
import PlayerStatsTable from './PlayerStatsTable.svelte';
import { generateMockPlayerStatsForGame } from '$lib/mockPlayerStats';

interface Props {
game: GameSafe;
}

let { game }: Props = $props();

let isRevealed = $state(false);
let showSpoilerAlert = $state(false);
let scores = $state<GameScores | null>(null);
let showPlayerStats = $state(false);

onMount(() => {
const revealed = localStorage.getItem(`revealed-${game.id}`);
if (revealed === 'true') {
isRevealed = true;
fetchScores();
}
});

async function fetchScores() {
// In a real app, this would fetch from an API
scores = {
homeScore: Math.floor(Math.random() * 130) + 70,
awayScore: Math.floor(Math.random() * 130) + 70,
quarter: game.status === 'final' ? 'Final' : 'Q3',
timeRemaining: game.status === 'live' ? '5:42' : undefined
};
}

function handleRevealClick() {
showSpoilerAlert = true;
}

async function handleConfirmReveal() {
await fetchScores();
isRevealed = true;
localStorage.setItem(`revealed-${game.id}`, 'true');
showSpoilerAlert = false;
}

function handleHideScores() {
isRevealed = false;
scores = null;
localStorage.removeItem(`revealed-${game.id}`);
}

function formatGameTime(dateString: string) {
const date = new Date(dateString);
return date.toLocaleTimeString('en-US', {
hour: 'numeric',
minute: '2-digit',
hour12: true
});
}

function formatGameDate(dateString: string) {
const date = new Date(dateString);
return date.toLocaleDateString('en-US', {
weekday: 'short',
month: 'short',
day: 'numeric'
});
}

function getStatusBadge() {
const badges = {
scheduled: 'bg-gray-500',
live: 'bg-red-500 animate-pulse',
final: 'bg-green-600'
};

const statusText = {
scheduled: 'Upcoming',
live: '● LIVE',
final: 'Final'
};

return {
class: badges[game.status],
text: statusText[game.status]
};
}

let playerStats = $derived(
isRevealed && (game.status === 'live' || game.status === 'final')
? generateMockPlayerStatsForGame(
game.id,
game.homeTeam.abbreviation,
game.awayTeam.abbreviation
)
: null
);

let statusBadge = $derived(getStatusBadge());
</script>

<Card class="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 dark:hover:border-blue-700">
<div class="p-6">
<!-- Header with date and status -->
<div class="flex justify-between items-start mb-6">
<div class="flex-1">
<div class="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
{formatGameDate(game.gameDate)} • {formatGameTime(game.gameDate)}
</div>
<span
class={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full ${statusBadge.class}`}
>
{statusBadge.text}
</span>
</div>
</div>

<!-- Teams Display -->
<div class="space-y-4 mb-4">
<!-- Away Team -->
<div
class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
>
<div class="flex items-center gap-4 flex-1">
<TeamIcon
teamAbbreviation={game.awayTeam.abbreviation}
teamName={game.awayTeam.name}
size="lg"
/>
<div>
<div class="font-bold text-lg">{game.awayTeam.name}</div>
<div class="text-sm text-gray-500 dark:text-gray-400">Away</div>
</div>
</div>
{#if isRevealed && scores}
<div class="text-3xl font-bold text-gray-900 dark:text-white">
{scores.awayScore}
</div>
{/if}
</div>

<!-- VS Divider -->
<div class="text-center">
<span
class="inline-block px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300"
>
VS
</span>
</div>

<!-- Home Team -->
<div
class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
>
<div class="flex items-center gap-4 flex-1">
<TeamIcon
teamAbbreviation={game.homeTeam.abbreviation}
teamName={game.homeTeam.name}
size="lg"
/>
<div>
<div class="font-bold text-lg">{game.homeTeam.name}</div>
<div class="text-sm text-gray-500 dark:text-gray-400">Home</div>
</div>
</div>
{#if isRevealed && scores}
<div class="text-3xl font-bold text-gray-900 dark:text-white">
{scores.homeScore}
</div>
{/if}
</div>
</div>

<!-- Game Info -->
<div class="space-y-2 mb-4">
{#if game.venue}
<div
class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900 rounded"
>
<MapPin class="w-4 h-4 flex-shrink-0" />
<span>{game.venue}</span>
</div>
{/if}

{#if game.broadcasts && game.broadcasts.length > 0}
<div
class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900 rounded"
>
<Tv class="w-4 h-4 flex-shrink-0" />
<span>{game.broadcasts.join(', ')}</span>
</div>
{/if}
</div>

<!-- Spoiler Protection Overlay -->
{#if !isRevealed && game.status !== 'scheduled'}
<div
class="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg text-center"
>
<div class="text-2xl mb-2">⚠️</div>
<div class="text-lg font-bold mb-2 text-gray-900 dark:text-white">Spoiler Protected</div>
<p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
This game has ended or is in progress. Click below to reveal the score and player
statistics.
</p>
<Button variant="primary" size="md" onclick={handleRevealClick}>
Reveal Score & Stats
</Button>
</div>
{/if}

<!-- Score Details and Player Stats Toggle -->
{#if isRevealed && scores}
<div class="mt-6 space-y-3">
<div
class="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
>
<div class="flex items-center gap-2">
<div class="text-lg font-bold text-blue-900 dark:text-blue-100">
{scores.quarter}
{#if scores.timeRemaining}• {scores.timeRemaining}{/if}
</div>
</div>
<Button variant="ghost" size="sm" onclick={handleHideScores}> Hide Score </Button>
</div>

<!-- Player Stats Toggle -->
{#if playerStats}
<Button
variant="secondary"
size="md"
onclick={() => (showPlayerStats = !showPlayerStats)}
class="w-full flex items-center justify-center gap-2"
>
{#if showPlayerStats}
<ChevronUp class="w-4 h-4" />
Hide Player Statistics
{:else}
<ChevronDown class="w-4 h-4" />
Show Player Statistics
{/if}
</Button>
{/if}
</div>
{/if}

<!-- Player Statistics Section -->
{#if showPlayerStats && playerStats}
<div class="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 space-y-6">
<PlayerStatsTable teamName={game.awayTeam.name} players={playerStats.awayTeamStats} />
<PlayerStatsTable teamName={game.homeTeam.name} players={playerStats.homeTeamStats} />
</div>
{/if}

<!-- Game Rating -->
{#if game.status === 'final'}
<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
<GameRating
gameId={game.id}
initialRating={Math.random() * 4 + 5}
totalVotes={Math.floor(Math.random() * 100) + 10}
/>
</div>
{/if}
</div>
</Card>

<Modal
bind:isOpen={showSpoilerAlert}
onClose={() => (showSpoilerAlert = false)}
onConfirm={handleConfirmReveal}
title="Spoiler Alert"
confirmText="Show Me The Score"
variant="danger"
>
<div class="text-center mb-4">
<div class="text-6xl mb-4">⚠️</div>
</div>
<p class="text-gray-600 dark:text-gray-300 text-center">
Are you sure you want to see the score for this game? This action will reveal the result and
player statistics.
</p>
</Modal>
