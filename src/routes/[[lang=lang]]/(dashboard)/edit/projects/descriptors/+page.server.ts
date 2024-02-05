import { authorize } from '$lib/auth/rbac.server';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.update');
};
