<script lang="ts">
	import type { Dialog } from '$lib/builders/dialog.svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		children,
		class: className,
		dialog,
		...restProps
	}: HTMLDialogAttributes & { dialog: Dialog } = $props();
</script>

{#if dialog.open}
	<dialog
		class={cn(
			'p-padding justify-content-start gap-gutter fixed flex h-full w-full flex-col items-end bg-transparent',
			className
		)}
		{...restProps}
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
		data-meta-modal
	>
		{@render children?.()}
	</dialog>
{/if}
