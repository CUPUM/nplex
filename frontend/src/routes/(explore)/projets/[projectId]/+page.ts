import type { TableRow } from '$types/database/utils';
import type { MaybeSingle, Single } from '$types/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const project = db
		.from('projects')
		.select(
			`
		*,
		type:project_type (
			*
		),
		site_ownership:project_site_ownership (
			*
		),
		interventions:project_intervention (
			*
		),
		exemplarityIndicators:project_exemplarity_indicator (
			*
		),
		gallery:projects_images!projects_images_project_fkey (
			*
		),
		banner:projects_images!projects_banner_fkey (
			*
		)
		`,
			{ count: 'exact' }
		)
		.eq('id', event.params.projectId)
		.limit(1)
		.returns<
			[
				Omit<TableRow<'projects'>, 'banner'> & {
					banner: MaybeSingle<TableRow<'projects_images'>>;
					gallery: TableRow<'projects_images'>[];
					type: Single<TableRow<'project_type'>>;
					site_ownership: Single<TableRow<'project_site_ownership'>>;
					interventions: TableRow<'project_intervention'>[];
					exemplarityIndicators: TableRow<'project_exemplarity_indicator'>[];
				}
			]
		>()
		.single()
		.then((p) => {
			if (p.error) {
				console.log(p.error);
				throw error(STATUS_CODES.InternalServerError, p.error);
			}
			if (!p.count) {
				throw error(STATUS_CODES.NotFound, { message: 'Aucun projet trouvé ici.' });
			}
			return p.data;
		});

	let projectUser = null;
	const user = (await event.parent()).session?.user;
	if (user) {
		projectUser = db
			.from('projects_users')
			.select(
				`*,
			user:users(
				*
			)`
			)
			.eq('user', user.id)
			.maybeSingle();
	}

	return {
		categoryIsResetable: true,
		showFooter: true,
		project,
		projectUser,
	};
};
