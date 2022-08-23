import type { Database } from '$types/database';
import { getContextualDbClient } from '$utils/database/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type EditorProject = Database['public']['Tables']['projects']['Row'] & {
	// Extend here with expected join data.
	site_usage: Database['public']['Tables']['project_site_usage']['Row'];
	site_usage_category: Database['public']['Tables']['project_site_usage_category']['Row'];
	site_secondary_usages: {
		usage: EditorProject['site_usage'];
		category: EditorProject['site_usage_category'];
	}[];
};

const newProject: EditorProject = {
	created_at: Date.now().toString(),
	created_by_id: null,
	updated_at: Date.now().toString(),
	updated_by_id: null,
	id: null,
	title: null,
	description: null,
	site_ownership_id: null,
	category_id: null,
	type_id: null,
	area: null,
	site_area: null,
	building_area: null,
	building_construction_year: null,
	adjacent_streets: null,
	implantation_mode_id: null,
	location_geometry: null,
	combustible: null,
	cost_max: null,
	cost_min: null,
	site_usage_id: null,
	site_usage: null,
	site_usage_category_id: null,
	site_usage_category: null,
	site_secondary_usages: null,
};

export const load: PageLoad = async ({ params, fetch, parent }) => {
	// If the client is querying the new project route (aka, no projectId specified)
	if (!params.projectId) {
		return {
			isNew: true,
			project: newProject,
		};
	}

	// If there is a projectId specified
	const { session } = await parent();
	const db = getContextualDbClient(session.jwt);
	const { data, error: e } = await db
		.from('projects')
		.select(
			`
				*
				`
		)
		.eq('id', params.projectId)
		.single();
	if (e) throw error(+e.code, e.message);
	return {
		isNew: false,
		project: data,
	};
};
