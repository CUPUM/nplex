import { maybeSingle } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { alwaysArr, pgCubeToHsl, pgRangeToArr } from '$utils/format';
import { error } from '@sveltejs/kit';
import type { LayoutParentData } from './$types';

export const load = async (event) => {
	// event.depends(LOAD_DEPENDENCIES.EDITOR_PROJECT);
	const db = await getDb(event);

	const descriptors = db.rpc('project_descriptors').then((res) => {
		if (res.error) {
			throw error(STATUS_CODES.InternalServerError, res.error);
		}
		return res.data;
	});

	const project = await db
		.from('projects')
		.select(
			`
			*,
			work_ids:projects_works (*),
			usages:projects_usages (*),
			location:projects_location (*),
			gallery:projects_images!project_id (*),
			indicators:projects_exemplarity_indicators (*),
			updated_by:updated_by_id (*,
				role:users_roles!users_roles_user_id_fkey (*)
			),
			created_by:created_by_id (*,
				role:users_roles!users_roles_user_id_fkey (*)
			),
			publication_status:projects_publication_status (status)
		`
		)
		.eq('id', event.params.projectId)
		.order('order', { foreignTable: 'projects_images', ascending: true })
		.maybeSingle()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			if (!res.data) {
				throw error(STATUS_CODES.NotFound, {
					message: `Il ne semble pas y avoir de projet ici, ou le projet ne vous est pas accessible.`,
				});
			}
			// Applying transformations to format data for easier client consumption.
			return {
				...res.data,
				cost_range: pgRangeToArr(res.data.cost_range),
				work_ids: alwaysArr(res.data.work_ids).map((w) => w.work_id),
				usages: alwaysArr(res.data.usages),
				location: maybeSingle(res.data.location)!,
				gallery: alwaysArr(res.data.gallery).map((img) => ({
					...img,
					color_mean_hsl: pgCubeToHsl(img.color_mean_hsl),
					color_dominant_hsl: pgCubeToHsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.name).data
						.publicUrl,
				})),
				indicators: alwaysArr(res.data.indicators),
				publication_status: maybeSingle(res.data.publication_status)!,
			};
		});

	const crumbs = [
		...(await event.parent()).crumbs,
		{ title: 'Projet', pathname: '/editer/projet' },
		{
			title: project.title,
			pathname: `/editer/projet/${event.params.projectId}`,
			matcher: new RegExp('/editer/projet/([A-Za-z0-9-]+)/([A-Za-z0-9-_]+)'),
		},
	] satisfies LayoutParentData['crumbs'];

	return {
		project,
		descriptors,
		crumbs,
	};
};
