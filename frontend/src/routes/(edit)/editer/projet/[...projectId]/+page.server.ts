import { dbClient } from '$utils/database';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { getCircleCenter, getCircleRadius, isCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';

const upsertSchema = z.object({
	// Define form object here...
});

function getCircleGeom(geojson: any) {
	if (isCircle(geojson)) {
		const center = getCircleCenter(geojson);
		const radius = getCircleRadius(geojson);
		return `select ST_Buffer(ST_SetSRID(ST_MakePoint(${center[1]}, ${center[0]}), 4326)::geography, ${
			radius * 1000
		})`;
	}
	return false;
}

export const actions: Actions = {
	upsert: async (event) => {
		if (!event.locals.session) return invalid(401);
		const { location, ...formData } = Object.fromEntries(await event.request.formData()) as any;
		if (event.params.projectId) formData.id = event.params.projectId;
		const db = dbClient.createForServer(event.locals.session.access_token);
		const project = await db
			.from('projects')
			.upsert({ ...formData, location: getCircleGeom(JSON.parse(location)) })
			.select('id')
			.single();
		if (project.error) {
			throw error(project.status, project.error.message);
		}
		// If newly added project, redirect to proper url param.
		if (!event.params.projectId) {
			throw redirect(302, '/editer/projet/' + project.data.id);
		}
	},
};
