<!--
	@component
	## Map Control: Draw Circle

-->
<script lang="ts">
	import { CURSOR } from '$utils/enums';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { getMapContext } from './Map.svelte';
	import { DRAW_EVENTS, DRAW_MODES, getMapDrawContext } from './MapDraw.svelte';

	export let initialRadius: number = 500;

	const { getMap, setCursor } = getMapContext();
	const { mode, getMapDraw } = getMapDrawContext();

	$: active = $mode === DRAW_MODES.DrawCircle;
	$: setCursor(active ? CURSOR.Crosshair : undefined);

	function setMode(e: PointerEvent & { target: EventTarget | null }) {
		if (getMapDraw()) {
			const newMode = active ? DRAW_MODES.SimpleSelect : DRAW_MODES.DrawCircle;
			getMapDraw()?.changeMode(newMode as any);
			getMap()?.fire(DRAW_EVENTS.modechange, { mode: newMode });
		}
	}
</script>

<Button equi={!$$slots.default} variant="ghost" {active} on:pointerdown={setMode}>
	<slot>
		<Icon name="pin" />
	</slot>
</Button>

<style lang="scss">
</style>
