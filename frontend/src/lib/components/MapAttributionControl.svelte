<script lang="ts" context="module">
</script>

<script lang="ts">
	import { AttributionControl, type AttributionOptions, type ControlPosition } from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let compact: AttributionOptions['compact'] = undefined;
	export let customAttribution: AttributionOptions['customAttribution'] = undefined;
	export let position: ControlPosition = 'bottom-left';

	const { getMap } = getMapContext();

	let map: ReturnType<typeof getMap>;
	const control = new AttributionControl({ compact, customAttribution });

	onMount(() => {
		map = getMap();
		if (map) {
			map.addControl(control, position);
		}
	});

	onDestroy(async () => {
		if (map && control._attribHTML) {
			map.removeControl(control);
		}
	});
</script>

<style lang="scss" global>
	.maplibregl-ctrl-attrib {
		font-family: var(--ui-font-main);
		font-size: var(--ui-text-2xs);
		// background-color: rgb(200, 210, 220, 0.2);
		backdrop-filter: blur(8px);
	}

	.maplibregl-ctrl-attrib-button {
	}

	.maplibregl-ctrl-attrib-inner > * {
		// color: col(fg, 500) !important;
		background: transparent;
	}
</style>
