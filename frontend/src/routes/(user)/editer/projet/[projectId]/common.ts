import type Map from '$components/Map/Map.svelte';
import type MapDraw from '$components/Map/MapDraw.svelte';
import { toPgGeom, toPgRange } from '$utils/format';
import { positionSchema } from '$utils/validation';
import { point } from '@turf/turf';
import type { ComponentProps } from 'svelte';
import { get, writable } from 'svelte/store';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { PageData } from './$types';

//
// Sharable two-way bound form values.
// Form values that do not need to be shared are located in respective components.
//
export const _type_id = writable<PageData['project']['type_id']>();
export const _banner_id = writable<PageData['project']['banner_id']>();
export const _location_radius = writable<PageData['project']['location']['radius']>();

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
export function getAvailableUsages(
	categoryId: PageData['project']['site_usage_category_id'] | undefined
) {
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
export const IMAGE_TITLE_MAX_LENGTH = 200;
export const IMAGE_DESCRIPTION_MAX_LENGTH = 500;
export const LOCATION_DEFAULT_RADIUS = 500;
export const LOCATION_MAX_RADIUS = 2_500;
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

export const typeIdSchema = zfd.numeric(z.number().optional());

export const costRangeSchema = zfd
	.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()]))
	.superRefine(([min, max], ctx) => {
		if (min < COST_MIN || min > COST_MAX) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `La valeur minimum du projet ne respecte pas les limites.`,
			});
		}
		if (max < COST_MIN || max > COST_MAX) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `La valeur maximum du projet ne respecte pas les limites.`,
			});
		}
		if (min > max) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `La différence entre la valeur minimum et la valeur maximum du projet n'est pas valide.`,
			});
		}
	})
	.transform((minmax) => toPgRange(minmax))
	.optional();

export const workIdsSchema = zfd
	.repeatableOfType(zfd.numeric())
	.transform((workids) => workids ?? []);

export const gallerySchema = zfd.repeatableOfType(
	z.object({
		id: zfd.text(),
		name: zfd.text(),
		title: zfd.text(
			z
				.string()
				.max(IMAGE_TITLE_MAX_LENGTH, "Le titre de l'image dépasse le nombre maximum de caractères.")
				.nullable()
				.default(null)
		),
		description: zfd.text(
			z
				.string()
				.max(
					IMAGE_DESCRIPTION_MAX_LENGTH,
					"La description de l'image dépasse le nombre maximum de caractères."
				)
				.nullable()
				.default(null)
		),
	})
);

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
