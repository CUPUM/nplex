<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import { rootScroll } from '$stores/scroll';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const key = {};

	onMount(() => {
		rootScroll.lock(key);
		// navbarMaxWidth.set(NAVBAR_MAX_WIDTH.Full);
	});

	onDestroy(() => {
		rootScroll.unlock(key);
		// navbarMaxWidth.reset();
	});

	function handleSubmit() {}
</script>

<article>
	<Map cooperativeGestures={false}>
		<div class="ui-skeleton" slot="loading" />
	</Map>
	<form on:submit={handleSubmit} />
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
		align-self: flex-start;
		margin-top: calc(-1 * var(--ui-nav-h));
	}

	div {
		height: 100%;
		width: 100%;
	}
</style>
