import { withAuth } from '$lib/auth/guard.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	// export const images = await dbpool.query.projectsImages.findMany({
	// 	where(f, o) {
	// 		return o.eq(f.projectId, event.params.projectId)
	// 	},
	// 	with: {
	// 		transla
	// 	}
	// });
};

export const actions = {
	addImage: async (event) => {
		await withAuth(event);
	},
	deleteImage: async (event) => {
		await withAuth(event);
		const id = event.url.searchParams.get('id');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		// Confirm the requested id corresponds to an image related to the request's origin.
	},
	update: async (event) => {
		await withAuth(event);
	},
	promote: async (event) => {
		await withAuth(event);
	},
	demote: async (event) => {
		await withAuth(event);
	},
};
