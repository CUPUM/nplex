import type { TableRow } from '$types/database/utils.js';
import type { MaybeSingle } from '$types/utils.js';
import { getDb } from '$utils/database/client.js';
import { STATUS_CODES } from '$utils/enums.js';
import { pagination } from '$utils/format.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const editableProjects = db
		.from('projects')
		.select(
			`
			*,
			type:project_type(
				*
			),
			banner:projects_images!banner(
				*
			),
			interventions:project_intervention(
				*
			)
	`
		)
		.order('updated_at', { ascending: false })
		.returns<
			(Omit<TableRow<'projects'>, 'banner'> & {
				type: TableRow<'project_type'>;
				banner: MaybeSingle<TableRow<'projects_images'>>;
				interventions: TableRow<'project_intervention'>[];
			})[]
		>()
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	const editableOrgs = db
		.from('editable_organisations')
		.select(
			`
			*
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	await Promise.all([editableProjects, editableOrgs]);

	return {
		...event.data,
		editableProjects,
		editableOrgs,
	};
};
