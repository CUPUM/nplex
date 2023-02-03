<!--
	@component
	## Map Control: Draw Circle

-->
<script lang="ts">
	import { CURSOR } from '$utils/enums';
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';
	import { DRAW_MODES, getMapDrawContext } from './MapDraw.svelte';

	export let initialRadius: number = 500;

	const { getMap, cursor } = getMapContext();
	const { mode, getMapDraw, setMode } = getMapDrawContext();

	$: active = $mode === DRAW_MODES.DrawCircle;
	$: cursor.set(active ? CURSOR.Crosshair : null);
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() => setMode(active ? DRAW_MODES.SimpleSelect : DRAW_MODES.DrawCircle)}
>
	<slot>
		<Icon name="pin" />
	</slot>
</Button>

<style lang="scss">
</style>
