export const load = async (event) => {
	await event.locals.authorize('organizations.descriptors.update');
};
