<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { RefreshCw } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import type { Snapshot } from './$types.js';
	import ProjectCard from './project-card.svelte';
	import ProjectsSearch from './projects-search.svelte';
	import ProjectsViewMode from './projects-view-mode.svelte';

	let { data } = $props();

	const filtersForm = extendedSuperForm(data.filtersForm);

	let showFilters = $state<boolean>(true);
	let viewMode = $state<ComponentProps<ProjectsViewMode>['viewMode']>('masonry');

	export const snapshot: Snapshot<{
		showFilters: typeof showFilters;
		viewMode: typeof viewMode;
	}> = {
		capture() {
			return {
				showFilters,
				viewMode,
			};
		},
		restore(value) {
			showFilters = value.showFilters;
			viewMode = value.viewMode;
		},
	};

	const [sendCard, receiveCard] = crossfade({
		fallback(node, params, intro) {
			return scale(node, { start: 0.95, duration: 500, easing: cubicOut });
		},
	});
</script>

<article class="group/projects px-padding mb-lg flex flex-row" data-view-mode={viewMode}>
	<form
		method="GET"
		class="w-sidebar-width mr-padding py-padding gap-card-gutter top-sticky-top sticky flex flex-col self-start text-sm"
	>
		<ProjectsViewMode bind:viewMode />
		<ProjectsSearch {...filtersForm} />
		<section class="px-field-gutter">More filters to come...</section>
	</form>
	<section class="gap-lg flex flex-1 flex-col">
		<ul
			class="gap-padding flex flex-1 grid-flow-dense auto-rows-[1fr] grid-cols-[repeat(auto-fit,minmax(var(--width-2xs),1fr))] flex-col group-data-[view-mode=masonry]/projects:grid"
		>
			{#each data.result as project, i (project.id)}
				{@const colspan = 1 + Math.ceil(Math.random() * 3)}
				{@const rowspan = 1 + Math.ceil(Math.random() * 3)}
				<li
					animate:flip
					style:--colspan={colspan}
					style:--rowspan={rowspan}
					class="relative col-span-[var(--colspan)] row-span-[var(--rowspan)] flex h-full w-full"
					in:receiveCard={{ key: 'project-card' }}
					out:sendCard={{ key: 'project-card' }}
				>
					<ProjectCard {project} />
				</li>
			{/each}
			<li class="col-1 row-1 pointer-events-none aspect-square"></li>
		</ul>
		<menu class="gap-menu-gutter flex flex-row self-center">
			<a
				href={$page.url.toString()}
				class="button button-dashed rounded-full text-sm"
				data-sveltekit-noscroll
				data-sveltekit-replacestate
			>
				<IconSpinner icon={RefreshCw} busy={false} />{m.load_more()}
			</a>
		</menu>
	</section>
</article>
