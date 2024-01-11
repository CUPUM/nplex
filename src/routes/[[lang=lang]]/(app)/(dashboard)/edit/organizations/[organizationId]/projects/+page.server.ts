import { authorizeSession } from '$lib/auth/authorization.server';

export const load = async (event) => {
	await authorizeSession(event);
};

export const actions = {
	update: async (event) => {
		await authorizeSession(event);
	},
};
