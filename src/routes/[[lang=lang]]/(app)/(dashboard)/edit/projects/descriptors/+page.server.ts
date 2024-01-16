export const load = async (event) => {
	await event.locals.authorize('projects.descriptors.update');
};
