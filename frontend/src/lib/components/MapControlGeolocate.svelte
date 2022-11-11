<!--
	@component
	Simple button-wrapper component to add geolocation control to the parent map.
	For implementation inspo, see maplibre/mapbox control workflow: https://maplibre.org/maplibre-gl-js-docs/api/markers/

-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { GeolocateControl } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';
	import { onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { getMapContext } from './Map.svelte';

	type $$Props = ComponentProps<Button>;

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

	geolocate.on('trackuserlocationstart', (e) => {
		loading = true;
		geolocate.once('geolocate', () => {
			tracking = true;
			loading = false;
		});
	});

	geolocate.on('trackuserlocationend', (e) => {
		loading = false;
		tracking = false;
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

<Button equi variant="ghost" active={tracking} {...typedProps} on:click={update}>
	<div />
	<Icon name="localize" class={loading ? 'spin' : ''} />
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
