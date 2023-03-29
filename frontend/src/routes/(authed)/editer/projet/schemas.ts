import type { FunctionReturn } from '$types/database/utils';
import { TEMPORALITY } from '$utils/enums';
import { toPgGeom, toPgRange } from '$utils/format';
import { avg, snap } from '$utils/number';
import { point } from '@turf/turf';
import { isCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { positionSchema, strictCoerceBooleanSchema } from '../../../../lib/utils/validation';
import type { LayoutData } from './[projectId]/$types';
import {
	ADJACENT_ALLEYS_MAX,
	ADJACENT_ALLEYS_MIN,
	ADJACENT_STREETS_MAX,
	ADJACENT_STREETS_MIN,
	BUILDING_MAX_HEIGHT,
	BUILDING_MIN_HEIGHT,
	BUILDING_YEAR_MAX,
	BUILDING_YEAR_MIN,
	COST_MAX_BIG,
	COST_MAX_DELTA_R,
	COST_MIN,
	COST_STEP,
	DESCRIPTION_MAX_WORDS,
	IMAGE_DESCRIPTION_MAX_LENGTH,
	IMAGE_TITLE_MAX_LENGTH,
	IMAGE_TYPES,
	LOCATION_MAX_RADIUS,
	TITLE_MAX_WORDS,
	TITLE_MIN_WORDS,
} from './constants';

//
// Validation helpers
//

export function maxCostDelta(min: number, max: number) {
	return snap(avg(min, max) * COST_MAX_DELTA_R, COST_STEP, { origin: COST_MIN, round: Math.floor });
}

export function getAvailableUsages(
	descriptors: FunctionReturn<'project_descriptors'>,
	categoryId: LayoutData['project']['usages'][number]['category'] | undefined
) {
	if (categoryId == null) {
		return [];
	} else return descriptors.siteUsages.filter((usage) => usage.category_ids.includes(categoryId));
}

export function isLocationCircle(
	feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
) {
	return isCircle(feature); //&& feature.properties && FEATURE_KEY in feature.properties;
}

//
// Validation schemas
//

export const projectTitleSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((title) => {
			const wordcount = title.split(' ').length;
			return wordcount >= TITLE_MIN_WORDS && wordcount <= TITLE_MAX_WORDS;
		}, `Le titre du projet doit être composé de ${TITLE_MIN_WORDS} à ${TITLE_MAX_WORDS} mots.`)
);

const projectDescriptionSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((desc) => {
			const wordcount = desc.split(' ').length;
			return wordcount <= DESCRIPTION_MAX_WORDS;
		}, `La description du projet peut pas dépasser ${DESCRIPTION_MAX_WORDS} mots.`)
		.optional()
);

const projectTypeSchema = zfd.numeric(z.number().optional());

const projectSiteOwnershipSchema = zfd.numeric(z.number().optional());

const projectCostRangeSchema = zfd
	.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()]))
	.superRefine(([min, max], ctx) => {
		if (min < COST_MIN || min > COST_MAX_BIG) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `La valeur minimum du projet ne respecte pas les limites.`,
			});
		}
		if (max < COST_MIN || max > COST_MAX_BIG) {
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

const projectInterventionsSchema = zfd
	.repeatableOfType(zfd.numeric())
	.transform((iid) => iid ?? []);

export const projectGeneralUpdateSchema = zfd
	.formData({
		title: projectTitleSchema,
		description: projectDescriptionSchema,
		type: projectTypeSchema,
		intervention: projectInterventionsSchema,
		cost_range: projectCostRangeSchema,
		site_ownership: projectSiteOwnershipSchema,
	})
	.transform(({ intervention, ...project }) => {
		return {
			project,
			intervention,
		};
	});

const projectAreaSchema = zfd.numeric(z.number().optional());

const projectAdjacentStreetsSchema = zfd.numeric(
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

const projectAdjacentAlleysSchema = zfd.numeric(
	z
		.number()
		.min(
			ADJACENT_ALLEYS_MIN,
			`Le site du projet ne peut pas être bordé par moins de ${ADJACENT_ALLEYS_MIN} ruelles ou voies alternatives.`
		)
		.max(
			ADJACENT_ALLEYS_MAX,
			`Le site du projet ne peut pas être bordé par plus de ${ADJACENT_ALLEYS_MAX} ruelles ou voies alternatives.`
		)
		.optional()
);

const projectLocationSchema = zfd
	.json(
		z.object({
			center: positionSchema.nullable(),
			radius: z.number().max(LOCATION_MAX_RADIUS).nullable(),
		})
	)
	.transform(({ center, radius }) => {
		return {
			center: center ? toPgGeom(point(center).geometry) : null,
			radius,
		};
	});

const projectImplantationModeSchema = zfd.numeric(z.number().optional());

const projectBuildingHeightSchema = zfd.numeric(
	z
		.number()
		.min(
			BUILDING_MIN_HEIGHT,
			`La hauteur du bâtiment du projet ne peut pas être en deçà de ${BUILDING_MIN_HEIGHT}m.`
		)
		.max(
			BUILDING_MAX_HEIGHT,
			`La hauteur du bâtiment du projet ne peut pas être au delà de ${BUILDING_MAX_HEIGHT}m.`
		)
		.optional()
);

const projectBuildingLevelsSchema = zfd.repeatableOfType(strictCoerceBooleanSchema);

const projectBuildingConstructionYearSchema = zfd.numeric(
	z.number().min(BUILDING_YEAR_MIN).max(BUILDING_YEAR_MAX).optional()
);

export const projectPlaceUpdateSchema = zfd
	.formData({
		location: projectLocationSchema,
		adjacent_streets: projectAdjacentStreetsSchema,
		adjacent_alleys: projectAdjacentAlleysSchema,
		site_area: projectAreaSchema,
		building_area: projectAreaSchema,
		interventions_area: projectAreaSchema,
		implantation_mode: projectImplantationModeSchema,
		building_height: projectBuildingHeightSchema,
		building_levels_mezzanine: projectBuildingLevelsSchema,
		building_levels_main: projectBuildingLevelsSchema,
		building_levels_basement: projectBuildingLevelsSchema,
		building_construction_year: projectBuildingConstructionYearSchema,
	})
	.transform(({ location, ...project }) => {
		return {
			location,
			project,
		};
	});
// enforce logical area containment.

export const projectImageUploadSchema = zfd.formData({
	image_files: zfd.repeatableOfType(
		zfd.file(
			z
				.instanceof(File)
				.refine((file) => IMAGE_TYPES.includes(file.type), `Format d'image incompatible.`)
		)
	),
});

const projectImageTitleSchema = zfd.text(
	z
		.string()
		.max(IMAGE_TITLE_MAX_LENGTH, "Le titre de l'image dépasse le nombre maximum de caractères.")
		.nullable()
		.default(null)
);

const projectImageDescriptionSchema = zfd.text(
	z
		.string()
		.max(
			IMAGE_DESCRIPTION_MAX_LENGTH,
			"La description de l'image dépasse le nombre maximum de caractères."
		)
		.nullable()
		.default(null)
);

const projectImageTemporalitySchema = z.enum([
	TEMPORALITY.Before,
	TEMPORALITY.During,
	TEMPORALITY.After,
]);

const projectImageTypeSchema = zfd.numeric(z.number());

export const projectGalleryUpdateSchema = zfd.formData({
	gallery: zfd.repeatableOfType(
		z.object({
			id: zfd.text(),
			storage_name: zfd.text(),
			title: projectImageTitleSchema,
			description: projectImageDescriptionSchema,
			temporality: projectImageTemporalitySchema,
			type: projectImageTypeSchema,
		})
	),
});

export const projectIndicatorsSchema = zfd.formData({
	indicator: zfd.repeatableOfType(zfd.numeric()),
});
