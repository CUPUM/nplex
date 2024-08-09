<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';
	import { ChevronLeft, List } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { Snapshot } from './$types.js';

	let { data } = $props();

	let outlineOpen = $state(false);

	export const snapshot: Snapshot<{ outlineOpen: boolean }> = {
		capture() {
			return { outlineOpen };
		},
		restore(v) {
			outlineOpen = v.outlineOpen;
		},
	};
</script>

<header class="p-padding min-h-main-full-height flex flex-col items-center justify-center">
	<hgroup class="max-w-main pb-sticky-top flex w-full flex-col items-start justify-center">
		<h1 class="text-biggest text-base-accent max-w-md font-bold">
			<StaggerText
				text={data.title}
				translate="0 1em"
				opacity="0"
				clipPath={{ start: 'inset(0 0 -0.15em 0)', end: 'inset(0 0 -0.25em 0)' }}
			/>
		</h1>
	</hgroup>
</header>
<div class="flex flex-row items-start">
	{#if outlineOpen}
		<nav
			class="pt-sticky-top bg-base sticky top-0 flex h-[100vh] flex-row items-center backdrop-blur-lg"
			transition:slide={{ axis: 'x', duration: 500, easing: expoOut }}
		>
			<div class="p-padding flex flex-col items-start overflow-y-auto text-sm">
				{#each data.headings as heading, i}
					{@const attributes = linkAttributes(`#${heading.id}`)}
					<a
						{...attributes}
						style:--i-heading={i}
						class="px-input-padding hover:text-input-accent opacity-soft aria-[current]:text-primary-accent hover:bg-input rounded-input relative truncate py-[calc(0.5*var(--spacing-input-padding))] font-bold"
						use:ripple
					>
						{heading.value}
					</a>
				{/each}
			</div>
		</nav>
	{/if}
	<div class="pb-xl flex flex-1 flex-col items-start">
		<button
			class="ml-padding button sticky top-[50%] aspect-square -translate-y-1/2 rounded-full text-sm backdrop-blur-md"
			onclick={() => {
				outlineOpen = !outlineOpen;
			}}
			aria-expanded={outlineOpen}
		>
			{#if outlineOpen}
				<ChevronLeft />
			{:else}
				<List />
			{/if}
		</button>
		<article class="prose mx-md self-center">
			<svelte:component this={data.content} />
		</article>
	</div>
</div>
