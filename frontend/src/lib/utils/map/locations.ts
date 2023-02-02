import type { LngLatBoundsLike, LngLatLike } from 'maplibre-gl';

/**
 * Reusable hard-coded geographic locations.
 */
export const LOCATIONS = {
	montreal: {
		bounds: [
			[-73.449, 45.396],
			[-73.959, 45.677],
		],
		center: [-73.65, 45.55],
	},
} satisfies Record<
	string,
	{
		bounds: LngLatBoundsLike;
		center: LngLatLike;
	}
>;
