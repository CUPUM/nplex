import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const updateImageTypesSchema = z.object({});

const updateImageTemporalitiesSchema = z.object({});

export const load = async (event) => {
	const session = await withRole(event, USER_ROLES.ADMIN);
};

export const actions = {
	updateImageTypes: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
		const form = await superValidate(event, updateImageTypesSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
	},
	deleteImageType: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
	},
	createImageType: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
	},
	updateImageTemporalities: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
		const form = await superValidate(event, updateImageTemporalitiesSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
	},
	deleteImageTemporality: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
	},
	createImageTemporality: async (event) => {
		const session = withRole(USER_ROLES.ADMIN);
	},
};
