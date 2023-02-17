import { toPgRange } from '$utils/format';
import { writable } from 'svelte/store';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { LayoutData, PageData } from './$types';

export const FORM_ID = 'project-editor-form';
export const TITLE_MIN_WORDS = 3;
export const TITLE_MAX_WORDS = 24;
export const DESCRIPTION_MAX_WORDS = 250;
export const COST_MIN = 0;
export const COST_MAX = 50_000;
export const COST_MAX_DELTA = 10_000;
export const COST_STEP = 10;

export const project = writable<LayoutData['project']>();
export const descriptors = writable<LayoutData['descriptors']>();

export const form_type_id = writable<PageData['project']['type_id']>();
export const form_banner_id = writable<PageData['project']['banner_id']>();

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
		if (min > max || max - min > COST_MAX_DELTA) {
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
