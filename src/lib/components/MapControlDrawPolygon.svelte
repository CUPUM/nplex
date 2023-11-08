<!--
	@component
	## Map Control: Draw Polygon
-->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { MAP_DRAW_MODES } from '$utils/enums';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';

	const { getMap, cursor, getDraw, drawMode, drawChangeMode } = getMapContext();

	$: active = $drawMode === MAP_DRAW_MODES.DrawPolygon;
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() =>
		drawChangeMode(active ? MAP_DRAW_MODES.SimpleSelect : MAP_DRAW_MODES.DrawPolygon)}
>
	<slot>
		<Icon name="path-polygon" />
	</slot>
</Button>

<style lang="scss">
</style>
