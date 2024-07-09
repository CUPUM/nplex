<script lang="ts">
	import ResizableSidebarHandle from '$lib/components/patterns/resizable-sidebar-handle.svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import FiltersSearch from './filters-search.svelte';
	import FiltersTypes from './filters-types.svelte';

	let { lists }: { lists: PageData['lists'] } = $props();
</script>

<ResizableSidebarHandle>
	{#snippet sidebar(sidebar, css)}
		<form
			use:sidebar
			method="GET"
			style:--spacing-sidebar-width={css}
			class="w-sidebar-width pb-padding gap-gap top-sticky-top max-h-main-full-height z-front sticky flex min-h-0 flex-col items-stretch text-sm"
			in:fly|global={{ x: -6, duration: 350, easing: expoOut }}
		>
			<FiltersSearch />
			<FiltersTypes {...lists} />
		</form>
	{/snippet}
</ResizableSidebarHandle>
