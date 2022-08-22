import type { Database } from '$types/database';
import { getContextualDbClient } from '$utils/database/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type Project = Database['public']['Tables']['projects']['Row'] & {
	// Extend here with expected join data.
	site_usage: Database['public']['Tables']['project_site_usage']['Row'];
	site_usage_category: Database['public']['Tables']['project_site_usage_category']['Row'];
	site_secondary_usages: {
		usage: Project['site_usage'];
		category: Project['site_usage_category'];
	}[];
};

const newProject: Project = {
	created_at: Date.now().toString(),
	created_by_id: null,
	updated_at: Date.now().toString(),
	updated_by_id: null,
	title: null,
	type_id: null,
	site_usage_id: null,
	site_usage: null,
	site_usage_category_id: null,
	site_usage_category: null,
	site_secondary_usages: [],
};

export const load: PageLoad = async ({ params, fetch, parent }) => {
	let project: Project;

	// If the client is querying the new project route (aka, no projectId specified)
	if (!params.projectId) {
		project = newProject;
		return {
			isNew: true,
			project,
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
		project,
	};
};
