import { dbpool } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesTranslations,
} from '$lib/db/schema/public';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const descriptors = await dbpool.transaction(async (tx) => {
		const types = await tx
			.select({
				...getTableColumns(projectTypesTranslations),
				...getTableColumns(projectTypes),
			})
			.from(projectTypes)
			.leftJoin(
				projectTypesTranslations,
				and(
					eq(projectTypes.id, projectTypesTranslations.id),
					eq(projectTypesTranslations.locale, event.locals.locale)
				)
			);
		const interventionCategories = await tx
			.select({
				...getTableColumns(projectInterventionCategoriesTranslations),
				...getTableColumns(projectInterventionCategories),
			})
			.from(projectInterventionCategories)
			.leftJoin(
				projectInterventionCategoriesTranslations,
				and(
					eq(projectInterventionCategories.id, projectInterventionCategoriesTranslations.id),
					eq(projectInterventionCategoriesTranslations.locale, event.locals.locale)
				)
			);
		const interventions = await tx
			.select({
				...getTableColumns(projectInterventionsTranslations),
				...getTableColumns(projectInterventions),
			})
			.from(projectInterventions)
			.leftJoin(
				projectInterventionsTranslations,
				and(
					eq(projectInterventions.id, projectInterventionsTranslations.id),
					eq(projectInterventionsTranslations.locale, event.locals.locale)
				)
			);
		const siteOwnerships = await tx
			.select({
				...getTableColumns(projectSiteOwnershipsTranslations),
				...getTableColumns(projectSiteOwnerships),
			})
			.from(projectSiteOwnerships)
			.leftJoin(
				projectSiteOwnershipsTranslations,
				and(
					eq(projectSiteOwnerships.id, projectSiteOwnershipsTranslations.id),
					eq(projectSiteOwnershipsTranslations.locale, event.locals.locale)
				)
			);
		const implantationTypes = await tx
			.select({
				...getTableColumns(projectImplantationTypesTranslations),
				...getTableColumns(projectImplantationTypes),
			})
			.from(projectImplantationTypes)
			.leftJoin(
				projectImplantationTypesTranslations,
				and(
					eq(projectImplantationTypes.id, projectImplantationTypesTranslations.id),
					eq(projectImplantationTypesTranslations.locale, event.locals.locale)
				)
			);
		const exemplarityCategories = await tx
			.select({
				...getTableColumns(projectExemplarityCategoriesTranslations),
				...getTableColumns(projectExemplarityCategories),
			})
			.from(projectExemplarityCategories)
			.leftJoin(
				projectExemplarityCategoriesTranslations,
				and(
					eq(projectExemplarityCategories.id, projectExemplarityCategoriesTranslations.id),
					eq(projectExemplarityCategoriesTranslations.locale, event.locals.locale)
				)
			);
		const exemplarityIndicators = await tx
			.select({
				...getTableColumns(projectExemplarityIndicatorsTranslations),
				...getTableColumns(projectExemplarityIndicators),
			})
			.from(projectExemplarityIndicators)
			.leftJoin(
				projectExemplarityIndicatorsTranslations,
				and(
					eq(projectExemplarityIndicators.id, projectExemplarityIndicatorsTranslations.id),
					eq(projectExemplarityIndicatorsTranslations.locale, event.locals.locale)
				)
			);
		const imageTypes = await tx
			.select({
				...getTableColumns(projectImageTypesTranslations),
				...getTableColumns(projectImageTypes),
			})
			.from(projectImageTypes)
			.leftJoin(
				projectImageTypesTranslations,
				and(
					eq(projectImageTypes.id, projectImageTypesTranslations.id),
					eq(projectImageTypesTranslations.locale, event.locals.locale)
				)
			);
		const imageTemporalities = await tx
			.select({
				...getTableColumns(projectImageTemporalitiesTranslations),
				...getTableColumns(projectImageTemporalities),
			})
			.from(projectImageTemporalities)
			.leftJoin(
				projectImageTemporalitiesTranslations,
				and(
					eq(projectImageTemporalities.id, projectImageTemporalitiesTranslations.id),
					eq(projectImageTemporalitiesTranslations.locale, event.locals.locale)
				)
			);

		return {
			types,
			interventionCategories,
			interventions,
			siteOwnerships,
			implantationTypes,
			exemplarityCategories,
			exemplarityIndicators,
			imageTypes,
			imageTemporalities,
		};
	});

	return {
		descriptors,
		test: 'asdas',
	};
};
