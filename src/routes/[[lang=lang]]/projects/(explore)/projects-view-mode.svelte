<script lang="ts">
	import { page } from '$app/stores';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import SwitchThumb from '$lib/components/primitives/switch-thumb.svelte';
	import { LayoutDashboard, Map, StretchHorizontal } from 'lucide-svelte';

	let { viewMode = $bindable() }: { viewMode: 'masonry' | 'list' | 'map' } = $props();

	const key = {};

	function setSearchParamsViewMode(url: URL, mode: typeof viewMode) {
		const searchParams = new URLSearchParams(url.searchParams);
		if (mode === 'map') {
			searchParams.delete('viewMode');
		} else {
			searchParams.set('viewMode', mode);
		}
		return searchParams;
	}

	$effect(() => {
		if ($page.route.id?.split('(explore)')[1]?.startsWith('/map')) {
			viewMode = 'map';
		} else {
			const param = $page.url.searchParams.get('viewMode');
			if (param === 'list') {
				viewMode = 'list';
			} else {
				viewMode = 'masonry';
			}
		}
	});
</script>

<menu class="switch self-start shadow-md backdrop-blur-md" use:ripple>
	<a
		class="switch-item aspect-square"
		{...linkAttributes(`/projects?${setSearchParamsViewMode($page.url, 'masonry').toString()}`)}
		data-state={viewMode === 'masonry' ? 'checked' : undefined}
		data-sveltekit-replacestate
	>
		<LayoutDashboard />
		<SwitchThumb {key} current={viewMode === 'masonry'} />
	</a>
	<a
		class="switch-item aspect-square"
		{...linkAttributes(`/projects?${setSearchParamsViewMode($page.url, 'list').toString()}`)}
		data-state={viewMode === 'list' ? 'checked' : undefined}
		data-sveltekit-replacestate
	>
		<StretchHorizontal />
		<SwitchThumb {key} current={viewMode === 'list'} />
	</a>
	<a
		class="switch-item aspect-square"
		{...linkAttributes(`/projects/map${setSearchParamsViewMode($page.url, 'map')}`)}
		data-state={viewMode === 'map' ? 'checked' : undefined}
	>
		<SwitchThumb {key} current={viewMode === 'map'} />
		<Map />
	</a>
</menu>
