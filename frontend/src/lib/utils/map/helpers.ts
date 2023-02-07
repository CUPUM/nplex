import type { LngLatBoundsLike, LngLatLike, Map } from 'maplibre-gl';
import type { createEventDispatcher } from 'svelte';
import { LOCATIONS } from './locations';

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
	fallback: LngLatBoundsLike | LngLatLike = LOCATIONS.montreal.bounds
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
