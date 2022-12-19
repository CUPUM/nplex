import type { MapDrawStyles } from '$types/map';
import type { GestureOptions, LngLatBoundsLike, LngLatLike, Map } from 'maplibre-gl';
import type { createEventDispatcher } from 'svelte';
import { THEMES } from './themes';

/**
 * Dictionnary of JSON styles for map baselayer.
 */
export const MAP_STYLES = {
	LIGHT: 'https://api.maptiler.com/maps/basic/style.json?key=dtV5LH1SmQB4VOb80qqI',
	TONER: 'https://api.maptiler.com/maps/toner/style.json?key=dtV5LH1SmQB4VOb80qqI',
} as const;

/**
 * Default Draw styles, taken from:
 * https://github.com/mapbox/mapbox-gl-draw/blob/main/src/lib/theme.js.
 */
export const MAP_DRAW_STYLES: MapDrawStyles = [
	{
		id: 'gl-draw-polygon-fill-inactive',
		type: 'fill',
		filter: [
			'all',
			['==', 'active', 'false'],
			['==', '$type', 'Polygon'],
			['!=', 'mode', 'static'],
		],
		paint: {
			'fill-color': THEMES.LIGHT.primary[700],
			'fill-outline-color': THEMES.LIGHT.primary[700],
			'fill-opacity': 0.1,
		},
	},
	{
		id: 'gl-draw-polygon-fill-active',
		type: 'fill',
		filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
		paint: {
			'fill-color': [
				'case',
				['boolean', ['feature-state', 'error'], false],
				THEMES.LIGHT.error[500],
				THEMES.LIGHT.primary[500],
			],
			'fill-outline-color': [
				'case',
				['boolean', ['feature-state', 'error'], false],
				THEMES.LIGHT.error[500],
				THEMES.LIGHT.primary[500],
			],
			'fill-opacity': 0.1,
		},
	},
	{
		id: 'gl-draw-polygon-midpoint',
		type: 'circle',
		filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
		paint: {
			'circle-radius': 3,
			'circle-color': THEMES.LIGHT.primary[500],
		},
	},
	{
		id: 'gl-draw-polygon-stroke-inactive',
		type: 'line',
		filter: [
			'all',
			['==', 'active', 'false'],
			['==', '$type', 'Polygon'],
			['!=', 'mode', 'static'],
		],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': THEMES.LIGHT.primary[700],
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-polygon-stroke-active',
		type: 'line',
		filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': THEMES.LIGHT.primary[500],
			'line-dasharray': [0.2, 2],
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-line-inactive',
		type: 'line',
		filter: [
			'all',
			['==', 'active', 'false'],
			['==', '$type', 'LineString'],
			['!=', 'mode', 'static'],
		],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': THEMES.LIGHT.primary[700],
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-line-active',
		type: 'line',
		filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': THEMES.LIGHT.primary[500],
			'line-dasharray': [0.2, 2],
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
		type: 'circle',
		filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
		paint: {
			'circle-radius': 5,
			'circle-color': '#fff',
		},
	},
	{
		id: 'gl-draw-polygon-and-line-vertex-inactive',
		type: 'circle',
		filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
		paint: {
			'circle-radius': 3,
			'circle-color': THEMES.LIGHT.primary[500],
		},
	},
	{
		id: 'gl-draw-point-point-stroke-inactive',
		type: 'circle',
		filter: [
			'all',
			['==', 'active', 'false'],
			['==', '$type', 'Point'],
			['==', 'meta', 'feature'],
			['!=', 'mode', 'static'],
		],
		paint: {
			'circle-radius': 5,
			'circle-opacity': 1,
			'circle-color': '#fff',
		},
	},
	{
		id: 'gl-draw-point-inactive',
		type: 'circle',
		filter: [
			'all',
			['==', 'active', 'false'],
			['==', '$type', 'Point'],
			['==', 'meta', 'feature'],
			['!=', 'mode', 'static'],
		],
		paint: {
			'circle-radius': 3,
			'circle-color': THEMES.LIGHT.primary[700],
		},
	},
	{
		id: 'gl-draw-point-stroke-active',
		type: 'circle',
		filter: ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']],
		paint: {
			'circle-radius': 7,
			'circle-color': '#fff',
		},
	},
	{
		id: 'gl-draw-point-active',
		type: 'circle',
		filter: ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']],
		paint: {
			'circle-radius': 5,
			'circle-color': THEMES.LIGHT.primary[500],
		},
	},
	{
		id: 'gl-draw-polygon-fill-static',
		type: 'fill',
		filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
		paint: {
			'fill-color': '#404040',
			'fill-outline-color': '#404040',
			'fill-opacity': 0.1,
		},
	},
	{
		id: 'gl-draw-polygon-stroke-static',
		type: 'line',
		filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': '#404040',
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-line-static',
		type: 'line',
		filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': '#404040',
			'line-width': 2,
		},
	},
	{
		id: 'gl-draw-point-static',
		type: 'circle',
		filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
		paint: {
			'circle-radius': 5,
			'circle-color': '#404040',
		},
	},
];

/**
 * Include default values for omited styles.
 */
export function extendDefaultDrawStyles(styles: MapDrawStyles) {
	const o = Object.fromEntries(MAP_DRAW_STYLES.map((s) => [s.id, s]));
	for (const s of styles) {
		o[s.id] = s;
	}
	return Object.values(o);
}

/**
 * Creates styles definition without requiring specification of constant props (filters, layer
 * type).
 */
export function createDrawStyles(
	styles: Pick<MapDrawStyles[number], 'id' | 'layout' | 'paint'>[],
	extend: boolean = true
) {
	let filled = styles
		.map((s) => {
			const base = MAP_DRAW_STYLES.find((d) => d.id === s.id);
			if (!base) return false;
			return {
				...base,
				...s,
			};
		})
		.filter((s) => s) as MapDrawStyles;
	if (extend) filled = extendDefaultDrawStyles(filled);
	return filled;
}

/**
 * Forward map events using a svelte event dispatcher.
 */
export function forwardEvents(
	map: Map,
	eventDispatcher: ReturnType<typeof createEventDispatcher<any>>,
	...eventNames: string[]
) {
	const forwards: [string, (e: any) => any][] = [];
	for (const name of eventNames) {
		function dispatch(e: any) {
			eventDispatcher(name, e);
		}
		forwards.push([name, dispatch]);
		map?.on(name, dispatch);
	}
	return () => {
		for (const [name, dispatch] of forwards) {
			map?.off(name, dispatch);
		}
	};
}

export function metersToPx(meters: number, latitude: number) {
	// return meters;...
}

/**
 * Helper function to get the client's long lat location. Defaults to city's center.
 */
export async function getClientLocation(options?: PositionOptions) {
	return new Promise<LngLatLike>((res, rej) => {
		if (navigator && navigator.geolocation) {
			return navigator.geolocation.getCurrentPosition(
				(pos) => res([pos.coords.longitude, pos.coords.latitude]),
				rej,
				options
			);
		}
		rej();
	});
}

/**
 * Center the passed map around the client's location, defaulting to fiting the city's bounds.
 */
export async function centerMapOnClientLocation(
	map: Map,
	fallback: LngLatBoundsLike | LngLatLike = locations.montreal.bounds
) {
	try {
		const center = await getClientLocation({
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 5000,
		});
		map.easeTo({ center, zoom: 15 });
	} catch {
		if ('lat' in fallback || (Array.isArray(fallback) && fallback.flat().length === 2)) {
			map.flyTo({
				center: fallback as LngLatLike,
			});
		} else {
			map.fitBounds(fallback as LngLatBoundsLike);
		}
	}
}

/**
 * Partial french locale.
 */

export type MapLocale = Partial<{
	'AttributionControl.ToggleAttribution': string;
	'AttributionControl.MapFeedback': string;
	'FullscreenControl.Enter': string;
	'FullscreenControl.Exit': string;
	'GeolocateControl.FindMyLocation': string;
	'GeolocateControl.LocationNotAvailable': string;
	'LogoControl.Title': string;
	'Map.Title': string;
	'NavigationControl.ResetBearing': string;
	'NavigationControl.ZoomIn': string;
	'NavigationControl.ZoomOut': string;
	'TouchPanBlocker.Message': string;
	'ScrollZoomBlocker.CtrlMessage': string;
	'ScrollZoomBlocker.CmdMessage': string;
}>;

const frenchLocale: MapLocale = {
	'ScrollZoomBlocker.CtrlMessage': 'Utilisez ctrl + ↕ pour zoomer',
	'ScrollZoomBlocker.CmdMessage': 'Utilisez ⌘ + ↕ pour zoomer',
};

export const locales = {
	french: frenchLocale,
};

/**
 * French help text for cooperative gestures.
 */

const frenchGestures: GestureOptions = {
	windowsHelpText: 'Utilisez Ctrl + ⭥ pour zoomer la carte',
	macHelpText: 'Utilisez&ensp;⌘ + ⭥&ensp;pour zoomer la carte',
	mobileHelpText: 'Utilisez deux doigts pour déplacer la carte',
};
export const gesturesText = {
	french: frenchGestures,
};

/**
 * Reusable hard-coded location presets.
 */

const montreal: {
	bounds: LngLatBoundsLike;
	center: LngLatLike;
} = {
	bounds: [
		[-73.449, 45.396],
		[-73.959, 45.677],
	],
	center: [-73.65, 45.55],
};

export const locations = {
	montreal,
};
