import { authorize } from '$lib/crud/authorization/rbac.server';

export const load = async (event) => {
	authorize(event);
};

export const actions = {
	update: async (event) => {
		authorize(event);
	},
};
