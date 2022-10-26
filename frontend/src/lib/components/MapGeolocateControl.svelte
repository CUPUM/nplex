<!--@component
	Simple button-wrapper component to add geolocation control to the parent map.
	For implementation inspo, see maplibre/mapbox control workflow: https://maplibre.org/maplibre-gl-js-docs/api/markers/
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { icons } from '$utils/icons/icons';
	import { Ctx } from '$utils/keys';
	import { centerMapOnClientLocation } from '$utils/maps/map';
	import { getContext } from 'svelte';
	import Button from './Button/Button.svelte';
	import Icon from './Icon/Icon.svelte';
	import type { MapContext } from './Map.svelte';

	export let icon: keyof typeof icons = 'localize';
	export let iconSize: string | number = '1.25em';

	const mapCtx = getContext<MapContext>(Ctx.Map);
	const map = mapCtx.getMap();

	function locate() {}
</script>

<Button square variant="ghost" on:click={() => centerMapOnClientLocation(map)}>
	<Icon name={icon} />
</Button>

<style lang="scss">
</style>
