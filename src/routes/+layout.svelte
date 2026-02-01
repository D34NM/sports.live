<script lang="ts">
import '../app.css';
import { onMount } from 'svelte';

let { children } = $props();

onMount(() => {
// Register service worker for PWA
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js').catch((error) => {
console.error('Service Worker registration failed:', error);
});
}
});
</script>

<svelte:head>
<title>Sports.Live - Spoiler-Free NBA</title>
<meta name="description" content="Watch NBA games without spoilers" />
</svelte:head>

{@render children()}
