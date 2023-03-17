import { orgNameSchema } from '$routes/(authed)/editer/(editor)/organisation/common';
import { orgShortNameSchema } from '$routes/(authed)/editer/(editor)/organisation/[orgId]/common';
import { STATUS_CODES } from '$utils/enums';
import { errorMessages } from '$utils/validation';
import { error, fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';

const updateSchema = zfd.formData({
	name: orgNameSchema,
	short_name: orgShortNameSchema,
});

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = updateSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}

		const up = await event.locals.db
			.from('organizations')
			.update(parsed.data)
			.eq('id', event.params.orgId)
			.single();
		if (up.error) {
			throw error(STATUS_CODES.InternalServerError, up.error);
		}

		return { success: true };
	},
};
