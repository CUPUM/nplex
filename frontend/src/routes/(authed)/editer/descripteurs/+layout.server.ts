import { STATUS_CODES } from '$utils/enums';
import { userHasRole } from '$utils/validation';
import { redirect } from '@sveltejs/kit';
import { DECRIPTORS_ALLOWED_ROLES } from '../constants';

export const load = async (event) => {
	if (!userHasRole(event, ...DECRIPTORS_ALLOWED_ROLES)) {
		throw redirect(STATUS_CODES.TemporaryRedirect, '/editer');
	}
	return {
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{ href: '/editer/descripteurs', title: 'Descripteurs', disabled: true },
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
