<script lang="ts">
	import Map from '$components/Map.svelte';
	import { rootScroll } from '$stores/scroll';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const key = {};

	onMount(() => {
		rootScroll.lock(key);
	});

	onDestroy(() => {
		rootScroll.unlock(key);
	});
</script>

<article>
	<Map>
		<!-- <MapProjects projects={data.projects} /> -->
	</Map>
</article>

<style lang="scss">
	article {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		padding-top: 0;
		height: 100vh;
		width: 100vw;
		margin-top: calc(-1 * var(--ui-nav-h));
	}
</style>
