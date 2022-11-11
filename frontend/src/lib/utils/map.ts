/**
 * Various utility and helpers related to Map Libre, the Map primitive component and its slotable children.
 */

import type { GestureOptions, LngLatBoundsLike, LngLatLike, Map } from 'maplibre-gl';
import type { createEventDispatcher } from 'svelte';

/**
 * Dictionnary of JSON styles for map baselayer.
 */
export const styles = {
	light: 'https://api.maptiler.com/maps/basic/style.json?key=dtV5LH1SmQB4VOb80qqI',
	toner: 'https://api.maptiler.com/maps/toner/style.json?key=dtV5LH1SmQB4VOb80qqI',
};

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
		const center = await getClientLocation({ enableHighAccuracy: true, maximumAge: 30000, timeout: 5000 });
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
