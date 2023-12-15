import * as m from '$i18n/messages';

export function messageInvalidProjectDescriptor(descriptor: string) {
	return {
		title: m.project_descriptors_create_invalid_title(),
		description: m.project_descriptors_create_invalid_description({ descriptor }),
	} satisfies App.Superforms.Message;
}

export function messageServerError() {
	return {
		title: m.server_error_title(),
		description: m.server_error_description(),
	} satisfies App.Superforms.Message;
}

export function messageServerSuccess() {
	return {
		title: m.success(),
		description: m.success_saved_data(),
	} satisfies App.Superforms.Message;
}
