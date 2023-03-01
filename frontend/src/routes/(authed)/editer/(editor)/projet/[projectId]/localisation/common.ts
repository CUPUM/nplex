import type Map from '$components/Map/Map.svelte';
import type MapDraw from '$components/Map/MapDraw.svelte';
import { toPgGeom } from '$utils/format';
import { positionSchema } from '$utils/validation';
import { point, type Position } from '@turf/turf';
import type { ComponentProps } from 'svelte';
import { writable } from 'svelte/store';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { PageData } from './$types';

export const LOCATION_DEFAULT_RADIUS = 500;
export const LOCATION_MAX_RADIUS = 2_500;
export const ADJACENT_STREETS_MIN = 0;
export const ADJACENT_STREETS_MAX = 5;

/**
 * Maplibre instance.
 */
export const map = writable<ComponentProps<Map>['map']>();

/**
 * Mapbox-gl draw instance, augmented with circle-mode.
 */
export const mapDraw = writable<ComponentProps<MapDraw>['draw']>();

/**
 * Shareable location circle radius.
 */
export const editRadius = writable<PageData['project']['location']['radius']>();

/**
 * Shareable location center position.
 */
export const editCenter = writable<Position>();

/**
 * Filter valid site usages based on usage category.
 */
export function getAvailableUsages(
	descriptors: App.Database['public']['Functions']['project_descriptors']['Returns'],
	categoryId: PageData['project']['usages'][number]['category_id'] | undefined
) {
	if (categoryId == null) {
		return [];
	} else return descriptors.siteUsages.filter((usage) => usage.category_ids.includes(categoryId));
}

export const locationSchema = zfd
	.json(
		z.object({
			center: positionSchema.optional(),
			radius: z.number().max(LOCATION_MAX_RADIUS).optional(),
		})
	)
	.transform(({ center, radius }) => {
		return {
			geometry: center ? toPgGeom(point(center).geometry) : null,
			radius,
		};
	});

export const adjacentStreetsSchema = zfd.numeric(
	z
		.number()
		.min(
			ADJACENT_STREETS_MIN,
			`Le site du projet ne peut pas être bordé par moins de ${ADJACENT_STREETS_MIN} rues.`
		)
		.max(
			ADJACENT_STREETS_MAX,
			`Le site du projet ne peut pas être bordé par plus de ${ADJACENT_STREETS_MAX} rues.`
		)
		.optional()
);
