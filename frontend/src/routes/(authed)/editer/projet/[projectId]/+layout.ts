import EditorBottomNavProject from '$routes/(authed)/editer/projet/[projectId]/EditorBottomNavProject.svelte';
import EditorHeaderProject from '$routes/(authed)/editer/projet/[projectId]/EditorHeaderProject.svelte';
import EditorSidebarProject from '$routes/(authed)/editer/projet/[projectId]/EditorSidebarProject.svelte';
import { asMany, asSingle } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { alwaysArr, pgCubeToHsl, pgRangeToArr } from '$utils/format';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const descriptors = db.rpc('project_descriptors').then((res) => {
		if (res.error) {
			throw error(STATUS_CODES.InternalServerError, res.error);
		}
		return res.data;
	});

	const project = db
		.from('projects')
		.select(
			`
			*,
			interventions:projects_interventions (*),
			usages:projects_usages (*),
			location:projects_location (
				center:center->coordinates,
				radius
			),
			gallery:projects_images!projects_images_project_fkey (*),
			indicators:projects_exemplarity_indicators (indicator),
			updated_by:updated_by (*,
				role:users_roles!users_roles_user_fkey (*)
			),
			created_by:created_by (*,
				role:users_roles!users_roles_user_fkey (*)
			),
			publication_status:projects_publication_status (*)
		`
		)
		.eq('id', event.params.projectId)
		.order('index', { foreignTable: 'projects_images', ascending: true })
		.maybeSingle()
		.then((res) => {
			if (res.error) {
				console.log(res.error);
				throw error(STATUS_CODES.InternalServerError, { message: res.error.message });
			}
			if (!res.data) {
				throw error(STATUS_CODES.NotFound, {
					message: `Il ne semble pas y avoir de projet ici, ou le projet ne vous est pas accessible.`,
				});
			}
			return {
				...res.data,
				cost_range: pgRangeToArr(res.data.cost_range),
				interventions: alwaysArr(res.data.interventions).map((pi) => pi.intervention),
				publication_status: asSingle(res.data.publication_status),
				location: asSingle(res.data.location) as {
					radius: number | null;
					center: GeoJSON.Point['coordinates'] | null;
				},
				usages: alwaysArr(res.data.usages),
				gallery: asMany(res.data.gallery).map((img) => ({
					...img,
					color_mean_hsl: pgCubeToHsl(img.color_average_hsl),
					color_dominant_hsl: pgCubeToHsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.storage_name).data
						.publicUrl,
				})),
				indicators: alwaysArr(res.data.indicators).map((pi) => pi.indicator),
			};
		});

	return {
		project,
		descriptors,
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{
				title: 'Projet',
				href: '/editer/projet',
			},
			{
				title: (await project).title,
				href: `/editer/projet/${event.params.projectId}`,
				matcher: new RegExp('/editer/projet/([A-Za-z0-9-]+)'),
			},
		] satisfies App.PageData['editorBreadcrumbs'],
		editorSidebar: EditorSidebarProject,
		editorHeader: EditorHeaderProject,
		editorBottomNav: EditorBottomNavProject,
	};
};
