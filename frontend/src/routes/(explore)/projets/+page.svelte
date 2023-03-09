<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import { navbarWidth, NAVBAR_WIDTH } from '$routes/Navbar.svelte';
	import { rootScroll } from '$stores/rootScroll';
	import tonerLight from '$utils/map/styles/tonerLight';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import ProjectsFacets from './ProjectsFacets.svelte';

	export let data: PageData;

	const key = Symbol('projects');

	navbarWidth.set(key, NAVBAR_WIDTH.Full);

	onMount(() => {
		rootScroll.lock(key);
	});

	onDestroy(() => {
		rootScroll.unlock(key);
		navbarWidth.unset(key);
	});

	function handleSubmit() {}
</script>

<article>
	<section class="facets">
		<ProjectsFacets />
	</section>
	<section class="map">
		<Map cooperativeGestures={false} mapStyle={tonerLight}>
			<div class="ui-skeleton" slot="loading" />
		</Map>
	</section>
</article>

<style lang="scss">
	article {
		--left-w: 400px;
		--right-w: 400px;
		--gutter: 1.5rem;
		position: relative;
		z-index: 0;
		height: 100vh;
		width: 100vw;
		align-self: flex-start;
		display: grid;
		grid-template-columns:
			[full-start gutter-start-start]
			var(--gutter)
			[gutter-start-end left-start]
			var(--left-w)
			[left-end center-start]
			1fr
			[center-end right-start]
			var(--right-w)
			[right-end gutter-end-start]
			var(--gutter)
			[gutter-end-end full-end];
		flex-direction: row;
		align-items: flex-start;
		margin-top: calc(-1 * var(--ui-nav-h));
	}

	.facets {
		grid-column: left;
		grid-row: 1;
		z-index: 1;
	}

	.map {
		position: relative;
		grid-column: full;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}

	.ui-skeleton {
		height: 100%;
		width: 100%;
	}
</style>
