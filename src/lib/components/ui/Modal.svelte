<script lang="ts">
	import { onDestroy } from 'svelte';
	import Button from './Button.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onConfirm?: () => void;
		title: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'primary' | 'danger';
		children?: unknown;
	}

	let {
		isOpen = $bindable(),
		onClose,
		onConfirm,
		title,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		variant = 'primary',
		children,
	}: Props = $props();

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	});

	onDestroy(() => {
		document.body.style.overflow = 'unset';
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
		onclick={onClose}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="p-6">
				<h2 id="modal-title" class="text-2xl font-bold mb-4">
					{title}
				</h2>
				<div class="mb-6">
					{@render children?.()}
				</div>
				<div class="flex gap-3 justify-end">
					<Button variant="secondary" onclick={onClose}>
						{cancelText}
					</Button>
					{#if onConfirm}
						<Button {variant} onclick={onConfirm}>
							{confirmText}
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
