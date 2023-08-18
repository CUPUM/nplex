function delay(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export const actions = {
	pg: async (event) => {
		// const insert = db.insert();
		return {
			message: 'Postgres action!',
		};
	},
	apis: async (event) => {
		console.log('Running formaction for public api');
		return {
			message: 'Public api action!',
		};
	},
};
