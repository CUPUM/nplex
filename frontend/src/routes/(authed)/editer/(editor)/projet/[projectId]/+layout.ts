import { fixTypes } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { pgCubeToHsl, pgRangeToArr } from '$utils/format';
import { error } from '@sveltejs/kit';
import { EDITOR_FORM_ID } from '../../common';
import EditorHeaderProject from './EditorHeaderProject.svelte';

export const load = async (event) => {
	// event.depends(LOAD_DEPENDENCIES.EDITOR_PROJECT);
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
			works:projects_works (*),
			usages:projects_usages (*),
			location:projects_location (
				center:geometry->coordinates,
				radius
			),
			gallery:projects_images!project_id (*),
			indicators:projects_exemplarity_indicators (*),
			updated_by:updated_by_id (*,
				role:users_roles!users_roles_user_id_fkey (*)
			),
			created_by:created_by_id (*,
				role:users_roles!users_roles_user_id_fkey (*)
			),
			publication_status:projects_publication_status (*)
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
			const fixed = fixTypes(res.data)
				.toMany<{ works: true; usages: true; gallery: true; indicators: true }>()
				.toSingle<{ location: true; publication_status: true }>().data;
			return {
				...fixed,
				cost_range: pgRangeToArr(fixed.cost_range),
				work_ids: fixed.works.map((w) => w.work_id),
				location: {
					...fixed.location,
					center: fixed.location.center as GeoJSON.Point['coordinates'] | null,
				},
				gallery: fixed.gallery.map((img) => ({
					...img,
					color_mean_hsl: pgCubeToHsl(img.color_mean_hsl),
					color_dominant_hsl: pgCubeToHsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.name).data
						.publicUrl,
				})),
			};
		});

	const editorBreadcrumbs = event.parent().then(
		async (p) =>
			[
				...p.editorBreadcrumbs,
				{
					title: 'Projet',
					href: '/editer/projet',
				},
				{
					title: (await project).title,
					href: `/editer/projet/${event.params.projectId}`,
					matcher: new RegExp('/editer/projet/([A-Za-z0-9-]+)/([A-Za-z0-9-_]+)'),
				},
			] satisfies App.PageData['editorBreadcrumbs']
	);

	const linkBase = '/editer/projet/' + event.params.projectId;

	const editorLinks = [
		{
			pathname: linkBase + '',
			title: 'Général',
		},
		{
			pathname: linkBase + '/localisation',
			title: 'Localisation',
			hash: EDITOR_FORM_ID,
		},
		{
			pathname: linkBase + '/galerie',
			title: 'Galerie',
			hash: EDITOR_FORM_ID,
		},
		{
			pathname: linkBase + '/materiaux',
			title: 'Matériaux',
			hash: EDITOR_FORM_ID,
		},
		{
			pathname: linkBase + '/indicateurs',
			title: 'Indicateurs',
			hash: EDITOR_FORM_ID,
		},
		{
			pathname: linkBase + '/realisation',
			title: 'Réalisation',
			hash: EDITOR_FORM_ID,
		},
		{
			pathname: linkBase + '/parametres',
			title: 'Paramètres',
			hash: EDITOR_FORM_ID,
		},
	] satisfies App.PageData['editorLinks'];

	return {
		project,
		descriptors,
		editorBreadcrumbs,
		editorHeader: EditorHeaderProject,
		editorLinks,
	};
};
