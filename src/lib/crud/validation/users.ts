import * as m from '$i18n/messages';
import { ROLES } from '$lib/auth/constants';
import { users, usersRolesRequests } from '$lib/db/schema/users.server';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	USER_FIRSTNAME_MAX,
	USER_LASTNAME_MAX,
	USER_MIDDLENAME_MAX,
	USER_PASSWORD_MIN,
} from './constants';

export const roleSchema = z.nativeEnum(ROLES, { message: m.user_role_invalid() });

export const usersSchema = createInsertSchema(users, {
	role: roleSchema,
	firstName: (s) => s.firstName.max(USER_FIRSTNAME_MAX).trim(),
	middleName: (s) => s.middleName.max(USER_MIDDLENAME_MAX).trim(),
	lastName: (s) => s.lastName.max(USER_LASTNAME_MAX).trim(),
	email: (s) => s.email.trim().toLowerCase().email(m.email_invalid()),
	publicEmail: (s) => s.publicEmail.trim().toLowerCase().email(m.email_invalid()),
});

export const usersRolesRequestsSchema = createInsertSchema(usersRolesRequests, {
	requestedRole: roleSchema,
});

export const usersProfileSchema = usersSchema.pick({
	firstName: true,
	middleName: true,
	lastName: true,
	publicEmail: true,
});

export const usersAccountSchema = z.object({});

export const loginEmailPasswordSchema = z.object({
	email: usersSchema.shape.email.unwrap().unwrap(),
	password: z.string().min(1, m.password_required()),
});

export const signupEmailPasswordSchema = z
	.object({
		email: usersSchema.shape.email.unwrap().unwrap(),
		password: z.string().min(USER_PASSWORD_MIN, m.password_too_short()),
		confirmPassword: z.string(),
	})
	.superRefine((d, ctx) => {
		if (d.confirmPassword !== d.password) {
			ctx.addIssue({
				fatal: true,
				path: ['confirmPassword'],
				code: z.ZodIssueCode.custom,
				message: m.auth_password_confirmation_error(),
			});
			return z.NEVER;
		}
	});

export const emailVerificationCodeSchema = z.object({
	code: z.string().trim().min(1),
});

export const emailPasswordResetSchema = z.object({
	email: usersSchema.shape.email.unwrap().unwrap(),
});
