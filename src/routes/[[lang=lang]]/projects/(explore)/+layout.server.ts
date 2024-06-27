import {
	getProjectExemplarityMarkersByCategoriesList,
	getProjectInterventionsByCategoriesList,
	getProjectTypesList,
} from '$lib/crud/queries/projects';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';

export const load = async (event) => {
	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_WIDTH),
		lists: {
			types: getProjectTypesList(event),
			interventionsByCategories: getProjectInterventionsByCategoriesList(event),
			exemplarityMarkersBycategories: getProjectExemplarityMarkersByCategoriesList(event),
		},
	};
};
