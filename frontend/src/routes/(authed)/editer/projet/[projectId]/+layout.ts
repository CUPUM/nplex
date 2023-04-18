import EditorBottomNavProject from '$routes/(authed)/editer/projet/[projectId]/EditorBottomNavProject.svelte';
import EditorHeaderProject from '$routes/(authed)/editer/projet/[projectId]/EditorHeaderProject.svelte';
import EditorSidebarProject from '$routes/(authed)/editer/projet/[projectId]/EditorSidebarProject.svelte';
import { asMany, type FunctionReturn, type TableRow } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { alwaysArr, pgCubeToHsl, pgRangeToArr } from '$utils/format';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const descriptors = db.rpc('get_project_descriptors').then((res) => {
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
			interventions:projects_interventions (
				*
			),
			usages:projects_usages (
				*
			),
			gallery:projects_images!projects_images_project_fkey (
				*,
				credits:projects_images_credits (
					*
				)
			),
			indicators:projects_exemplarity_indicators (
				indicator
			),
			publication_satisfy:project_publication_satisfy,
			updated_by:updated_by (
				*,
				role:users_roles!users_roles_user_fkey (
					*
				)
			),
			created_by:created_by (
				*,
				role:users_roles!users_roles_user_fkey (
					*
				)
			)
		`
		)
		.eq('id', event.params.projectId)
		.order('index', { foreignTable: 'projects_images', ascending: true })
		.returns<
			(Omit<TableRow<'projects'>, 'updated_by' | 'created_by'> & {
				interventions: TableRow<'projects_interventions'>[];
				usages: TableRow<'projects_usages'>[];
				gallery: (TableRow<'projects_images'> & {
					credits: TableRow<'projects_images_credits'>[];
				})[];
				indicators: Pick<TableRow<'projects_exemplarity_indicators'>, 'indicator'>[];
				publication_satisfy: FunctionReturn<'project_publication_satisfy'>;
				updated_by: TableRow<'users'> & { role: TableRow<'users_roles'> };
				created_by: TableRow<'users'> & { role: TableRow<'users_roles'> };
			})[]
		>()
		.single()
		.then((res) => {
			if (res.error) {
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
				// usages: alwaysArr(res.data.usages),
				gallery: asMany(res.data.gallery).map((img) => ({
					...img,
					color_mean_hsl: pgCubeToHsl(img.color_average_hsl),
					color_dominant_hsl: pgCubeToHsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.storage_name).data
						.publicUrl,
					// credits: asMany(img.credits),
				})),
				indicators: alwaysArr(res.data.indicators).map((pi) => pi.indicator),
			};
		});

	await Promise.all([descriptors, project]);

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
