import { ALLOWED_ROLES } from '$routes/(authed)/editer/(editor)/descripteurs/common';
import { STATUS_CODES } from '$utils/enums';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.session || !ALLOWED_ROLES.includes(event.locals.session.user.role)) {
		throw redirect(STATUS_CODES.TemporaryRedirect, '/editer');
	}
	return {};
};
