/**
 * Exposing unexposed mapbox draw properties.
 */
declare global {
	namespace MapboxDraw {
		export interface DrawCustomModeThis {
			_ctx: {
				options: MapboxDraw.MapboxDrawOptions;
				store: {
					isDirty: boolean;
					sources: {
						[DRAW_SOURCES.Hot]: GeoJSON.Feature[];
						[DRAW_SOURCES.Cold]: GeoJSON.Feature[];
					};
					_changedFeatureIds: {
						_items: AnyRecord;
						_length: number;
						_nums: AnyRecord;
					};
					_featureIds: {
						_items: AnyRecord;
						_length: number;
						_nums: AnyRecord;
					};
				};
			};
		}
	}
}
