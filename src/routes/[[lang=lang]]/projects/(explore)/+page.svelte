<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { projectCardCrossfade } from '$lib/motion/presets';
	import { RefreshCw } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import ProjectCard from './project-card.svelte';
	import ProjectsFilters from './projects-filters.svelte';

	let { data } = $props();

	const { projectTypes } = data;

	const filtersForm = extendedSuperForm(data.filtersForm);

	let loadingMore = $state(false);

	afterNavigate(() => {
		loadingMore = false;
	});
</script>

<div class="px-padding mb-lg pt-padding flex flex-1 flex-row">
	<form
		method="GET"
		class="w-sidebar-width mr-padding gap-card-gutter top-sticky-top sticky flex flex-col items-start self-start text-sm"
	>
		<ProjectsFilters {...filtersForm} {projectTypes} />
	</form>
	<section class="gap-lg flex flex-1 flex-col">
		<ul
			class="gap-padding flex flex-1 grid-flow-dense grid-cols-[repeat(auto-fit,minmax(var(--width-xs),1fr))] flex-col group-data-[view-mode=masonry]/explore:grid"
		>
			{#each data.result as project, i (project.id)}
				{@const rowspan = 2 + Math.round(Math.random() * 2)}
				<li
					animate:flip
					style:--rowspan={rowspan}
					class="relative col-span-1 row-span-[var(--rowspan)] flex h-full w-full flex-col group-data-[view-mode=masonry]/explore:aspect-[2/var(--rowspan)]"
					in:projectCardCrossfade.receive|global={{
						key: project.id,
						delay: i * 25,
					}}
					out:projectCardCrossfade.send|global={{ key: project.id }}
				>
					<ProjectCard {project} />
				</li>
			{/each}
		</ul>
		<menu class="gap-menu-gutter flex flex-row self-center">
			<a
				href={$page.url.toString()}
				class="button button-dashed rounded-full text-sm"
				data-sveltekit-noscroll
				data-sveltekit-replacestate
				onclick={() => (loadingMore = true)}
			>
				<IconSpinner icon={RefreshCw} busy={loadingMore} />{m.load_more()}
			</a>
		</menu>
	</section>
</div>
