<script lang="ts">
	import { cn } from '$lib/components/utilities';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'Svelte/elements';
	import { fly, slide } from 'svelte/transition';

	let {
		legend,
		class: className,
		children,
		collapsible = true,
		open = $bindable(false),
		...restProps
	}: {
		legend?: Snippet;
		open?: boolean;
		collapsible?: boolean;
	} & HTMLAttributes<HTMLFieldSetElement> = $props();
</script>

<fieldset
	class={cn(
		'group/filter bg-card/soft rounded-section after:bg-base after:rounded-inherit relative flex min-w-0 flex-none flex-col items-stretch self-stretch after:absolute after:inset-0 after:-z-1',
		className
	)}
	data-state={open ? 'open' : undefined}
	in:fly|global={{ y: -6 }}
	{...restProps}
>
	{#if collapsible}
		<button
			type="button"
			onclick={() => (open = !open)}
			class="peer/legend gap-card-padding p-card-padding bg-card/softish hover:text-base-accent rounded-inherit hover:bg-card duration-medium active:bg-card-accent relative sticky top-0 z-1 flex flex-row items-center justify-between text-xs text-base/softish shadow-sm backdrop-blur-md transition-all ease-out group-data-[state='open']/filter:text-base"
			aria-expanded={open}
		>
			{#if legend}
				<legend class="px-[0.5em] font-semibold">
					{@render legend()}
				</legend>
			{/if}
			<ChevronDown class="transition-all ease-out group-data-[state='open']/filter:rotate-180" />
		</button>
	{:else if legend}
		<legend
			class="peer/legend py-card-padding rounded-inherit relative sticky top-0 z-1 flex flex-row items-center justify-between px-[calc(var(--spacing-card-padding)+0.5em)] text-xs text-base/soft font-semibold backdrop-blur-md"
		>
			{@render legend()}
		</legend>
	{/if}
	{#if !collapsible || open}
		<div
			transition:slide={{ axis: 'y', duration: 350, easing: expoOut }}
			class="p-card-padding relative flex min-h-0 flex-none flex-col peer-[:is(legend)]/legend:pt-[var(--outline-width-focus)]"
		>
			{@render children?.()}
		</div>
	{/if}
</fieldset>
