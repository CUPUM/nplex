import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

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
	try {
		const descriptorsRes = await fetch('/api/projects/descriptors.json');
		const descriptors = await descriptorsRes.json();
		// If there is a projectId param, i.e. the client is looking to modify an existing project rather than on index page trying to create a new one.
		if (params.projectId) {
			const projectRes = await fetch(`/api/projects/${params.projectId}`);
			const project = await projectRes.json();
			return {
				descriptors,
				project,
				isNew: false,
			};
		}
		return {
			descriptors,
		};
	} catch (error) {
		console.error(error);
		throw error(404);
	}
};
