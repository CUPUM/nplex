import { ALLOWED_ROLES } from '$routes/(authed)/editer/(editor)/descripteurs/common';
import { STATUS_CODES } from '$utils/enums';
import { userHasRole } from '$utils/validation';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!userHasRole(event, ...ALLOWED_ROLES)) {
		throw redirect(STATUS_CODES.TemporaryRedirect, '/editer');
	}
	return {};
};
