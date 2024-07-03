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

<article class="gap-lg px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href={withLang('/projects')}
		class="group/button max-w-main flex w-full flex-row items-center justify-between self-center"
	>
		<h2
			class="group-hover/button:text-base-accent text-2xl text-base font-bold transition-all"
			in:fly|global={{ y: 6 }}
		>
			{m.recent_projects()}
		</h2>
		<div class="button button-ghost rounded-full text-sm" in:fly|global={{ x: -6 }}>
			{m.explore()}<ArrowRight />
		</div>
	</a>
	<ul
		class="gap-gap justify-content-center grid grid-flow-dense auto-rows-[15vw] grid-cols-[repeat(auto-fit,minmax(15vw,1fr))]"
	>
		{#each data.featuredProjects as project, i (project.id)}
			<li
				style:--col-span={Math.floor(1 + Math.random() * 2)}
				style:--row-span={Math.floor(1 + Math.random() * 2)}
				class="p-card-padding rounded-card bg-card col-span-[var(--col-span)] row-span-[var(--row-span)]"
			>
				<a
					href={withLang(`/projects/${project.id}`)}
					class=""
					in:fly|global={{ y: 12, opacity: 0, easing: expoOut, duration: 1200, delay: i * 100 }}
					out:projectCardCrossfade.send|global={{ key: project.id }}
				>
					{project.id}
				</a>
			</li>
		{/each}
	</ul>
</article>
