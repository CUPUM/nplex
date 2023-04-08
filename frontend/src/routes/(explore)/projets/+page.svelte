<script lang="ts">
	import { page } from '$app/stores';
	import { NAVBAR_WIDTH, navbarWidth } from '$routes/Navbar.svelte';
	import RootScroll from '$routes/RootScroll.svelte';
	import { onDestroy } from 'svelte';

	export let data;

	const key = Symbol('projects');

	navbarWidth.set(key, NAVBAR_WIDTH.Full);

	onDestroy(() => {
		navbarWidth.unset(key);
	});

	function handleSubmit() {}

	export const snapshot = {
		capture() {},
		restore(snapshot) {},
	};
</script>

<RootScroll lock />
<article id="projects-explore" class:map-compact={$page.data.projectsMapCompact}>
	<section id="projects-filters">Filtres ici</section>
	<section id="projects-map">
		<!-- <Map cooperativeGestures={false} mapStyle={tonerLight}>
			<div class="ui-skeleton" slot="loading" />
		</Map> -->
	</section>
	<section id="projects-list">
		<ul>
			<li>stuff</li>
		</ul>
	</section>
</article>

<style lang="scss">
	#projects-explore {
		position: relative;
		z-index: 0;
		height: 100vh;
		height: 100svh;
		align-self: stretch;
		margin-top: calc(-1 * var(--ui-nav-h) - var(--ui-explore-search-h));
		display: flex;
		flex-direction: row;
	}

	#projects-filters {
		grid-column: left;
		grid-row: 1;
		z-index: 1;
	}

	#projects-map {
		position: relative;
		flex: 1;
		border-radius: var(--ui-radius-xl);
		height: 100%;
		background-color: col(bg, 900);
	}

	.ui-skeleton {
		height: 100%;
		width: 100%;
	}
</style>
