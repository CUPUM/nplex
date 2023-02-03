// Until a better typing solution is available for the following type-less packages,
// we here provide empty declarations to silence typescript.

declare module 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic' {
	function createCircle(
		/**
		 * Coordinates in Lon/Lat.
		 */
		center: GeoJSON.Position,
		/**
		 * Radius in kilometers.
		 */
		radius: number,
		properties?: Record<string, any>
	): GeoJSON.Feature;
	function isCircle(geojson: GeoJSON.Feature): any;
	function getCircleCenter(geojson: GeoJSON.Feature): any;
	function setCircleCenter(
		geojson: GeoJSON.Feature,
		/**
		 * Center in Lon/Lat.
		 */
		center: GeoJSON.Position
	): any;
	function getCircleRadius(geojson: GeoJSON.Feature): any;
	function setCircleRadius(
		geojson: GeoJSON.Feature,
		/**
		 * Radius in kilometers.
		 */
		radius: number
	): any;

	export function enable<M extends Record<string, MapboxDraw.DrawCustomMode>>(
		modes: M
	): Record<string, any>;
}

declare module 'maplibre-gl-draw-circle';
