<!--
	@component
	## Map Control: Draw Circle
-->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { DRAW_MODES } from '$utils/enums';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';
	import { getMapDrawContext } from './MapDraw.svelte';

	export let initialRadius: number = 500;

	const { getMap, cursor } = getMapContext();
	const { mode, getMapDraw, changeMode } = getMapDrawContext();

	$: active = $mode === DRAW_MODES.DrawCircle;
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() => changeMode(active ? DRAW_MODES.SimpleSelect : DRAW_MODES.DrawCircle)}
>
	<slot>
		<Icon name="path-circle" />
	</slot>
</Button>

<style lang="scss">
</style>
