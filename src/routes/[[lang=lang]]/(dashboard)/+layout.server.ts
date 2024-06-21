import { authorize } from '$lib/crud/authorization/rbac.server';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';

export const load = async (event) => {
	authorize(event);

	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_WIDTH),
	};
};
