<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { MAP_DRAW_MODES } from '$utils/enums';
	import { getMapContext } from './Map.svelte';

	const { getMap, cursor, getDraw, drawMode, drawChangeMode } = getMapContext();

	export let disabled: boolean | undefined = undefined;

	$: active = false; // $mode === MAP_DRAW_MODES.DirectSelect
</script>

<Button
	equi={!$$slots.default}
	variant="ghost"
	{active}
	on:pointerdown={() =>
		drawChangeMode(active ? MAP_DRAW_MODES.SimpleSelect : MAP_DRAW_MODES.DrawCircle)}
>
	<slot>
		<Icon name="path-line" />
	</slot>
</Button>

<style lang="scss">
</style>
