<script lang="ts">
	import * as m from '$i18n/messages';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		text,
		fallback,
		class: className,
		render,
		...spanProps
	}: {
		text?: string | null;
		fallback?: string;
		render?: Snippet<[text: string]>;
	} & HTMLAttributes<HTMLSpanElement> = $props();
</script>

{#snippet _render(text: string)}
	{#if render}
		{@render render(text)}
	{:else}
		{text}
	{/if}
{/snippet}

{#if text}
	{@render _render(text)}
{:else}
	<span class={cn('opacity-soft font-thin italic', className)} {...spanProps}>
		{@render _render(fallback ?? m.not_defined())}
	</span>
{/if}
