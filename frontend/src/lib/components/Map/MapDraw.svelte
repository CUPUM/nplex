<!--
	@component
	## Map Draw
	A functional (template-less) component to extend a map instance with drawing functionalities
	using mapbox-gl-draw and maplibre-gl-draw-circle (fork of the seemingly abandonned mapbox-gl-draw-circle).
	
	To customize the style of drawn features, read: https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#styling-draw
	For general docs, see https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md

 -->
<script lang="ts" context="module">
	const CTX_KEY = 'map-draw-context';

	const MODES: Record<MapDrawMode, MapboxDraw.DrawCustomMode> = MapboxGeodesic.enable({
		...MapboxDraw.modes,
	});

	declare global {
		namespace MapboxDraw {
			interface DrawInitEvent {
				type: (typeof MAP_DRAW_EVENTS)['Init'];
				draw: MapboxDraw;
				// changeMode: (mode: MapDrawMode, opts?: any) => void;
			}
			interface DrawDestroyEvent {
				type: (typeof MAP_DRAW_EVENTS)['Destroy'];
			}
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { KEY, MAP_DRAW_EVENTS, MAP_DRAW_MODES, type MapDrawMode } from '$utils/enums';
	import { DRAW_STYLES } from '$utils/map/draw/styles';
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
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
	import * as MapboxGeodesic from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';

	/**
	 * Core instance of mapbox draw plugin extended with circle modes.
	 */
	export let draw: MapboxDraw | undefined = undefined;
	/**
	 * Initializes as the default mode and then is updated to reflect current mode.
	 */
	export let mode: MapDrawMode = MAP_DRAW_MODES.SimpleSelect;
	export let styles: object[] = DRAW_STYLES;

	const { getMap } = getMapContext();
	const dispatch = createEventDispatcher();
	const defaultMode = mode;

	onMount(() => {
		if (browser) {
			const map = getMap();
			if (map) {
				const predraw = new MapboxDraw({
					styles,
					modes: MODES,
					displayControlsDefault: false,
					defaultMode,
					userProperties: true,
				});
				map.addControl(predraw as any);
				map.on(MAP_DRAW_EVENTS.ModeChange, (e: DrawModeChangeEvent) => {
					dispatch(MAP_DRAW_EVENTS.ModeChange, e);
					mode = e.mode as MapDrawMode;
				});
				map.on(MAP_DRAW_EVENTS.Create, (e: DrawCreateEvent) => {
					dispatch(MAP_DRAW_EVENTS.Create, e);
				});
				map.on(MAP_DRAW_EVENTS.Delete, (e: DrawDeleteEvent) => {
					dispatch(MAP_DRAW_EVENTS.Delete, e);
				});
				map.on(MAP_DRAW_EVENTS.Combine, (e: DrawCombineEvent) => {
					dispatch(MAP_DRAW_EVENTS.Combine, e);
				});
				map.on(MAP_DRAW_EVENTS.Uncombine, (e: DrawUncombineEvent) => {
					dispatch(MAP_DRAW_EVENTS.Uncombine, e);
				});
				map.on(MAP_DRAW_EVENTS.Update, (e: DrawUpdateEvent) => {
					dispatch(MAP_DRAW_EVENTS.Update, e);
				});
				map.on(MAP_DRAW_EVENTS.SelectionChange, (e: DrawSelectionChangeEvent) => {
					dispatch(MAP_DRAW_EVENTS.SelectionChange, e);
				});
				map.on(MAP_DRAW_EVENTS.Render, (e: DrawRenderEvent) => {
					dispatch(MAP_DRAW_EVENTS.Render, e);
				});
				map.on(MAP_DRAW_EVENTS.Actionable, (e: DrawActionableEvent) => {
					dispatch(MAP_DRAW_EVENTS.Actionable, e);
				});
				draw = predraw;
				map.fire(MAP_DRAW_EVENTS.Init, {
					type: MAP_DRAW_EVENTS.Init,
					draw,
				} satisfies MapboxDraw.DrawInitEvent);
			}
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (draw) {
			const selected = draw.getSelected();
			// console.log(draw.getAll());
			if (e.key === KEY.Delete || e.key === KEY.Backspace) {
				if (selected) {
					draw.trash();
				}
			}
		}
	}

	onDestroy(() => {
		const map = getMap();
		if (map) {
			if (draw) {
				map.removeControl(draw as any);
			}
			map.fire(MAP_DRAW_EVENTS.Destroy, {
				type: MAP_DRAW_EVENTS.Destroy,
			} satisfies MapboxDraw.DrawDestroyEvent);
		}
		draw = undefined;
	});
</script>

<svelte:window on:keydown={handleKeydown} />
