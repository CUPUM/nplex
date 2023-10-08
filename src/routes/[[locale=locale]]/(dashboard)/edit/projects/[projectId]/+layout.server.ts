import { dbpool } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityIndicators,
	projectImageTypes,
	projectImplantationTypes,
	projectInterventionCategories,
	projectInterventions,
	projectSiteOwnerships,
	projectTypes,
} from '$lib/db/schema/public';

export const load = async () => {
	const descriptors = await dbpool.transaction(async (tx) => {
		const types = await tx.select().from(projectTypes);
		const interventionCategories = await tx.select().from(projectInterventionCategories);
		const interventions = await tx.select().from(projectInterventions);
		const siteOwnerships = await tx.select().from(projectSiteOwnerships);
		const implantationTypes = await tx.select().from(projectImplantationTypes);
		const exemplarityCategories = await tx.select().from(projectExemplarityCategories);
		const exemplarityIndicators = await tx.select().from(projectExemplarityIndicators);
		const imageTypes = await tx.select().from(projectImageTypes);

		return {
			types,
			interventionCategories,
			interventions,
			siteOwnerships,
			implantationTypes,
			exemplarityCategories,
			exemplarityIndicators,
			imageTypes,
		};
	});
	return {
		descriptors,
		test: 'asdas',
	};
};
