<!--@component
	Simple button-wrapper component to add geolocation control to the parent map.
	For implementation inspo, see maplibre/mapbox control workflow: https://maplibre.org/maplibre-gl-js-docs/api/markers/
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { icons } from '$utils/icons/icons';

	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import Button from './Button.svelte';
	import type { MapContext } from './Map.svelte';

	export let icon: keyof typeof icons = 'localize';

	const mapCtx = getContext<MapContext>(Ctx.Map);
	const map = mapCtx.getMap();

	// Add default handlers here for simplified reusability.
</script>

<Button {icon} square={!$$slots.default}>
	<!-- <slot /> -->
</Button>

<style lang="scss">
</style>
