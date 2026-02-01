<script lang="ts">
import { onMount } from 'svelte';
import Button from '../ui/Button.svelte';

interface BeforeInstallPromptEvent extends Event {
prompt: () => Promise<void>;
userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt = $state<BeforeInstallPromptEvent | null>(null);
let showPrompt = $state(false);

onMount(() => {
const handler = (e: Event) => {
e.preventDefault();
deferredPrompt = e as BeforeInstallPromptEvent;
showPrompt = true;
};

window.addEventListener('beforeinstallprompt', handler);

return () => {
window.removeEventListener('beforeinstallprompt', handler);
};
});

async function handleInstall() {
if (!deferredPrompt) return;

deferredPrompt.prompt();
const { outcome } = await deferredPrompt.userChoice;

if (outcome === 'accepted') {
console.log('User accepted the install prompt');
}

deferredPrompt = null;
showPrompt = false;
}

function handleDismiss() {
showPrompt = false;
localStorage.setItem('pwa-prompt-dismissed', 'true');
}

let shouldShow = $derived(
showPrompt && !localStorage.getItem('pwa-prompt-dismissed')
);
</script>

{#if shouldShow}
<div
class="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur-sm z-50"
>
<div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
<div class="flex-1">
<h3 class="text-white font-semibold mb-1">Install Sports.Live</h3>
<p class="text-gray-300 text-sm">Get quick access and enjoy a native app experience</p>
</div>
<div class="flex gap-2">
<Button variant="secondary" size="sm" onclick={handleDismiss}> Not Now </Button>
<Button variant="primary" size="sm" onclick={handleInstall}> Install </Button>
</div>
</div>
</div>
{/if}
