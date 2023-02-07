<!--
	@component
	## Map Fullscreen Control
	
-->
<script lang="ts">
	import { FullscreenControl } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';
	import { onDestroy } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Icon from '../Icon.svelte';
	import { getMapContext } from './Map.svelte';

	type $$Props = ComponentProps<Button>;

	let expanded = false;
	$: typedProps = $$props as $$Props;

	const { getMap, cursor } = getMapContext();
	const map = getMap();
	const container = map.getContainer().parentElement!;
	const fullscreen = new FullscreenControl({
		container,
	});

	if (map) {
		map.addControl(fullscreen);
	}

	async function handleClick() {
		if (map) {
			if (!expanded) container.requestFullscreen({ navigationUI: 'show' });
			else document.exitFullscreen();
		}
	}

	function update(e: Event) {
		if (e.target === container) {
			if (document.fullscreenElement === container) {
				expanded = true;
			} else {
				expanded = false;
			}
		}
	}

	onDestroy(() => {});
</script>

<svelte:window on:fullscreenchange={update} />
<Button
	class="button"
	variant="ghost"
	on:click={handleClick}
	equi={!$$slots.default || typedProps.equi}
	{...typedProps}
>
	<slot>
		<Icon name={expanded ? 'shrink-arrows' : 'expand-arrows'} />
	</slot>
</Button>

<style lang="scss" module>
	:global(.maplibregl-ctrl-fullscreen) {
		display: none !important;
	}
</style>
