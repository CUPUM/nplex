import type { LngLatBoundsLike, LngLatLike, Map, StyleSpecification } from 'maplibre-gl';

export const montrealLocation: {
	bounds: LngLatBoundsLike;
	center: LngLatLike;
} = {
	bounds: [
		[-73.449, 45.396],
		[-73.959, 45.677],
	],
	center: [-73.65, 45.55],
};

/**
 * Dictionnary of JSON styles for map baselayer.
 */
export const mapStyles: Record<string, string | StyleSpecification> = {
	light: 'https://api.maptiler.com/maps/basic/style.json?key=dtV5LH1SmQB4VOb80qqI',
};

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
export async function centerMapOnClientLocation(map: Map) {
	try {
		const center = await getClientLocation({ enableHighAccuracy: true, maximumAge: 30000, timeout: 5000 });
		map.easeTo({ center, zoom: 15 });
	} catch {
		map.fitBounds(montrealLocation.bounds);
	}
}
