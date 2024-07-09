<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
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
<div class="gap-lg grid grid-cols-[1fr_min(100%,var(--width-md))_1fr] items-start">
	<nav
		class="p-lg top-sticky-top mt-lg bg-dotted sticky flex max-w-xs flex-col items-start from-current/10 from-[2px] bg-[size:1em_1em] bg-center text-sm font-bold"
	>
		{#each data.headings as heading, i}
			{@const attributes = linkAttributes(`#${heading.id}`)}
			<a
				{...attributes}
				style:--i-heading={i}
				class="p-padding hover:text-primary-accent opacity-softish aria-[current]:text-base-accent hover:bg-input rounded-input relative block max-w-full flex-none hyphens-auto break-words"
				use:ripple
			>
				{heading.value}
			</a>
		{/each}
	</nav>
	<article class="prose pb-xl">
		<svelte:component this={data.content} />
	</article>
</div>
