<script lang="ts">
	import * as m from '$i18n/messages';
	import { withLang } from '$lib/i18n/location';
	import { projectCardCrossfade } from '$lib/motion/presets';
	import { ArrowRight } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-md px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href={withLang('/projects')}
		class="group/button py-lg border-dim flex w-full max-w-xl flex-row items-center justify-between self-center border-t"
	>
		<h2
			class="text-base-accent group-hover/button:text-primary text-2xl font-semibold transition-all"
			in:fly|global={{ y: 6 }}
		>
			{m.recent_projects()}
		</h2>
		<div class="button button-ghost text-sm" in:fly|global={{ x: -6 }}>
			{m.explore()}<ArrowRight />
		</div>
	</a>
	<ul class="gap-padding flex flex-row flex-wrap place-content-start items-center justify-center">
		{#each data.featuredProjects as project, i (project.id)}
			<li>
				<a
					href={withLang(`/projects/${project.id}`)}
					class="p-card-padding rounded-card bg-card flex aspect-[var(--ratio)] h-[50vh] flex-[none]"
					style:--ratio={(3 / (4 + Math.random())).toFixed(1)}
					in:fly|global={{ y: 12, opacity: 0, easing: expoOut, duration: 1200, delay: i * 100 }}
					out:projectCardCrossfade.send|global={{ key: project.id }}
				>
					{project.id}
				</a>
			</li>
		{/each}
	</ul>
</article>
