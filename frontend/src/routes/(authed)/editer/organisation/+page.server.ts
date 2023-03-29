import { orgCreateSchema } from '$routes/(authed)/editer/organisation/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		const validated = await validateFormData(event, orgCreateSchema);
		if (validated.failure) return validated.failure;
		const newOrg = await event.locals.db
			.from('organisations')
			.insert(validated.data)
			.select('id')
			.single();
		if (newOrg.error) {
			throw error(STATUS_CODES.InternalServerError);
		}
		throw redirect(STATUS_CODES.TemporaryRedirect, `/editer/organisation/${newOrg.data.id}`);
	},
};
