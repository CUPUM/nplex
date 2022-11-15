import type { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';

/**
 * Styles shape guard.
 */
export type MapDrawStyles = (
	| ({
			id: 'gl-draw-polygon-fill-inactive';
			type: 'fill';
			filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']];
	  } & Pick<FillLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-fill-active';
			type: 'fill';
			filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']];
	  } & Pick<FillLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-midpoint';
			type: 'circle';
			filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-stroke-inactive';
			type: 'line';
			filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-stroke-active';
			type: 'line';
			filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-line-inactive';
			type: 'line';
			filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'LineString'], ['!=', 'mode', 'static']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-line-active';
			type: 'line';
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-and-line-vertex-stroke-inactive';
			type: 'circle';
			filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-and-line-vertex-inactive';
			type: 'circle';
			filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-point-point-stroke-inactive';
			type: 'circle';
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Point'],
				['==', 'meta', 'feature'],
				['!=', 'mode', 'static']
			];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-point-inactive';
			type: 'circle';
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Point'],
				['==', 'meta', 'feature'],
				['!=', 'mode', 'static']
			];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-point-stroke-active';
			type: 'circle';
			filter: ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-point-active';
			type: 'circle';
			filter: ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-fill-static';
			type: 'fill';
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']];
	  } & Pick<FillLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-polygon-stroke-static';
			type: 'line';
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-line-static';
			type: 'line';
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']];
	  } & Pick<LineLayerSpecification, 'layout' | 'paint'>)
	| ({
			id: 'gl-draw-point-static';
			type: 'circle';
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']];
	  } & Pick<CircleLayerSpecification, 'layout' | 'paint'>)
)[];
