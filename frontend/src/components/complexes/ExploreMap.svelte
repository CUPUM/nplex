<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Map, { type MapContext } from '$components/primitives/Map.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import { isExploreArticle } from '$stores/explore';
	import { slip } from '$transitions/slip';
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';

	let getMap: MapContext['getMap'];
	let inited: MapContext['inited'];
	let loading: MapContext['loading'];

	/**
	 * Pre-setting a MapContext to move it one level up and make it here available to non-directly-nested Components.
	 */
	setContext<MapContext>(Ctx.Map, {
		getMap,
		inited,
		loading,
	});
</script>

<section class:is-article={$isExploreArticle} transition:slip={{ height: true, width: true }}>
	<div id="wrapper">
		<Map />
	</div>
	<MapToolbar>
		<Button icon="">Test</Button>
	</MapToolbar>
</section>

<style lang="postcss">
	section {
		z-index: 0;
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		margin-left: 1rem;
		padding: 0;
		border-radius: 2rem;
		background-color: var(--color-light-500);
		transition: all 0.35s cubic-bezier(0.25, 0, 0.25, 1);
		overflow: visible;

		&:first-child:not(.is-article) {
		}

		&:last-child:not(.is-article) {
			margin-right: 1rem;
		}

		&.is-article {
			margin: 0 1rem;
			padding: 0;
			pointer-events: none;
		}
	}

	#wrapper {
		position: absolute;
		width: 100vw;
		height: calc(100vh - var(--navbar-height));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
