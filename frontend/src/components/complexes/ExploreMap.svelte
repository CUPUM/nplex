<script lang="ts" context="module">
	export interface ExploreMapContext {
		inited: Writable<boolean>;
		getMap: () => MLMap;
	}
</script>

<script lang="ts">
	import Loading from '$components/primitives/Loading.svelte';
	import { isExploreArticle } from '$stores/explore';
	import { width } from '$transitions/width';
	import { Ctx } from '$utils/contexts';
	import { Map as MLMap } from 'maplibre-gl';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let loading = true;
	let inited = writable(false);
	let container: HTMLElement;
	let map: MLMap;
	let resizeObs: ResizeObserver;
	let resizeDebounce;

	setContext<ExploreMapContext>(Ctx.ExploreMap, {
		inited,
		getMap: () => map,
	});

	function handleResize() {
		if (resizeDebounce) clearTimeout(resizeDebounce);
		resizeDebounce = setTimeout(() => {
			map?.resize();
			clearTimeout(resizeDebounce);
		}, 1);
	}

	onMount(() => {
		resizeObs = new ResizeObserver(handleResize);
		resizeObs.observe(container);

		map = new MLMap({
			container,
			style: 'https://api.maptiler.com/maps/c11db38b-dd55-42e7-aaa6-a20740e518a6/style.json?key=dtV5LH1SmQB4VOb80qqI',
			center: [-73.65, 45.55],
			zoom: 9.5,
			pitch: 0,
		});

		map.on('load', () => {
			inited.set(true);
			loading = false;
		});

		map.on('dataloading', (e) => {
			// if (!e.hasOwnProperty('tile')) {
			// 	loading = true;
			// }
		});

		map.on('data', () => {
			// loading = false;
		});
	});

	onDestroy(() => {});
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<section class:loading class:inited class:is-article={$isExploreArticle} transition:width={{}}>
	{#if loading}
		<Loading style="z-index: 100" />
	{/if}
	<figure bind:this={container} />
	<slot />
</section>

<style lang="postcss">
	section {
		position: relative;
		flex: 1;
		margin-bottom: 1rem;
		margin-left: 1rem;
		padding: 0;
		border-radius: 2rem;
		background-color: var(--color-light-300);
		transition: all 0.35s cubic-bezier(0.25, 0, 0.25, 1);
		overflow: hidden;

		&:first-child:not(.is-article) {
			/* margin-bottom: 0;
			margin-left: 0;
			border-radius: 0 2rem 0 0; */
		}

		&:last-child:not(.is-article) {
			margin-right: 1rem;
		}

		&.is-article {
			margin: 0;
			/* border-radius: 0 0 2rem 2rem; */
			padding: 0;
			pointer-events: none;
		}

		& :global(.maplibregl-ctrl-bottom-right) {
			border-radius: 1em;
			overflow: hidden;
			bottom: 16px;
			right: 16px;
			opacity: 0.35;
			background-color: rgba(0, 0, 0, 0.2);
			transition: opacity 0.25s;

			&:hover {
				opacity: 1;
			}

			& :global(*) {
				background-color: transparent;
				color: var(--color-light-500);
				font-family: var(--font-main);
				transition: all 0.15s;

				& :global(summary) {
					filter: invert();
				}

				& :global(a:hover) {
					text-decoration: none;
					color: var(--color-secondary-500);
				}
			}
		}
	}

	.loading {
		/* pointer-events: none; */
		/* transform: scale(0.97); */
		/* opacity: 0.8; */
	}

	.inited {
		& figure {
			clip-path: circle(100% at center);
		}
	}

	figure {
		position: relative;
		display: block;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0px;
		width: 100%;
		height: 100%;
		clip-path: circle(0% at center);
		transition: clip-path 0.5s cubic-bezier(0.25, 0, 0.25, 1);
	}
</style>
