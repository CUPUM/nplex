<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'section'">
	import { noop } from '$lib/common/noop';
	import type { HTMLAttributes } from 'Svelte/elements';
	import type { Snippet } from 'svelte';
	import type { ActionReturn } from 'svelte/action';
	import { cn } from '../utilities';

	let {
		header,
		children,
		class: className,
		as = 'section' as T,
		use,
		menu,
		...restProps
	}: {
		as?: T;
		header?: Snippet;
		children: Snippet;
		menu?: Snippet;
		use?: (node: HTMLElementTagNameMap[T]) => ActionReturn;
	} & HTMLAttributes<HTMLElementTagNameMap[T]> = $props();

	let action = $derived(use ?? noop);
</script>

<svelte:element
	this={as as string}
	{...restProps}
	class={cn(
		'p-lg gap-gap rounded-section bg-card relative flex flex-col items-start text-sm',
		className
	)}
	use:action
>
	{#if header}
		<header class="prose prose-block pb-gap self-stretch text-sm">
			{@render header()}
		</header>
	{/if}
	{@render children?.()}
	{#if menu}
		<menu>
			{@render menu()}
		</menu>
	{/if}
</svelte:element>
