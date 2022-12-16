<!--
	@component
	## Map Control: Draw Circle

-->
<script lang="ts" context="module">
	const MODE_KEY = 'draw_circle';
</script>

<script lang="ts">
	import { CURSOR } from '$utils/enums';
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { getMapContext } from './Map.svelte';
	import { getMapDrawContext } from './MapDraw.svelte';

	type $$Props = ComponentProps<Button>;

	const mapContext = getMapContext();
	const drawContext = getMapDrawContext();
	const map = mapContext?.getMap();
	const draw = drawContext?.getMapDraw();
	const currentMode = drawContext?.currentMode;

	$: typedProps = $$props as $$Props;
	$: active = draw && $currentMode === MODE_KEY;
	$: mapContext?.setCursor(active ? CURSOR.Crosshair : undefined);

	function setMode() {
		if (map && draw) {
			draw.changeMode(MODE_KEY);
			map.fire('draw.modechange', {
				mode: MODE_KEY,
			});
		}
	}
</script>

<Button
	equi={!$$slots.default || typedProps.equi}
	variant="ghost"
	{...typedProps}
	{active}
	on:click={setMode}
>
	<slot>
		<Icon name="pin" />
	</slot>
</Button>

<style lang="scss">
</style>
