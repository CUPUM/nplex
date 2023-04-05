import type { TableRow, ViewRow } from '$types/database/utils';
import type { MaybeSingle } from '$types/utils';
import { STATUS_CODES } from '$utils/enums';
import { pagination } from '$utils/format';
import { error } from '@sveltejs/kit';

async function getEditableProjects(db: App.DatabaseClient, start: number = 0, end: number = 10) {
	const projects = await db
		.from('editable_projects')
		.select(
			`
			*,
			type:project_type(
				*
			),
			banner:projects_images!banner(
				*
			),
			publication_status:projects_publication_status(
				*
			),
			interventions:project_intervention(
				*
			)
		`
		)
		.order('updated_at', { ascending: false })
		.returns<
			(Omit<ViewRow<'editable_projects'>, 'banner'> & {
				type: TableRow<'project_type'>;
				banner: MaybeSingle<TableRow<'projects_images'>>;
				publication_status: TableRow<'projects_publication_status'>;
				interventions: TableRow<'project_intervention'>[];
			})[]
		>()
		.range(...pagination(start, end));
	if (projects.error) {
		console.error(projects.error);
		return [];
	}
	return projects.data;
}

async function getEditableOrgs(db: App.DatabaseClient, start: number = 0, end: number = 10) {
	const orgs = await db
		.from('editable_organisations')
		.select(
			`
		*
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(start, end));
	if (orgs.error) {
		console.error(orgs.error);
		return [];
	}
	return orgs.data;
}

async function getEditableActors(db: App.DatabaseClient, start: number = 0, end: number = 10) {
	const actors = await db
		.from('editable_actors')
		.select(
			`
		*
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(start, end));
	if (actors.error) {
		console.error(actors.error);
		return [];
	}
	return actors.data;
}

export const load = async (event) => {
	if (!event.locals.session) {
		throw error(STATUS_CODES.Unauthorized, {
			message: 'Oops. Vous devez être connecté pour accéder à cette section de Nplex.',
		});
	}
	try {
		return {
			defer: {
				editableProjects: getEditableProjects(event.locals.db),
				editableOrgs: getEditableOrgs(event.locals.db),
				editableActors: getEditableActors(event.locals.db),
			},
			editorBreadcrumbs: [
				{
					title: 'Éditeur',
					href: '/editer',
				},
			] satisfies App.PageData['editorBreadcrumbs'],
		};
	} catch (err) {
		console.error(err);
		throw error(STATUS_CODES.InternalServerError, JSON.stringify(err));
	}
};
