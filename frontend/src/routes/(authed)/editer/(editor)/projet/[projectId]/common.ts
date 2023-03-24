import { toPgRange } from '$utils/format';
import { avg, snap } from '$utils/number';
import { writable } from 'svelte/store';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { LayoutData } from './$types';

export const descriptors = writable<LayoutData['descriptors']>();
export const projectData = writable<LayoutData['project']>();

export const FORM_ID = 'project-editor-form';
export const TITLE_MIN_WORDS = 3;
export const TITLE_MAX_WORDS = 24;
export const DESCRIPTION_MAX_WORDS = 250;
export const COST_MIN = 0;
export const COST_MAX = 100_000;
export const COST_MAX_DELTA = 10_000;
export const COST_MAX_DELTA_R = 0.25;
export const COST_STEP = 50;

export function maxCostDelta(min: number, max: number) {
	return snap(avg(min, max) * COST_MAX_DELTA_R, COST_STEP, { origin: COST_MIN, round: Math.floor });
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
		if (min > max || max - min > maxCostDelta(min, max)) {
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
