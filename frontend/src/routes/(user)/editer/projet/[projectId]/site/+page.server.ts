import { getDb } from '$utils/database';
import type { Actions } from '@sveltejs/kit';

// const v = zfd
// 	.formData(
// 		z
// 			.object({
// 				title: zfd.text(),
// 				location: zfd.text(z.string().optional()),
// 			})
// 			.passthrough()
// 	)
// 	.transform((u) => {
// 		const { location, ...r } = u;
// 		const l = projectLocationSchema.safeParse(safeJsonParse(location));
// 		if (l.success) {
// 			return { ...l.data, ...r };
// 		}
// 		return { location_geometry: null, location_radius: null, ...r };
// 	})
// 	.safeParse(await event.request.formData());
// if (!v.success) {
// 	throw error(500, v.error);
// }

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const data = await event.request.formData();
		const db = await getDb(event);
		console.log('Update project site metadata');
	},
};
