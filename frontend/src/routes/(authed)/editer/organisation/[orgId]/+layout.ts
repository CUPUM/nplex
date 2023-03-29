import EditorHeaderOrg from '$routes/(authed)/editer/organisation/[orgId]/EditorHeaderOrg.svelte';
import EditorSidebarOrg from '$routes/(authed)/editer/organisation/[orgId]/EditorSidebarOrg.svelte';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const org = await db
		.from('organisations')
		.select(
			`
			*
		`
		)
		.eq('id', event.params.orgId)
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	return {
		organisation: org,
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{
				title: 'Organisation',
				href: '/editer/organisation',
			},
			{
				title: org.short_name ?? org.name,
				href: `/editer/organisation/${event.params.orgId}`,
				matcher: new RegExp('/editer/organisation/([A-Za-z0-9-]+)'),
			},
		] satisfies App.PageData['editorBreadcrumbs'],
		editorHeader: EditorHeaderOrg,
		editorSidebar: EditorSidebarOrg,
	};
};
