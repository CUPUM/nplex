<script lang="ts">
	import { page } from '$app/stores';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import SwitchThumb from '$lib/components/primitives/switch-thumb.svelte';
	import { LayoutDashboard, Map, StretchHorizontal } from 'lucide-svelte';

	let { viewMode = $bindable() }: { viewMode: 'masonry' | 'list' } = $props();

	const key = {};
</script>

<menu class="switch self-start rounded-full" use:ripple>
	<label class="switch-item">
		<LayoutDashboard />
		<SwitchThumb {key} current={viewMode === 'masonry'} />
		<input class="sr-only" type="radio" bind:group={viewMode} value="masonry" />
	</label>
	<label class="switch-item">
		<StretchHorizontal />
		<SwitchThumb {key} current={viewMode === 'list'} />
		<input class="sr-only" type="radio" bind:group={viewMode} value="list" />
	</label>
	<a class="switch-item" {...linkAttributes(`/projects/map${$page.url.search}`)}>
		<Map />
	</a>
</menu>
