import {
	getOrganizationExpertisesList,
	getOrganizationTypesList,
} from '$lib/crud/queries/organizations';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';

export const load = async (event) => {
	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_WIDTH),
		lists: {
			types: getOrganizationTypesList(event),
			expertises: getOrganizationExpertisesList(event),
		},
	};
};
