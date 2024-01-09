import { guardAuth } from '$lib/auth/guard.server';

export const load = async (event) => {
	await guardAuth(event);
};

export const actions = {
	update: async (event) => {
		await guardAuth(event);
	},
};
