<!--
	@component
	## Map Control: Simple Select
-->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { MAP_DRAW_MODES } from '$utils/enums';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';

	const { getMap, cursor, getDraw, drawMode, drawChangeMode } = getMapContext();

	$: active = $drawMode === MAP_DRAW_MODES.SimpleSelect;
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() => drawChangeMode(MAP_DRAW_MODES.SimpleSelect)}
>
	<slot>
		<Icon name="pointer" />
	</slot>
</Button>

<style lang="scss">
</style>
