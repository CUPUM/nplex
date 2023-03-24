<!--
	@component
	## Map Control: Draw Circle
-->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { MAP_DRAW_MODES } from '$utils/enums';
	import { onMount } from 'svelte';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';

	// export let initialRadius: number = 500;
	// export let properties: AnyRecord | undefined = undefined;

	const { getMap, cursor, getMapDraw, drawMode, drawChangeMode } = getMapContext();
	// const { mode, getMapDraw, changeMode } = getMapDrawContext();

	onMount(() => {
		console.log(getMapDraw());
	});

	$: active = $drawMode === MAP_DRAW_MODES.DrawCircle;

	// function setProperties(e: DrawCreateEvent) {
	// 	if (!properties) return;
	// 	const mapDraw = getMapDraw();
	// 	const collection = mapDraw.getSelected();
	// 	if (!collection.features[0].id) return;
	// 	collection.features[0].properties = { ...properties, ...collection.features[0].properties };
	// 	mapDraw.set(collection);
	// 	// Object.keys(properties).forEach((k) => {
	// 	// 	mapDraw.setFeatureProperty(String(circle.id!), k, properties![k]);
	// 	// });
	// }

	// $: if (active) {
	// 	getMap().on(MAP_DRAW_EVENTS.Create, setProperties);
	// } else {
	// 	getMap().off(MAP_DRAW_EVENTS.Create, setProperties);
	// }
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() =>
		drawChangeMode &&
		drawChangeMode(active ? MAP_DRAW_MODES.SimpleSelect : MAP_DRAW_MODES.DrawCircle)}
>
	<slot>
		<Icon name="path-circle" />
	</slot>
</Button>

<style lang="scss">
</style>
