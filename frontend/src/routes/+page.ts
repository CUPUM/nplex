import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
	// const {} = await parent();
	const projectsPreview = [];
	const organisationsPreview = [];
	const actorsPreview = [];

	return {
		showCategoryNav: true,
		projectsPreview,
		organisationsPreview,
		actorsPreview,
	};
};
