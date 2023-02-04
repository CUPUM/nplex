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

	export const DRAW_MODES = {
		DrawLineString: 'draw_line_string',
		DrawPolygon: 'draw_polygon',
		DrawPoint: 'draw_point',
		DirectSelect: 'direct_select',
		SimpleSelect: 'simple_select',
		DrawPoints: 'draw_points',
		// DrawCircle: 'draw_circle',
		// DragCircle: 'drag_circle',
	} as const;
	export type DrawMode = ValueOf<typeof DRAW_MODES>;

	const MODES = {
		...MapboxDraw.modes,
		draw_points: DrawPointsMode,
	} as const satisfies Record<DrawMode, MapboxDraw.DrawCustomMode>;

	interface MapDrawContext {
		getMapDraw: () => MapboxDraw;
		mode: Writable<DrawMode>;
		changeMode: (mode: DrawMode, opts?: any) => void;
	}

	export function getMapDrawContext() {
		return getContext<MapDrawContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { DRAW_EVENTS } from '$utils/enums';
	import { DRAW_STYLES } from '$utils/map';
	import { DrawPointsMode } from '$utils/map/modes/points';
	import type {
		DrawActionableEvent,
		DrawCombineEvent,
		DrawCreateEvent,
		DrawDeleteEvent,
		DrawRenderEvent,
		DrawSelectionChangeEvent,
		DrawUncombineEvent,
		DrawUpdateEvent,
	} from '@mapbox/mapbox-gl-draw';
	import MapboxDraw from '@mapbox/mapbox-gl-draw';
	import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
	// import * as MapboxGeodesic from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ValueOf } from 'ts-essentials';
	import { getMapContext } from './Map.svelte';

	/**
	 * Core instance of mapbox draw plugin extended with circle modes.
	 */
	export let draw: MapboxDraw | undefined = undefined;
	/**
	 * Initializes as the default mode and then is updated to reflect current mode.
	 */
	export let mode: DrawMode = 'draw_points';

	const { getMap } = getMapContext();
	const dispatch = createEventDispatcher();
	const defaultMode = mode;

	onMount(() => {
		if (browser) {
			const map = getMap();
			if (map) {
				const predraw = new MapboxDraw({
					styles: DRAW_STYLES,
					modes: MODES,
					defaultMode,
				});
				map.addControl(predraw as any);
				map.on(DRAW_EVENTS.ModeChange, (e: MapboxDraw.DrawModeChangeEvent) => {
					dispatch(DRAW_EVENTS.ModeChange, e);
					mode = e.mode as DrawMode;
				});
				map.on(DRAW_EVENTS.Create, (e: DrawCreateEvent) => {
					dispatch(DRAW_EVENTS.Create, e);
				});
				map.on(DRAW_EVENTS.Delete, (e: DrawDeleteEvent) => {
					dispatch(DRAW_EVENTS.Delete, e);
				});
				map.on(DRAW_EVENTS.Combine, (e: DrawCombineEvent) => {
					dispatch(DRAW_EVENTS.Combine, e);
				});
				map.on(DRAW_EVENTS.Uncombine, (e: DrawUncombineEvent) => {
					dispatch(DRAW_EVENTS.Uncombine, e);
				});
				map.on(DRAW_EVENTS.Update, (e: DrawUpdateEvent) => {
					dispatch(DRAW_EVENTS.Update, e);
				});
				map.on(DRAW_EVENTS.SelectionChange, (e: DrawSelectionChangeEvent) => {
					dispatch(DRAW_EVENTS.SelectionChange, e);
				});
				map.on(DRAW_EVENTS.Render, (e: DrawRenderEvent) => {
					dispatch(DRAW_EVENTS.Render, e);
				});
				map.on(DRAW_EVENTS.Actionable, (e: DrawActionableEvent) => {
					dispatch(DRAW_EVENTS.Actionable, e);
				});
				draw = predraw;
			}
		}
	});

	/**
	 * Helper to change the draw mode AND fire the corresponding event. By default, programmatic use
	 * of draw.changeMode doesn't fire the corresponding event:
	 * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md.
	 */
	function changeMode(mode: DrawMode, opts?: any) {
		console.log('changing mode!', mode);
		if (!mode || !draw) {
			return;
		}
		if (draw.getMode() == mode) {
			return;
		}
		draw.changeMode(mode as any, opts);
		getMap()?.fire(DRAW_EVENTS.ModeChange, {
			mode,
		});
	}

	// function handleKeydown(e: KeyboardEvent) {
	// 	const selected = draw?.getSelected();
	// 	if (e.key === KEY.Delete || e.key === KEY.Backspace) {
	// 		if (selected) {
	// 			draw?.trash();
	// 		}
	// 	}
	// }

	const _mode = writable<typeof mode>();
	$: mode = $_mode;
	$: if (mode) {
		_mode.set(mode);
		changeMode(mode);
	}

	setContext<MapDrawContext>(CTX_KEY, {
		getMapDraw: () => draw!,
		mode: _mode,
		changeMode,
	});

	onDestroy(() => {
		if (draw) {
			getMap()?.removeControl(draw as any);
			draw = undefined;
		}
	});
</script>

<!-- <svelte:window on:keydown={handleKeydown} /> -->

{#if draw}
	<slot />
{/if}
