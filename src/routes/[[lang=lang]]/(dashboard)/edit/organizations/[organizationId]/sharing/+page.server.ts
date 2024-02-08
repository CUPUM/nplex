import { authorize } from '$lib/auth/rbac.server';

export const load = async (event) => {
	authorize(event);
};

export const actions = {
	update: async (event) => {
		authorize(event);
	},
};
