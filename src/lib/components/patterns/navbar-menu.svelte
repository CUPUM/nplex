<script lang="ts">
	import type { Dialog } from '$lib/builders/dialog.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { ripple } from '../primitives/ripple.svelte';
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
			'p-padding gap-gap fixed flex h-full w-full flex-col items-stretch justify-end overflow-y-auto bg-transparent md:items-end md:justify-start',
			className
		)}
		{...restProps}
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
		data-meta-modal
	>
		<div class="sticky top-0 flex grow flex-row items-end justify-center md:hidden">
			<button
				class="button button-ghost aspect-square rounded-full"
				use:ripple
				in:fly={{ y: 16, duration: 350, easing: expoOut }}
				out:fly|global={{ y: -16, duration: 250, easing: cubicIn }}
			>
				<ChevronDown />
			</button>
		</div>
		{@render children?.()}
	</dialog>
{/if}
