import type { CITIES } from '$utils/enums';
import type { ValueOf } from 'ts-essentials';

/**
 * List of URLs to retrieve district data.
 */
export const CITY_DISTRICT_SOURCES = {
	montreal:
		'https://data.montreal.ca/dataset/9797a946-9da8-41ec-8815-f6b276dec7e9/resource/e18bfd07-edc8-4ce8-8a5a-3b617662a794/download/limites-administratives-agglomeration.geojson',
} as const satisfies Record<ValueOf<typeof CITIES>['param'], string>;

/**
 * Types to assert schema of data returned by the external APIs.
 */
export interface CityDistrictData {
	montreal: GeoJSON.FeatureCollection<
		GeoJSON.Geometry,
		{
			CODEID: number;
			NOM: string;
			NOM_OFFICIEL: string;
			CODEMAMH: string;
			CODE_3C: string;
			NUM: number;
			ABREV: string;
			TYPE: string;
			COMMENT?: string | null;
			DATEMODIF: string;
		}
	>;
}
