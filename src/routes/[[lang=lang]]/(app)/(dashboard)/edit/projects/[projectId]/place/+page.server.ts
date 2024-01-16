export const load = async (event) => {
	await event.locals.authorize();
};

export const actions = {
	update: async (event) => {
		await event.locals.authorize();
	},
};
