import type { LngLatBoundsLike, LngLatLike } from 'maplibre-gl';

/**
 * Reusable geographic locations.
 */
export const LOCATIONS = {
	montreal: {
		bounds: [
			[-73.959, 45.677],
			[-73.449, 45.396],
		],
		maxBounds: [
			[-74.333, 45.154],
			[-73.023, 45.992],
		],
		center: [-73.65, 45.55],
	},
} satisfies Record<
	string,
	{
		bounds: LngLatBoundsLike;
		maxBounds: LngLatBoundsLike;
		center: LngLatLike;
	}
>;
