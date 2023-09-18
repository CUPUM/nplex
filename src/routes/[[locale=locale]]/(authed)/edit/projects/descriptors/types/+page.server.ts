import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { dbhttp } from '$lib/db/db.server';

// const typesUpdateSchema = z.array(createInsertSchema());

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const types = await dbhttp.query.projectTypes.findMany({ with: { translations: true } });
	// const form = await superForm(types, typesUpdateSchema);
	return { types };
};

export const actions = {
	create: async (event) => {},
	update: async (event) => {},
	delete: async (event) => {},
};
