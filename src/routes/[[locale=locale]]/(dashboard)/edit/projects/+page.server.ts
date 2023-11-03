import { withAuth } from '$lib/auth/guard.server';

export const load = async (event) => {
	await withAuth(event);
};

export const actions = {};
