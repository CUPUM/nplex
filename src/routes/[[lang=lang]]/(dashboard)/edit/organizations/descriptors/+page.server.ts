import { authorize } from '$lib/crud/authorization/rbac.server';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.update');
};
