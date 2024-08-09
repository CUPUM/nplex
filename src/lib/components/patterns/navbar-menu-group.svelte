<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { fly, type FlyParams } from 'svelte/transition';
	import { cn } from '../utilities';

	let {
		children,
		legend,
		class: className,
		intro,
		outro,
		...restProps
	}: HTMLMenuAttributes & { legend?: Snippet; intro?: FlyParams; outro?: FlyParams } = $props();
</script>

<menu
	class={cn(
		'p-section-padding bg-popover gap-padding relative flex flex-col rounded-lg text-base',
		className
	)}
	in:fly|global={{ x: 12, duration: 750, easing: expoOut, ...intro }}
	out:fly|global={{ y: 12, duration: 250, easing: cubicOut, ...outro }}
	{...restProps}
>
	{#if legend}
		<span
			class="px-input-padding py-input-nest bg-input/soft *:icon:stroke-md opacity-soft flex flex-row items-center gap-[1em] self-start rounded-full text-base text-xs"
		>
			{@render legend?.()}
		</span>
	{/if}
	<ul class="gap-input-group-gap flex flex-col">
		{@render children?.()}
	</ul>
</menu>
