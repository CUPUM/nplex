<script lang="ts">
	import * as m from '$i18n/messages';
	import RandomShape from '$lib/components/patterns/random-shape.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';
	import { transform } from '$lib/motion/transform';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { data } = $props();
</script>

<header
	class="p-padding flex min-h-[calc(var(--spacing-main-full-height)/2)] flex-col items-center justify-center"
>
	<h1 class="text-biggest text-base-accent max-w-main w-full font-bold">
		<StaggerText
			text={m.guides()}
			translate="0 1em"
			separator=""
			clipPath={{ start: 'inset(0em)', end: 'inset(-0.25em)' }}
		/>
	</h1>
</header>
{#each data.featured as featured}
	<a
		class="p-section-padding rounded-section group/card max-w-main hover:bg-primary-accent bg-dotted bg-primary from-primary-accent duration-slow relative flex min-h-[calc(var(--spacing-main-full-height)/2-var(--spacing-navbar-height))] w-full flex-col items-center justify-center self-center transition-all hover:from-transparent"
		{...linkAttributes(`/guides/${featured.slug}`)}
		in:fly|global={{ y: 10, duration: 1200, easing: expoOut, delay: 150 }}
	>
		<div class="rounded-inherit pointer-events-none absolute inset-0 z-0 overflow-hidden">
			{#each { length: Math.round(Math.random() * 5 + 3) } as _, i (i)}
				{@const width = `${Math.round(Math.random() * 24 + 16)}rem`}
				{@const top = Math.round(Math.random() * 100)}
				{@const left = Math.round(Math.random() * 100)}
				<div
					class="absolute origin-bottom-left -translate-x-1/2 -translate-y-1/2"
					style:top="{top}%"
					style:left="{left}%"
					in:transform|global={{
						translate: [Math.round(Math.random() * 10), Math.round(Math.random() * 10)],
						rotate: [0, 0, -45],
						duration: 1000 + i * 150,
						opacity: 1,
					}}
				>
					<RandomShape
						class="from-primary to-primary-accent w-[var(--width)] bg-gradient-to-t"
						--width={width}
					/>
				</div>
			{/each}
		</div>
		<div class="prose prose-block z-1 w-full max-w-md">
			<h1
				class="duration-medium group-hover/card:text-on-primary-accent text-on-primary transition-all ease-out"
			>
				{featured.title}
			</h1>
			<p
				class="duration-medium opacity-softer group-hover/card:opacity-soft text-on-primary duration-slow transition-all ease-out"
			>
				{featured.summary}
			</p>
		</div>
	</a>
{/each}
