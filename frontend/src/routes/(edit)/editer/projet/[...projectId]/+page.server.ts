import { dbClient } from '$utils/database';
import { pointCoordsSchema } from '$utils/validation';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { getCircleCenter, getCircleRadius, isCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const upsertSchema = zfd
	.formData({
		id: zfd.text().optional(),
		title: zfd.text(),
		location: z.preprocess(
			(l) => (typeof l === 'string' ? JSON.parse(l) : l),
			z
				.object({
					properties: z.object({
						circleRadius: z.number(),
					}),
					geometry: z
						.object({
							coordinates: z.array(z.array(pointCoordsSchema)),
							type: z.literal('Polygon'),
						})
						.passthrough(),
				})
				.passthrough()
				.optional()
		),
	})
	.transform((u) => {
		const { location, ...p } = u;
		if (isCircle(location)) {
			const c = getCircleCenter(location);
			const r = getCircleRadius(location) * 1000;
			return {
				...p,
				location_geometry: `POINT(${c[1]} ${c[0]})`,
				location_radius: r,
			};
		}
		return { ...p, location_geometry: '', location_radius: null };
	});

export const actions: Actions = {
	upsert: async (event) => {
		if (!event.locals.session) return invalid(401);
		const validated = upsertSchema.safeParse(await event.request.formData());
		if (!validated.success) throw error(500, validated.error);
		if (event.params.projectId) validated.data.id = event.params.projectId;
		const db = dbClient.createForServer(event.locals.session.access_token);
		const project = await db.from('projects').upsert(validated.data).select('id').single();
		if (project.error) {
			throw project.error;
		}
		// If newly added project, redirect to proper url param.
		if (!event.params.projectId) {
			throw redirect(302, '/editer/projet/' + project.data.id);
		}
	},
	publish: async (event) => {},
	delete: async (event) => {},
};
