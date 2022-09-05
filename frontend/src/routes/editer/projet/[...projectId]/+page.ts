import type { Database } from '$types/database';
import { getContextualDbClient } from '$utils/database/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type EditorProject = Database['public']['Tables']['projects']['Row'] & {
	// site_secondary_usages: Database['public']['Tables']['projects']['Row'];
};

const newProject: EditorProject = {
	created_at: null,
	created_by_id: null,
	updated_at: null,
	updated_by_id: null,
	banner_url: null,
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
	site_usage_category_id: null,
};

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const { session } = await parent();
	const db = getContextualDbClient(session.jwt);

	const descriptors = await db.rpc('get_projects_descriptors').single();
	if (descriptors.error) {
		throw error(descriptors.status, descriptors.statusText + '(' + descriptors.error.details + ')');
	}

	const res = {
		isNew: true,
		descriptors: descriptors.data,
		project: newProject,
	};

	// If there is a projectId specified
	if (params.projectId) {
		const project = await db
			.from('projects')
			.select(
				`
					*
				`
			)
			.eq('id', params.projectId)
			.single();
		if (project.error) throw error(project.status, project.statusText + '(' + project.error.details + ')');
		res.isNew = false;
		res.project = project.data;
	}

	return res;
};
