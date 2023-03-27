import { asMaybeSingle } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const notifications = db
		.from('users_notifications')
		.select(
			`
			*,
			content:notifications(
				*
			)
		`
		)
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, { ...res.error });
			}
			return res.data.map((notification) => {
				return {
					...notification,
					content: asMaybeSingle(notification.content)!,
				};
			});
		});
	return {
		notifications,
	};
};
