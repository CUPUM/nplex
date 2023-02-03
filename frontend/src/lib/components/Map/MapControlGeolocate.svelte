<!--
	@component
	Simple button-wrapper component to add geolocation control to the parent map.
	For implementation inspo, see maplibre/mapbox control workflow: https://maplibre.org/maplibre-gl-js-docs/api/markers/

-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { GeolocateControl, type MapEvent } from 'maplibre-gl';
	import { createEventDispatcher, onDestroy, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { getMapContext } from './Map/Map.svelte';

	type $$Props = Omit<ComponentProps<Button>, 'active'>;
	type GeolocateEvent = 'trackuserlocationstart' | 'geolocate' | 'trackuserlocationend';

	let loading = false;
	let tracking = false;
	$: typedProps = $$props as $$Props;

	const mapContext = getMapContext();
	const map = mapContext.getMap();
	const geolocate = new GeolocateControl({
		trackUserLocation: true,
		positionOptions: {
			enableHighAccuracy: true,
		},
	});
	const dispatch = createEventDispatcher<Record<GeolocateEvent, MapEvent>>();

	geolocate.on('trackuserlocationstart', (e) => {
		loading = true;
		dispatch('trackuserlocationstart', e);
		geolocate.once('geolocate', (e) => {
			tracking = true;
			loading = false;
			dispatch('geolocate');
		});
	});

	geolocate.on('trackuserlocationend', (e) => {
		loading = false;
		tracking = false;
		dispatch('trackuserlocationend');
	});

	if (map) {
		map.addControl(geolocate);
	}

	function update(e: Event) {
		geolocate.trigger();
	}

	onDestroy(() => {
		// Remove control...
	});
</script>

<Button
	equi={!$$slots.default || typedProps.equi}
	variant="ghost"
	active={tracking}
	{...typedProps}
	on:click={update}
>
	<slot>
		<div />
		<Icon name="localize" class={loading ? 'spin' : ''} />
	</slot>
</Button>

<style lang="scss">
	:global(.maplibregl-ctrl-geolocate) {
		display: none !important;
	}

	div {
		display: none;
	}

	div + :global(.spin) {
		animation: spin 3s infinite cubic-bezier(0.8, 0, 0.2, 1);
		opacity: 0.5;
		transform-origin: center;
		transition: all 0.25s;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
