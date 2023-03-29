import { orgGeneralUpdateSchema } from '$routes/(authed)/editer/organisation/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { error } from '@sveltejs/kit';

export const actions = {
	update: async (event) => {
		const validated = await validateFormData(event, orgGeneralUpdateSchema);
		if (validated.failure) return validated.failure;
		const up = await event.locals.db
			.from('organizations')
			.update(validated.data)
			.eq('id', event.params.orgId)
			.single();
		if (up.error) {
			throw error(STATUS_CODES.InternalServerError, up.error);
		}

		return { success: true };
	},
};
