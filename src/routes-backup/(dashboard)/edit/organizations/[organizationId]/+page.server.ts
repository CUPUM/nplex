import { authorize } from '$lib/crud/authorization/rbac.server';

export const load = async (event) => {
	authorize(event);
	// const rawOrg = await db.query.organizations.findFirst({
	// 	where(f, o) {
	// 		return o.eq(f.id, event.params.organizationId);
	// 	},
	// 	with: {
	// 		translations: true,
	// 	},
	// });
	// if (!rawOrg) {
	// 	error(STATUS_CODES.NOT_FOUND, m.organization_notFound());
	// }
	// const org = reduceTranslations(rawOrg);
	// const form = await superValidate(org, organizationsSchema);
	// return { form };
};

export const actions = {
	update: async (event) => {
		// authorize(event);
		// const form = await superValidate(event, organizationsSchema);
		// if (!form.valid) {
		// 	return fail(STATUS_CODES.BAD_REQUEST, { form });
		// }
		// try {
		// 	await db.transaction(async (tx) => {
		// 		const { translations, ...org } = form.data;
		// 		await tx
		// 			.update(organizations)
		// 			.set(org)
		// 			.where(eq(organizations.id, event.params.organizationId));
		// 		await tx
		// 			.insert(organizationsTranslations)
		// 			.values(Object.values(translations))
		// 			.onConflictDoUpdate({
		// 				target: [organizationsTranslations.id, organizationsTranslations.lang],
		// 				set: toExcluded(organizationsTranslations),
		// 			});
		// 	});
		// 	return { form };
		// } catch (e) {
		// 	return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		// }
	},
};
