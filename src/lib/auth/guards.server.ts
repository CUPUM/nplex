import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '../../routes/[[locale=locale]]/$types';

export async function withAuth(event: RequestEvent, redirect?: string) {
	const session = await event.locals.auth.validate();
	if (!session) {
		if (redirect) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, redirect);
		}
		throw error(STATUS_CODES.UNAUTHORIZED);
	}
}

export async function withUser() {}

export async function withSelf() {}

export async function withProjectEditor() {}

export async function withOrganizationEditor() {}
