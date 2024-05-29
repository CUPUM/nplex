import * as m from '$i18n/messages';
import {
	OAUTH_PROVIDERS_ARR,
	USER_ROLES,
	USER_ROLES_ARR,
	type OAuthProvider,
	type UserRole,
} from '$lib/auth/constants';
import { z } from 'zod';
import { USER_PASSWORD_MIN } from './constants';

export class FormSubmitter {
	constructor() {}
}

export function isUserRole(maybeUserRole: unknown): maybeUserRole is UserRole {
	return USER_ROLES_ARR.indexOf(maybeUserRole as UserRole) > -1;
}

export function isOAuthProvider(maybeOAuthProvider: unknown): maybeOAuthProvider is OAuthProvider {
	return OAUTH_PROVIDERS_ARR.indexOf(maybeOAuthProvider as OAuthProvider) > -1;
}

export const userRoleSchema = z.nativeEnum(USER_ROLES, { message: m.user_role_invalid() });

export const userEmailSchema = z.string().trim().toLowerCase().email(m.email_invalid());

export const userPasswordSchema = z.string().min(USER_PASSWORD_MIN, m.password_too_short());

export const loginEmailPasswordSchema = z.object({
	email: userEmailSchema,
	password: z.string().min(1, m.password_required()),
});

export const signupEmailPasswordSchema = z
	.object({
		email: userEmailSchema,
		password: userPasswordSchema,
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

export const emailVerificationCodeSchema = z.string().trim().min(1);

export const emailPasswordResetSchema = z.object({
	email: userEmailSchema,
});
