<script lang="ts">
	import * as m from '$i18n/messages';
	import ProjectCard from '$lib/components/patterns/project-card.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import StaggerText, { flyUpClip } from '$lib/components/primitives/stagger-text.svelte';
	import { ArrowRight, DraftingCompass } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-lg px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href="/projects"
		class="group/button max-w-main flex w-full flex-row items-center justify-between self-center"
	>
		<h2
			class="group-hover/button:text-base-accent text-2xl text-base font-bold transition-all"
			in:fly|global={{ y: 6 }}
		>
			<StaggerText text={m.recent_projects()} {...flyUpClip} />
		</h2>
		<div class="button button-ghost rounded-full text-sm" in:fly|global={{ x: -6 }}>
			{m.see_more()}<ArrowRight />
		</div>
	</a>
	<ul
		class="gap-gap grid grid-flow-dense auto-rows-[var(--width-2xs)] grid-cols-[repeat(auto-fit,minmax(var(--width-2xs),1fr))]"
	>
		{#each data.featuredProjects as project, i (project.id)}
			<li
				style:--col-span={Math.floor(1 + Math.random() * 2)}
				style:--row-span={Math.floor(1 + Math.random() * 2)}
				class="col-span-[var(--col-span)] row-span-[var(--row-span)]"
			>
				<ProjectCard {...project} />
			</li>
		{/each}
	</ul>
	<a href="/projects" class="button button-cta big self-center rounded-full text-sm" use:ripple>
		<DraftingCompass />
		{m.explore()}
		<ArrowRight />
	</a>
</article>
