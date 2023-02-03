// import type MapboxDraw from '@mapbox/mapbox-gl-draw';
// import type { LngLatLike } from 'maplibre-gl';

// type Circle = {
// 	center: LngLatLike;
// 	radius: number;
// };

// type CirclesState = {
// 	circles: Circle[];
// };

// type DrawCircleOptions = {
// 	maxRadius?: number;
// 	minRadius?: number;
// 	radius: number;
// };

// export const DrawCircleMode

// const CircleMode = {...MapboxDraw.modes.draw_polygon};
// const DEFAULT_RADIUS_IN_KM = 2;

// CircleMode.onSetup = function(opts) {
//   const polygon = this.newFeature({
//     type: Constants.geojsonTypes.FEATURE,
//     properties: {
//       isCircle: true,
//       center: []
//     },
//     geometry: {
//       type: Constants.geojsonTypes.POLYGON,
//       coordinates: [[]]
//     }
//   });

//   this.addFeature(polygon);

//   this.clearSelectedFeatures();
//   doubleClickZoom.disable(this);
//   this.updateUIClasses({ mouse: Constants.cursors.ADD });
//   this.activateUIButton(Constants.types.POLYGON);
//   this.setActionableState({
//     trash: true
//   });

//   return {
//     initialRadiusInKm: opts.initialRadiusInKm || DEFAULT_RADIUS_IN_KM,
//     polygon,
//     currentVertexPosition: 0
//   };
// };

// CircleMode.clickAnywhere = function(state, e) {
//   if (state.currentVertexPosition === 0) {
//     state.currentVertexPosition++;
//     const center = [e.lngLat.lng, e.lngLat.lat];
//     const circleFeature = circle(center, state.initialRadiusInKm);
//     state.polygon.incomingCoords(circleFeature.geometry.coordinates);
//     state.polygon.properties.center = center;
//     state.polygon.properties.radiusInKm = state.initialRadiusInKm;
//   }
//   return this.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
// };
