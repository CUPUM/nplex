import type { Database } from '$types/database';
import { dbClient } from '$utils/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

type DatabaseTable<TableName extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][TableName]['Row'][];

export type ProjectsDescriptors = {
	categories: DatabaseTable<'project_category'>;
	types: DatabaseTable<'project_type'>;
	siteOwnerships: DatabaseTable<'project_site_ownership'>;
	siteUsagesCategories: DatabaseTable<'project_site_usage_category'>;
	siteUsages: DatabaseTable<'project_site_usage'>;
	implantationModes: DatabaseTable<'project_implantation_mode'>;
	materialOrigins: DatabaseTable<'project_material_origin'>;
	materialTypes: DatabaseTable<'project_material_type'>;
	materialUses: DatabaseTable<'project_material_use'>;
	eventTypes: DatabaseTable<'project_event_type'>;
	exemplarityIndicatorsCategories: DatabaseTable<'project_exemplarity_indicator_category'>;
	exemplarityIndicators: DatabaseTable<'project_exemplarity_indicator'>;
};

let cache: ProjectsDescriptors = null;

let time = 0;

/**
 * This endpoint gets the various project-related params lists used for filtering functionalities, submission forms, and
 * more.
 */
export const GET: RequestHandler = async ({ request }) => {
	// if (!time || !cache || time < Date.now() - 10000) {
	const db = dbClient.server();

	try {
		const queries = {
			categories: db.from('project_category').select('*'),
			types: db.from('project_type').select('*'),
			siteOwnerships: db.from('project_site_ownership').select('*'),
			siteUsagesCategories: db.from('project_site_usage_category').select('*, usages:project_site_usage(*)'),
			siteUsages: db.from('project_site_usage').select('*'),
			implantationModes: db.from('project_implantation_mode').select('*'),
			materialOrigins: db.from('project_material_origin').select('*'),
			materialTypes: db.from('project_material_type').select('*'),
			materialUses: db.from('project_material_use').select('*'),
			eventTypes: db.from('project_event_type').select('*, childTypes:project_event_type!child_type_id(*)'),
			exemplarityIndicatorsCategories: db
				.from('project_exemplarity_indicator_category')
				.select('*, indicators:project_exemplarity_indicator(*)'),
			exemplarityIndicators: db.from('project_exemplarity_indicator').select('*'),
		};

		let precache = Object.entries(queries).map(async ([k, q]) => {
			return q.throwOnError().then((res) => {
				cache[k] = res.data;
			});
		});

		// Caching response
		time = Date.now();
	} catch (e) {
		console.log('UNE ERREUR CALISSE', e);
		time = 0;
		throw error(e.status, e.message);
	}
	// }

	return json(cache);
};
