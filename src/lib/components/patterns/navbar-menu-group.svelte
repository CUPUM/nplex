<script lang="ts">
	import type { Snippet } from 'svelte';
	import { expoIn, quadOut } from 'svelte/easing';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { cn } from '../utilities';

	let {
		children,
		legend,
		class: className,
		...restProps
	}: HTMLMenuAttributes & { legend?: Snippet } = $props();
</script>

<menu
	class={cn(
		'p-popover-padding bg-popover gap-padding relative flex flex-col rounded-lg text-base',
		className
	)}
	in:fly|global={{ x: 10, y: 10, duration: 1250, easing: quadOut }}
	out:fly|global={{ x: 10, y: -10, duration: 250, easing: expoIn }}
	{...restProps}
>
	{#if legend}
		<span
			class="px-input-padding py-input-nest bg-input/soft *:stroke-md *:[.lucide-icon]:opacity-soft flex flex-row items-center gap-[1em] self-start rounded-full text-xs text-base/soft font-thin"
		>
			{@render legend?.()}
		</span>
	{/if}
	<ul class="gap-input-group-gap flex flex-col">
		{@render children?.()}
	</ul>
</menu>
