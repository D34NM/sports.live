<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';

interface Props extends HTMLAttributes<HTMLDivElement> {
class?: string;
}

let { class: className = '', children, ...props }: Props = $props();
</script>

<div
class={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
{...props}
>
{@render children?.()}
</div>
