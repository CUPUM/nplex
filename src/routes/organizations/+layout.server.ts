import { organizationExpertisesList, organizationTypesList } from '$lib/crud/queries/organizations';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';

export const load = async (event) => {
	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_WIDTH),
		lists: {
			types: organizationTypesList,
			expertises: organizationExpertisesList,
		},
	};
};
