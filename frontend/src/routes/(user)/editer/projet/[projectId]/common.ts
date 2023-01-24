import type Map from '$components/Map.svelte';
import type MapDraw from '$components/MapDraw.svelte';
import { pgarr } from '$utils/format';
import type { ComponentProps } from 'svelte';
import { get, writable } from 'svelte/store';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { PageData } from './$types';

//
// Sharable two-way bound form values.
//
export const _type_id = writable<PageData['project']['type_id']>();
export const _banner_id = writable<PageData['project']['banner_id']>();

/**
 * Page-wide copy of data.descriptors.
 */
export const descriptors = writable<PageData['descriptors']>();

/**
 * Map of dirty fields, managed by each formgroup component.
 */
export const dirty = writable<Record<string, boolean>>({});

/**
 * Maplibre instance.
 */
export const map = writable<ComponentProps<Map>['map']>();

/**
 * Mapbox-gl draw instance, augmented with circle-mode.
 */
export const mapdraw = writable<ComponentProps<MapDraw>['draw']>();

/**
 * Filter valid site usages based on usage category.
 */
export function getAvailableUsages(categoryId: PageData['project']['site_usage_category_id']) {
	if (categoryId == null) {
		return [];
	} else
		return get(descriptors).siteUsages.filter((usage) => usage.category_ids.includes(categoryId));
}

export const TITLE_MIN_WORDS = 3;
export const TITLE_MAX_WORDS = 24;
export const DESCRIPTION_MAX_WORDS = 250;
export const COST_MIN = 0;
export const COST_MAX = 50_000;
export const COST_MAX_DELTA = 1_000;
export const COST_STEP = 10;
export const IMAGE_MAX_SIZE = 5e6;
export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const IMAGE_MAX_RESOLUTION = 1_600;
export const IMAGE_GALLERY_FOLDER = 'gallery';
export const LOCATION_DEFAULT_RADIUS = 500;
export const LOCATION_MAX_RADIUS = 1_500;
export const ADJACENT_STREETS_MIN = 0;
export const ADJACENT_STREETS_MAX = 5;

export const titleSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((title) => {
			const wordcount = title.split(' ').length;
			return wordcount >= TITLE_MIN_WORDS && wordcount <= TITLE_MAX_WORDS;
		}, `Le titre du projet doit être composé de ${TITLE_MIN_WORDS} à ${TITLE_MAX_WORDS} mots.`)
);

export const descriptionSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((desc) => {
			const wordcount = desc.split(' ').length;
			return wordcount <= DESCRIPTION_MAX_WORDS;
		}, `La description du projet peut pas dépasser ${DESCRIPTION_MAX_WORDS} mots.`)
		.optional()
);

export const costRangeSchema = zfd
	.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()]))
	.refine(
		([min, max]) => min >= COST_MIN && min <= COST_MAX,
		`La valeur minimum du projet ne respecte pas les limites.`
	)
	.refine(
		([min, max]) => max >= COST_MIN && max <= COST_MAX,
		`La valeur maximum du projet ne respecte pas les limites.`
	)
	.refine(
		([min, max]) => min <= max,
		`La différence entre la valeur minimum et la valeur maximum du projet n'est pas valide.`
	)
	.transform((minmax) => pgarr(minmax) as `[${number},${number}]`)
	.optional();

export const workIdsSchema = zfd
	.repeatableOfType(zfd.numeric())
	.transform((workids) => workids ?? []);

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
);
