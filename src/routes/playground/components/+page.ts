import { STATUS_CODES } from '$lib/common/constants';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	redirect(STATUS_CODES.TEMPORARY_REDIRECT, '/playground/components/button');
};
