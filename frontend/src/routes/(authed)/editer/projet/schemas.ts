import { TEMPORALITY } from '$utils/enums';
import { toPgGeom, toPgRange } from '$utils/format';
import { avg, snap } from '$utils/number';
import { point } from '@turf/turf';
import { isCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { positionSchema, strictCoerceBooleanSchema } from '../../../../lib/utils/validation';
import {
	PROJECT_ADJACENT_ALLEYS_MAX,
	PROJECT_ADJACENT_ALLEYS_MIN,
	PROJECT_ADJACENT_STREETS_MAX,
	PROJECT_ADJACENT_STREETS_MIN,
	PROJECT_BUILDING_MAX_HEIGHT,
	PROJECT_BUILDING_MIN_HEIGHT,
	PROJECT_BUILDING_YEAR_MAX,
	PROJECT_BUILDING_YEAR_MIN,
	PROJECT_COST_MAX_BIG,
	PROJECT_COST_MAX_DELTA_R,
	PROJECT_COST_MIN,
	PROJECT_COST_STEP,
	PROJECT_DESCRIPTION_MAX_WORDS,
	PROJECT_IMAGE_DESCRIPTION_MAX,
	PROJECT_IMAGE_TITLE_MAX,
	PROJECT_IMAGE_TYPES,
	PROJECT_LOCATION_MAX_RADIUS,
	PROJECT_SUMMARY_MAX_WORDS,
	PROJECT_TITLE_MAX_WORDS,
	PROJECT_TITLE_MIN_WORDS,
} from './constants';

//
// Validation helpers
//

export function maxCostDelta(min: number, max: number) {
	return snap(avg(min, max) * PROJECT_COST_MAX_DELTA_R, PROJECT_COST_STEP, {
		origin: PROJECT_COST_MIN,
		round: Math.floor,
	});
}

// export function getAvailableUsages(
// 	descriptors: FunctionReturn<'project_descriptors'>,
// 	usages: LayoutData['project']['usages'] | undefined
// ) {
// 	if (usages == null ||!usages.length) {
// 		return [];
// 	} else {
// 		return descriptors.siteUsages.filter((usage) => usage.categories.includes(categoryId));
// 	}
// }

export function isLocationCircle(
	feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
) {
	return isCircle(feature); //&& feature.properties && FEATURE_KEY in feature.properties;
}

//
// Validation schemas
//

const projectTitleSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((title) => {
			const wordcount = title.split(' ').length;
			return wordcount >= PROJECT_TITLE_MIN_WORDS && wordcount <= PROJECT_TITLE_MAX_WORDS;
		}, `Le titre du projet doit être composé de ${PROJECT_TITLE_MIN_WORDS} à ${PROJECT_TITLE_MAX_WORDS} mots.`)
);

export const projectCreateSchema = zfd.formData({
	title: projectTitleSchema,
});

const projectDescriptionSchema = zfd.text(
	z
		.string()
		.trim()
		.refine((desc) => {
			const wordcount = desc.split(' ').length;
			return wordcount <= PROJECT_DESCRIPTION_MAX_WORDS;
		}, `La description du projet peut pas dépasser ${PROJECT_DESCRIPTION_MAX_WORDS} mots.`)
		.optional()
);

const projectSummarySchema = zfd.text(
	z
		.string()
		.trim()
		.refine((desc) => {
			const wordcount = desc.split(' ').length;
			return wordcount <= PROJECT_SUMMARY_MAX_WORDS;
		}, `Le sommaire du projet peut pas dépasser ${PROJECT_SUMMARY_MAX_WORDS} mots.`)
		.optional()
);

const projectTypeSchema = zfd.numeric(z.number().optional());

const projectSiteOwnershipSchema = zfd.numeric(z.number().optional());

const projectCostRangeSchema = zfd
	.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()]))
	.superRefine(([min, max], ctx) => {
		if (min < PROJECT_COST_MIN || min > PROJECT_COST_MAX_BIG) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `La valeur minimum du projet ne respecte pas les limites.`,
			});
		}
		if (max < PROJECT_COST_MIN || max > PROJECT_COST_MAX_BIG) {
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
		summary: projectSummarySchema,
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
			PROJECT_ADJACENT_STREETS_MIN,
			`Le site du projet ne peut pas être bordé par moins de ${PROJECT_ADJACENT_STREETS_MIN} rues.`
		)
		.max(
			PROJECT_ADJACENT_STREETS_MAX,
			`Le site du projet ne peut pas être bordé par plus de ${PROJECT_ADJACENT_STREETS_MAX} rues.`
		)
		.optional()
);

const projectAdjacentAlleysSchema = zfd.numeric(
	z
		.number()
		.min(
			PROJECT_ADJACENT_ALLEYS_MIN,
			`Le site du projet ne peut pas être bordé par moins de ${PROJECT_ADJACENT_ALLEYS_MIN} ruelles ou voies alternatives.`
		)
		.max(
			PROJECT_ADJACENT_ALLEYS_MAX,
			`Le site du projet ne peut pas être bordé par plus de ${PROJECT_ADJACENT_ALLEYS_MAX} ruelles ou voies alternatives.`
		)
		.optional()
);

// const projectLocationSchema = zfd
// 	.json(
// 		z.object({
// 			center: positionSchema.nullable(),
// 			radius: z.number().max(PROJECT_LOCATION_MAX_RADIUS).nullable(),
// 		})
// 	)
// 	.transform(({ center, radius }) => {
// 		return {
// 			center: center ? toPgGeom(point(center).geometry) : null,
// 			radius,
// 		};
// 	});

const projectLocationSchema = positionSchema
	.optional()
	.transform((p) => (p ? toPgGeom(point(p).geometry) : null));

const projectLocationRadiusSchema = zfd.numeric(
	z
		.number()
		.min(0, 'Le rayon de localisation ne peut pas être négatif.')
		.max(
			PROJECT_LOCATION_MAX_RADIUS,
			`Le rayon de localisation du projet ne peut pas dépasser ${PROJECT_LOCATION_MAX_RADIUS} mètres.`
		)
		.optional()
);

const projectImplantationModeSchema = zfd.numeric(z.number().optional());

const projectBuildingHeightSchema = zfd.numeric(
	z
		.number()
		.min(
			PROJECT_BUILDING_MIN_HEIGHT,
			`La hauteur du bâtiment du projet ne peut pas être en deçà de ${PROJECT_BUILDING_MIN_HEIGHT}m.`
		)
		.max(
			PROJECT_BUILDING_MAX_HEIGHT,
			`La hauteur du bâtiment du projet ne peut pas être au delà de ${PROJECT_BUILDING_MAX_HEIGHT}m.`
		)
		.optional()
);

const projectBuildingLevelsSchema = zfd.repeatableOfType(strictCoerceBooleanSchema);

const projectBuildingConstructionYearSchema = zfd.numeric(
	z.number().min(PROJECT_BUILDING_YEAR_MIN).max(PROJECT_BUILDING_YEAR_MAX).optional()
);

export const projectPlaceUpdateSchema = zfd.formData({
	location: projectLocationSchema,
	location_radius: projectLocationRadiusSchema,
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
});
// .transform(({ location, ...project }) => {
// 	return {
// 		location,
// 		project,
// 	};
// });
// enforce logical area containment.

export const projectImageUploadSchema = zfd.formData({
	image_files: zfd.repeatableOfType(
		zfd.file(
			z
				.instanceof(File)
				.refine((file) => PROJECT_IMAGE_TYPES.includes(file.type), `Format d'image incompatible.`)
		)
	),
});

const projectImageTitleSchema = zfd.text(
	z
		.string()
		.max(PROJECT_IMAGE_TITLE_MAX, "Le titre de l'image dépasse le nombre maximum de caractères.")
		.nullable()
		.default(null)
);

const projectImageDescriptionSchema = zfd.text(
	z
		.string()
		.max(
			PROJECT_IMAGE_DESCRIPTION_MAX,
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
