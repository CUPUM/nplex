<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { DRAW_MODES } from '$utils/enums';
	import { getMapContext } from './Map.svelte';
	import { getMapDrawContext } from './MapDraw.svelte';

	const { getMap, cursor } = getMapContext();
	const { mode, getMapDraw, changeMode } = getMapDrawContext();

	$: active = false; // $mode === DRAW_MODES.DirectSelect
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() => changeMode(active ? DRAW_MODES.SimpleSelect : DRAW_MODES.DrawCircle)}
>
	<slot>
		<Icon name="path-line" />
	</slot>
</Button>

<style lang="scss">
</style>
