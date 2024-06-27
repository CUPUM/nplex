<script lang="ts">
	import { cn } from '$lib/components/utilities';
	import type { Snippet } from 'svelte';
	import type { HTMLFieldsetAttributes } from 'Svelte/elements';
	import { fly } from 'svelte/transition';

	let {
		legend,
		class: className,
		children,
	}: { legend: Snippet } & HTMLFieldsetAttributes = $props();
</script>

<fieldset
	class={cn(
		'bg-card-dim p-card-gutter gap-card-gutter flex flex-col items-stretch self-stretch rounded-lg',
		className
	)}
	in:fly|global={{ y: -6 }}
>
	{#if legend}
		<legend class="text-base-dim px-[0.5em] text-xs font-semibold">
			{@render legend()}
		</legend>
	{/if}
	{@render children?.()}
</fieldset>
