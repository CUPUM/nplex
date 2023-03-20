import { AuthError, type PostgrestError } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { ZodError, z } from 'zod';
import { DB_ERROR_MESSAGE } from './enums';

/**
 * Short utility function to quickly check a request user's role-based authorization.
 */
export function userHasRole(event: RequestEvent, ...roles: App.UserRole[]) {
	if (!event.locals.session?.user.role) return false;
	return roles.includes(event.locals.session?.user.role);
}

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const positionSchema = z.union([
	z.tuple([z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number(), z.number()]),
]);

export const roleSchema = z.union([z.literal('visitor'), z.literal('editor'), z.literal('admin')]);

/**
 * Retrieve error messages from various types of input.
 *
 * @returns Array of error string messages to pass to `errorMessages` when failing a form action.
 */
export function errorMessages(
	error: AuthError | PostgrestError | ZodError,
	fallback?: string
): string[] {
	if (error instanceof AuthError) {
		return [
			DB_ERROR_MESSAGE[error.message] ??
				fallback ??
				`Il y a eu une erreur d’authentification. (${error.name}, ${error.status})`,
		];
	} else if (error instanceof ZodError) {
		return Object.values(error.formErrors.fieldErrors).reduce<string[]>((acc, field) => {
			if (field) {
				acc.push(field.join(' '));
			}
			return acc;
		}, []);
	} else if ('message' in error) {
		// If PostgrestError or other compatible type signature.
		return [DB_ERROR_MESSAGE[error.message] ?? fallback ?? JSON.stringify(error)];
	}
	return [fallback ?? JSON.stringify(error)];
}
