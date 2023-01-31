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

	// const DRAW_MODE_PLUGINS = {
	// 	...MapboxDraw.modes,
	// 	draw_circle: CircleMode,
	// 	drag_circle: DragCircleMode,
	// 	direct_select: DirectMode,
	// 	simple_select: SimpleSelectMode,
	// } as const;

	// export const DRAW_MODES = {
	// 	DrawLineString: 'draw_line_string',
	// 	DrawPolygon: 'draw_polygon',
	// 	DrawPoint: 'draw_point',
	// 	Static: 'static',
	// 	DrawCircle: 'draw_circle',
	// 	DragCircle: 'drag_circle',
	// 	DirectSelect: 'direct_select',
	// 	SimpleSelect: 'simple_select',
	// } as const satisfies Record<string, keyof typeof DRAW_MODE_PLUGINS | 'static'>;
	// export type DrawMode = ValueOf<typeof DRAW_MODES>;

	export const DRAW_SOURCE_IDS = {
		Hot: 'mapbox-gl-draw-hot',
		Cold: 'mapbox-gl-draw-cold',
	} as const;
	export type DrawSourceId = ValueOf<typeof DRAW_SOURCE_IDS>;

	export const DRAW_MODES = {
		DrawLineString: 'draw_line_string',
		DrawPolygon: 'draw_polygon',
		DrawPoint: 'draw_point',
		Static: 'static',
		DrawCircle: 'draw_circle',
		// DragCircle: 'drag_circle',
		DirectSelect: 'direct_select',
		SimpleSelect: 'simple_select',
	} as const;
	export type DrawMode = ValueOf<typeof DRAW_MODES>;

	export const DRAW_EVENTS = {
		create: 'draw.create',
		delete: 'draw.delete',
		update: 'draw.update',
		render: 'draw.render',
		combine: 'draw.combine',
		uncombine: 'draw.uncombine',
		modechange: 'draw.modechange',
		actionable: 'draw.actionable',
		selectionchange: 'draw.selectionchange',
	} as const satisfies Record<string, MapboxDraw.DrawEventType>;

	interface MapDrawContext {
		getMapDraw: () => MapboxDraw;
		mode: Writable<DrawMode>;
		setMode: (mode: DrawMode, opts?: any) => void;
	}

	export function getMapDrawContext() {
		return getContext<MapDrawContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { KEY } from '$utils/enums';
	import { MAP_DRAW_STYLES } from '$utils/map';
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
	import * as MapboxGeodesic from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ValueOf } from 'ts-essentials';
	import { getMapContext } from './Map.svelte';

	const { getMap } = getMapContext();
	const dispatch = createEventDispatcher();

	/**
	 * Initializes as the default mode and then is updated to reflect current mode.
	 */
	export let mode: DrawMode = 'simple_select';
	const _mode = writable<typeof mode>();
	$: mode = $_mode;
	$: _mode.set(mode);

	/**
	 * Core instance of mapbox draw plugin extended with circle modes.
	 */
	export let draw: MapboxDraw | undefined;
	const predraw = new MapboxDraw({
		styles: MAP_DRAW_STYLES,
		displayControlsDefault: false,
		modes: MapboxGeodesic.enable(MapboxDraw.modes),
		defaultMode: mode,
	});

	onMount(() => {
		const map = getMap();
		if (map) {
			map.addControl(predraw as any);
			map.on(DRAW_EVENTS.modechange, (e: MapboxDraw.DrawModeChangeEvent) => {
				dispatch(DRAW_EVENTS.modechange, e);
				mode = e.mode as DrawMode;
			});
			map.on(DRAW_EVENTS.create, (e: DrawCreateEvent) => {
				dispatch(DRAW_EVENTS.create, e);
			});
			map.on(DRAW_EVENTS.delete, (e: DrawDeleteEvent) => {
				dispatch(DRAW_EVENTS.delete, e);
			});
			map.on(DRAW_EVENTS.combine, (e: DrawCombineEvent) => {
				dispatch(DRAW_EVENTS.combine, e);
			});
			map.on(DRAW_EVENTS.uncombine, (e: DrawUncombineEvent) => {
				dispatch(DRAW_EVENTS.uncombine, e);
			});
			map.on(DRAW_EVENTS.update, (e: DrawUpdateEvent) => {
				dispatch(DRAW_EVENTS.update, e);
			});
			map.on(DRAW_EVENTS.selectionchange, (e: DrawSelectionChangeEvent) => {
				dispatch(DRAW_EVENTS.selectionchange, e);
			});
			map.on(DRAW_EVENTS.render, (e: DrawRenderEvent) => {
				dispatch(DRAW_EVENTS.render, e);
			});
			map.on(DRAW_EVENTS.actionable, (e: DrawActionableEvent) => {
				dispatch(DRAW_EVENTS.actionable, e);
			});
			draw = predraw;
		}
	});

	/**
	 * Helper to change the draw mode AND fire the corresponding event. By default, programmatic use
	 * of draw.changeMode doesn't fire the corresponding event:
	 * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md.
	 */
	function setMode(mode: DrawMode, opts?: any) {
		if (draw?.getMode() !== mode) {
			draw?.changeMode(mode as any, opts);
			getMap()?.fire(DRAW_EVENTS.modechange, {
				mode,
			});
		}
	}

	$: if (draw && mode) {
		setMode(mode);
	}

	function handleKeydown(e: KeyboardEvent) {
		const selected = draw?.getSelected();
		if (e.key === KEY.Delete || e.key === KEY.Backspace) {
			if (selected) {
				draw?.trash();
			}
		}
	}

	setContext<MapDrawContext>(CTX_KEY, {
		getMapDraw: () => draw!,
		mode: _mode,
		setMode,
	});

	onDestroy(() => {
		if (draw) {
			getMap()?.removeControl(draw as any);
			draw = undefined;
		}
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if draw}
	<slot />
{/if}
