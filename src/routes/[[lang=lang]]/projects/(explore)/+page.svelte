<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { RefreshCw } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import type { Snapshot } from './$types.js';
	import ProjectCard from './project-card.svelte';
	import ProjectsFilters from './projects-filters.svelte';

	let { data } = $props();

	const filtersForm = extendedSuperForm(data.filtersForm);

	let showFilters = $state<boolean>(true);
	let loadingMore = $state(false);

	afterNavigate(() => {
		loadingMore = false;
	});

	export const snapshot: Snapshot<{
		showFilters: typeof showFilters;
	}> = {
		capture() {
			return {
				showFilters,
			};
		},
		restore(value) {
			showFilters = value.showFilters;
		},
	};

	const [sendCard, receiveCard] = crossfade({
		fallback(node, params, intro) {
			return scale(node, {
				start: 0.95,
				duration: 500,
				easing: cubicOut,
				opacity: 0,
				delay: params.delay,
			});
		},
	});
</script>

<div class="px-padding mb-lg flex flex-1 flex-row">
	<form
		method="GET"
		class="w-sidebar-width mr-padding py-padding gap-card-gutter top-sticky-top sticky flex flex-col self-start text-sm"
	>
		<ProjectsFilters {...filtersForm} />
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
					class="relative col-span-1 row-span-[var(--rowspan)] flex h-full w-full group-data-[view-mode=masonry]/explore:aspect-[2/var(--rowspan)]"
					in:receiveCard|global={{ key: 'project-card', delay: i * 25 }}
					out:sendCard={{ key: 'project-card' }}
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
