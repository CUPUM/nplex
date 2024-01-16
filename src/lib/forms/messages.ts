import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { message, type SuperValidated } from 'sveltekit-superforms';

export function messageInvalid<F extends Record<string, unknown>>(
	form: SuperValidated<F>,
	name: string
) {
	return message(form, {
		title: m.invalid_data(),
		description: m.invalid_data_description({ name }),
	});
}

export function messageSuccess<F extends Record<string, unknown>>(form: SuperValidated<F>) {
	return message(form, {
		title: m.success(),
		description: m.success_saved_data(),
	});
}

export function messageNoRowsDeleted<F extends Record<string, unknown>>(form: SuperValidated<F>) {
	return message(
		form,
		{
			title: m.error_no_rows_deleted(),
			description: m.error_no_rows_deleted_description(),
		},
		{
			status: STATUS_CODES.NOT_FOUND,
		}
	);
}

export function messageError<F extends Record<string, unknown>>(form: SuperValidated<F>) {
	return message(
		form,
		{
			title: m.server_error_title(),
			description: m.server_error_description(),
		},
		{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
	);
}
