import type { PageLoad } from './$types';

const newSiteUsage = {
	category_id: null,
	usage_id: null,
};

const newProject = {
	updated_at: Date.now(),
	title: null,
	type_id: null,
	site_main_usage: newSiteUsage,
	site_secondary_usages: [],
};

export const load: PageLoad = async ({ params, fetch }) => {
	return {
		isNew: !params.projectId,
	};
};
