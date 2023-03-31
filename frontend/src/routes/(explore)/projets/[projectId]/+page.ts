import type { TableRow } from '$types/database/utils';
import type { MaybeSingle } from '$types/utils';
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

	// const userCanEdit = db.

	return {
		categoryIsResetable: true,
		showFooter: true,
		project,
	};
};
