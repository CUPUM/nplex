import { CATEGORIES } from '$utils/enums.js';

export const load = async (event) => {
	return {
		category: CATEGORIES.Actors,
	};
};
