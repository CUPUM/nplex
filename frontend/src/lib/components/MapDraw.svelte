<!--
	@component
	## Map Draw
	A functional (template-less) component to extend a map instance with drawing functionalities
	using Mapbox-gl-draw.
	
	To customize the style of drawn features, read: https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#styling-draw
	For general docs, see https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md

 -->
<script lang="ts" context="module">
	export enum MapDrawSourceId {
		Hot = 'mapbox-gl-draw-hot',
		Cold = 'mapbox-gl-draw-cold',
	}

	const CTX_KEY = 'map-draw-context';

	type MapDrawModeKey = keyof MapboxDraw.Modes | 'draw_circle';

	interface MapDrawContext {
		getMapDraw: () => MapboxDraw;
		currentMode: Readable<MapDrawModeKey>;
	}

	export function getMapDrawContext() {
		return getContext<MapDrawContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import type { MapDrawStyles } from '$types/map';
	import { MAP_DRAW_STYLES } from '$utils/map';

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
	import { createEventDispatcher, getContext, onDestroy, setContext } from 'svelte';
	import { writable, type Readable } from 'svelte/store';
	import { getMapContext } from './Map.svelte';

	export let modes: typeof MapboxDraw.modes = MapboxDraw.modes;
	export let styles: MapDrawStyles = MAP_DRAW_STYLES;

	export const draw: MapboxDraw = new MapboxDraw({
		displayControlsDefault: false,
		modes: MapboxDrawGeodesic.enable(modes),
		styles,
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
	const currentMode = writable<MapDrawModeKey>();

	if (map) {
		map.addControl(draw as any);
		map.on('draw.modechange', (e) => {
			currentMode.set(e.mode);
		});
	}

	setContext<MapDrawContext>(CTX_KEY, {
		getMapDraw: () => draw,
		currentMode: { subscribe: currentMode.subscribe },
	});

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

<slot><!-- optional fallback --></slot>
