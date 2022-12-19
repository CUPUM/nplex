import { CITIES, STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import { z, type ZodSchema } from 'zod';
import type { RequestHandler } from './$types';

interface DistrictDataSource {
	url: string;
	schema: ZodSchema;
}

interface NormalizedDistrictData {}

const MAX_AGE = 60 * 60 * 24;

/**
 * Urls to geojson data.
 */
const SOURCES = {
	MONTREAL: {
		url: 'https://data.montreal.ca/dataset/9797a946-9da8-41ec-8815-f6b276dec7e9/resource/e18bfd07-edc8-4ce8-8a5a-3b617662a794/download/limites-administratives-agglomeration.geojson',
		schema: z.object({
			type: z.string(),
			crs: z.object({
				type: z.string(),
				properties: z.object({
					name: z.string(),
				}),
			}),
			features: z.array(
				z.object({
					type: z.string(),
					properties: z.object({}),
					geometry: z.object({
						type: z.string(),
						coordinates: z.array(z.array(z.array(z.array(z.number())))),
					}),
				})
			),
		}),
	},
} as const satisfies Partial<Record<keyof typeof CITIES, DistrictDataSource>>;

export const GET: RequestHandler = async (event) => {
	console.log('Endpoint hit!', event.params);
	switch (event.params.city) {
		/**
		 * Montreal data.
		 */
		case CITIES.MONTREAL.param:
			return await event.fetch(SOURCES.MONTREAL.url, { method: 'GET' });
		// 	const sourceData = await event.fetch(SOURCES.MONTREAL.url, { method: 'GET' });
		// 	if (!sourceData.ok) {
		// 		throw error(
		// 			STATUS_CODES.InternalServerError,
		// 			'La requête au serveur de la Ville de Montréal a été faite sans succès.'
		// 		);
		// 	}
		// 	const parsed = SOURCES.MONTREAL.schema.safeParse(sourceData);
		// 	if (!parsed.success) {
		// 		throw error(STATUS_CODES.InternalServerError, {
		// 			...parsed.error,
		// 			message:
		// 				'Les données retournées par le serveur de la Ville de Montréal ne respectent pas le schéma attendu.',
		// 		});
		// 	}
		// 	event.setHeaders({
		// 		'cache-control': `public, max-age=${MAX_AGE}`,
		// 	});
		// 	return json(parsed.data);
		/**
		 * Invalid param (city not found);
		 */
		default:
			throw error(STATUS_CODES.BadRequest, 'Ville non trouvée.');
	}
};
