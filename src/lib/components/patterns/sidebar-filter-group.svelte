<script lang="ts">
	import { cn } from '$lib/components/utilities';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLFieldsetAttributes } from 'Svelte/elements';
	import { fly, slide } from 'svelte/transition';

	let {
		legend,
		class: className,
		children,
		open = $bindable(false),
	}: {
		legend: Snippet;
		open: boolean;
	} & HTMLFieldsetAttributes = $props();
</script>

<fieldset
	class={cn(
		'group/filter bg-card/soft relative flex flex-none flex-col items-stretch self-stretch rounded-lg',
		className
	)}
	data-state={open ? 'open' : undefined}
	in:fly|global={{ y: -6 }}
>
	<button
		onclick={() => (open = !open)}
		class="gap-card-padding p-card-padding hover:text-base-accent flex flex-row items-center justify-between text-xs text-base/soft transition-all group-data-[state='open']/filter:text-base/softish"
		aria-expanded={open}
	>
		{#if legend}
			<legend class="px-[0.5em] font-semibold">
				{@render legend()}
			</legend>
		{/if}
		<ChevronDown class="transition-all ease-out group-data-[state='open']/filter:rotate-180" />
	</button>
	{#if open}
		<div
			transition:slide={{ axis: 'y' }}
			class="p-card-padding relative flex flex-none flex-col pt-0"
		>
			{@render children?.()}
		</div>
	{/if}
</fieldset>
