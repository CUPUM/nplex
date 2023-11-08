<script lang="ts">
	import { AttributionControl, type AttributionOptions, type ControlPosition } from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';

	// export let compact: AttributionOptions['compact'] = undefined;
	export let customAttribution: AttributionOptions['customAttribution'] = undefined;
	export let position: ControlPosition = 'bottom-left';

	const { getMap } = getMapContext();

	let map: ReturnType<typeof getMap>;
	const control = new AttributionControl({ compact: true, customAttribution });

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
		font-size: var(--ui-text-xs);
		background-color: col(bg, 500, 0.5) !important;
		backdrop-filter: blur(4px);
		padding: 2px 10px 3px 10px !important;
		border-radius: 99px !important;
	}

	.maplibregl-ctrl-attrib-button {
		display: none !important;
	}

	.maplibregl-ctrl-attrib-inner > * {
		color: col(fg, 100) !important;
		background: transparent;
	}
</style>
