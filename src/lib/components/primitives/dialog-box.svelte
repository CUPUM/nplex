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
		class="m-auto max-h-[calc(100%-2*var(--dialog-margin))] max-w-[min(calc(100%-2*var(--dialog-margin)),var(--width-md))] bg-transparent p-0 text-base backdrop:opacity-0"
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
		transition:scale={{ start: 1.05, duration: 250, easing: expoOut }}
		{...dialogProps}
	>
		<div
			class={cn(
				'bg-popover border-base/softer leading-sm [:where(&_hr)]:border-base/softer p-section-padding [:where(&_hr)]:-mx-section-padding rounded-lg border text-sm shadow-lg [:has(>header:first-child)]:pt-[calc(var(--spacing-section-padding)-1em)] [:where(&_hr)]:my-[calc(var(--spacing-section-padding)-1.5em)]',
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
								class="button button-ghost compact ml-md top-[-0.125em] [float:inline-end] aspect-square rounded-full text-sm"
								{...dialog.closeAttributes}
							>
								<X />
							</button>
						{/if}
						{@render title?.(dialog)}
					</hgroup>
					{#if description}
						<section class="opacity-soft prose prose-block leading-sm mb-[0.5em] text-sm">
							{@render description?.(dialog)}
						</section>
					{/if}
				</header>
				<hr class="mb-section-padding" />
			{/if}
			{@render children?.(dialog)}
			{#if actions}
				<hr class="mt-section-padding" />
				<menu
					class="justify-content-start gap-input-group-gap sticky bottom-0 flex flex-row-reverse bg-inherit"
				>
					{@render actions(dialog)}
				</menu>
			{/if}
		</div>
	</dialog>
{/if}
