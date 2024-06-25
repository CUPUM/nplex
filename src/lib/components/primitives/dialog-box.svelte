<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { scale, type TransitionConfig } from 'svelte/transition';
	import { cn } from '../utilities';

	let {
		dialog,
		title,
		description,
		actions,
		children,
		transition,
		closeButton = true,
		class: className,
		style,
		...dialogProps
	}: Omit<HTMLDialogAttributes, 'title' | 'description'> & {
		dialog: Dialog;
		title?: Snippet<[Dialog]>;
		description?: Snippet<[Dialog]>;
		children?: Snippet<[Dialog]>;
		actions?: Snippet<[Dialog]>;
		closeButton?: boolean;
	} & (
			| {
					in?: TransitionConfig;
					out?: TransitionConfig;
					transition?: undefined;
			  }
			| {
					in?: undefined;
					out?: undefined;
					transition?: TransitionConfig;
			  }
		) = $props();
</script>

{#if dialog.open}
	<dialog
		style:--dialog-margin="var(--spacing-padding)"
		style:--dialog-padding="2.25em"
		class="m-auto max-h-[calc(100%-2*var(--dialog-margin))] max-w-[min(calc(100%-2*var(--dialog-margin)),var(--width-md))] bg-transparent p-0 text-base backdrop:opacity-0"
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
		transition:scale={{ start: 0.96, duration: 250, easing: expoOut }}
		{...dialogProps}
	>
		<div
			class={cn(
				'bg-popover border-dim leading-sm rounded-lg border p-[var(--dialog-padding)] text-sm shadow-lg [:has(>header:first-child)]:pt-[calc(var(--dialog-padding)-0.5em)]',
				className
			)}
			{style}
			{...dialog.contentAttributes}
		>
			{#if title || description}
				<header class="relative flex flex-col gap-[1em]">
					<hgroup class="text-lg font-semibold">
						{#if closeButton}
							<button
								tabindex="0"
								class="button button-ghost compact top-[-0.125em] [float:inline-end] aspect-square rounded-full text-sm"
								{...dialog.closeAttributes}
							>
								<X />
							</button>
						{/if}
						{@render title?.(dialog)}
					</hgroup>
					{#if description}
						<section class="opacity-dim prose prose-block leading-sm mb-[.5em] text-sm">
							{@render description?.(dialog)}
						</section>
					{/if}
				</header>
				<hr class="border-dim -mx-[var(--dialog-padding)] mt-[1.5em] mb-[var(--dialog-padding)]" />
			{/if}
			{@render children?.(dialog)}
			{#if actions}
				<hr class="border-dim -mx-[var(--dialog-padding)] mt-[var(--dialog-padding)] mb-[1.5em]" />
				<menu
					class="justify-content-start gap-menu-gutter sticky bottom-0 flex flex-row-reverse bg-inherit"
				>
					{@render actions(dialog)}
				</menu>
			{/if}
		</div>
	</dialog>
{/if}
