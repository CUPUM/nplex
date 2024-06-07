export const actions = {
	default: async (event) => {
		console.log(event.request.formData());
	},
};
