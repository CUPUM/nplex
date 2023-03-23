<!--
	@component
	## Map Control: Draw Polygon
-->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { DRAW_MODES } from '$utils/enums';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';
	import { getMapDrawContext } from './MapDraw.svelte';

	// export let initialRadius: number = 500;
	// export let properties: AnyRecord | undefined = undefined;

	const { getMap, cursor } = getMapContext();
	const { mode, getMapDraw, changeMode } = getMapDrawContext();

	$: active = $mode === DRAW_MODES.DrawPolygon;

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
	// 	getMap().on(DRAW_EVENTS.Create, setProperties);
	// } else {
	// 	getMap().off(DRAW_EVENTS.Create, setProperties);
	// }
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() => changeMode(active ? DRAW_MODES.SimpleSelect : DRAW_MODES.DrawPolygon)}
>
	<slot>
		<Icon name="path-polygon" />
	</slot>
</Button>

<style lang="scss">
</style>
