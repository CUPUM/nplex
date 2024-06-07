import * as m from '$i18n/messages';
import { TOAST_TYPES } from '$lib/builders/toasts.svelte';
import { message, type SuperValidated } from 'sveltekit-superforms';

export function messageSaveSuccess<T extends Record<string, any>>(form: SuperValidated<T>) {
	return message(form, { type: TOAST_TYPES.SUCCESS, content: { body: m.saved() } });
}
