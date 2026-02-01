<script lang="ts">
import { onMount } from 'svelte';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-svelte';
import Button from '../ui/Button.svelte';

interface Props {
gameId: string;
initialRating?: number;
totalVotes?: number;
}

let { gameId, initialRating = 0, totalVotes = 0 }: Props = $props();

let averageRating = $state(initialRating);
let votes = $state(totalVotes);
let userVote = $state<'up' | 'down' | null>(null);
let hasVoted = $state(false);

onMount(() => {
const voted = localStorage.getItem(`vote-${gameId}`);
if (voted) {
userVote = voted as 'up' | 'down';
hasVoted = true;
}
});

function handleVote(voteType: 'up' | 'down') {
if (hasVoted) return;

// Simulate vote
const newVotes = votes + 1;
const adjustment = voteType === 'up' ? 0.5 : -0.5;
const newRating = (averageRating * votes + (5 + adjustment)) / newVotes;

averageRating = newRating;
votes = newVotes;
userVote = voteType;
hasVoted = true;

localStorage.setItem(`vote-${gameId}`, voteType);
}

function getRatingColor(rating: number) {
if (rating >= 7) return 'text-green-600 dark:text-green-400';
if (rating >= 5) return 'text-yellow-600 dark:text-yellow-400';
return 'text-red-600 dark:text-red-400';
}
</script>

<div
class="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700"
>
<div class="flex-1">
<div class="flex items-center gap-2 mb-2">
<Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Game Rating</span>
</div>
<div class="flex items-baseline gap-2">
<span class={`text-3xl font-bold ${getRatingColor(averageRating)}`}>
{averageRating > 0 ? averageRating.toFixed(1) : '—'}
</span>
<span class="text-sm text-gray-500 dark:text-gray-400">/ 10</span>
</div>
{#if votes > 0}
<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
Based on {votes}
{votes === 1 ? 'vote' : 'votes'}
</div>
{/if}
</div>

<div class="flex flex-col gap-2">
<Button
variant="ghost"
size="sm"
onclick={() => handleVote('up')}
disabled={hasVoted}
class={`flex items-center gap-2 ${userVote === 'up' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''}`}
aria-label="Vote up - good game"
>
<ThumbsUp class="w-4 h-4" />
Great
</Button>
<Button
variant="ghost"
size="sm"
onclick={() => handleVote('down')}
disabled={hasVoted}
class={`flex items-center gap-2 ${userVote === 'down' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : ''}`}
aria-label="Vote down - boring game"
>
<ThumbsDown class="w-4 h-4" />
Boring
</Button>
</div>
</div>
