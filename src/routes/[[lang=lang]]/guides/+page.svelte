<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';
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
		class="p-section-padding rounded-section group/card max-w-main hover:bg-card bg-dotted bg-card/soft flex min-h-[calc(var(--spacing-main-full-height)/2-var(--spacing-navbar-height))] w-full flex-col items-center justify-center self-center from-current/10 transition-all"
		{...linkAttributes(`/guides/${featured.slug}`)}
		in:fly|global={{ y: 6, duration: 1200, easing: expoOut, delay: 500 }}
	>
		<div class="prose prose-block w-full max-w-md">
			<h1
				class="duration-medium group-hover/card:text-primary-accent text-base transition-all ease-out"
			>
				{featured.title}
			</h1>
			<p
				class="duration-medium opacity-soft group-hover/card:opacity-softish transition-all ease-out"
			>
				{featured.summary}
			</p>
		</div>
	</a>
{/each}
