<!--
	@component
	## Map Draw
	A functional (template-less) component to extend a map instance with drawing functionalities
	using Mapbox-gl-draw.
	
	To customize the style of drawn features, read: https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#styling-draw
	For general docs, see https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md

 -->
<script lang="ts" context="module">
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
</script>

<script lang="ts">
	import type {
		DrawActionableEvent,
		DrawCombineEvent,
		DrawCreateEvent,
		DrawDeleteEvent,
		DrawModeChangeEvent,
		DrawRenderEvent,
		DrawSelectionChangeEvent,
		DrawUncombineEvent,
		DrawUpdateEvent,
	} from '@mapbox/mapbox-gl-draw';
	import MapboxDraw from '@mapbox/mapbox-gl-draw';
	import * as MapboxDrawGeodesic from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let position: 'top-left' | 'top-right' | undefined = undefined;

	export const draw: MapboxDraw = new MapboxDraw({
		controls: {
			trash: false,
		},
		modes: MapboxDrawGeodesic.enable(MapboxDraw.modes),
		defaultMode: 'draw_circle',
	});

	const mapContext = getMapContext();
	const map = mapContext.getMap();
	const dispatch = createEventDispatcher<{
		create: DrawCreateEvent;
		delete: DrawDeleteEvent;
		combine: DrawCombineEvent;
		uncombine: DrawUncombineEvent;
		update: DrawUpdateEvent;
		selectionchange: DrawSelectionChangeEvent;
		modechange: DrawModeChangeEvent;
		render: DrawRenderEvent;
		actionable: DrawActionableEvent;
	}>();

	map?.addControl(draw as any, position);

	console.log(map?.getContainer());

	// To do: add reactive check to see if keybindings are enabled or not on the map.
	map?.getContainer().addEventListener('keydown', (e) => {
		if (e.key === 'Backspace' || e.key === 'Delete') {
			draw.trash();
		}
	});

	map?.on('draw.create', (e: DrawCreateEvent) => dispatch('create', e));
	map?.on('draw.delete', (e: DrawDeleteEvent) => dispatch('delete', e));
	map?.on('draw.combine', (e: DrawCombineEvent) => dispatch('combine', e));
	map?.on('draw.uncombine', (e: DrawUncombineEvent) => dispatch('uncombine', e));
	map?.on('draw.update', (e: DrawUpdateEvent) => dispatch('update', e));
	map?.on('draw.selectionchange', (e: DrawSelectionChangeEvent) => dispatch('selectionchange', e));
	map?.on('draw.modechange', (e: DrawModeChangeEvent) => dispatch('modechange', e));
	map?.on('draw.render', (e: DrawRenderEvent) => dispatch('render', e));
	map?.on('draw.actionable', (e: DrawActionableEvent) => dispatch('actionable', e));

	onDestroy(() => {
		// map?.off('draw.create', (e) => dispatch('create', e));
		// map?.removeControl(control);
		// Do some cleanup. See why removing control causes error.
	});
</script>

<!-- {#if name}
	<input type="hidden" {name} {id} />
{/if} -->
