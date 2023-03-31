import { AuthError, type PostgrestError } from '@supabase/supabase-js';
import { fail, type ActionResult, type RequestEvent } from '@sveltejs/kit';
import type { Awaited } from 'ts-essentials';
import { ZodError, ZodType, z } from 'zod';
import { zfd } from 'zod-form-data';
import { DB_ERROR_MESSAGE, STATUS_CODES } from './enums';

/**
 * Short utility function to quickly check a request user's role-based authorization.
 */
export function userHasRole(
	eventOrPageData: RequestEvent | App.PageData,
	...roles: App.UserRole[]
) {
	const role =
		'session' in eventOrPageData
			? eventOrPageData.session?.user.role
			: 'locals' in eventOrPageData
			? eventOrPageData.locals.session?.user?.role
			: null;
	if (!role) return false;
	return roles.includes(role);
}

/**
 * Retrieve error messages from various types of input.
 *
 * @returns Array of error string messages to pass to `errorMessages` when failing a form action.
 */
export function composeFailureMessages(
	failure: AuthError | PostgrestError | ZodError,
	fallback?: string
): string[] {
	if (failure instanceof AuthError) {
		return [
			DB_ERROR_MESSAGE[failure.message] ??
				fallback ??
				`Il y a eu une erreur d’authentification. (${failure.name}, ${failure.status})`,
		];
	} else if (failure instanceof ZodError) {
		return Object.values(failure.formErrors.fieldErrors).reduce<string[]>((acc, field) => {
			if (field) {
				acc.push(field.join(' '));
			}
			return acc;
		}, []);
	} else if ('message' in failure) {
		// If PostgrestError or other compatible type signature.
		return [DB_ERROR_MESSAGE[failure.message] ?? fallback ?? JSON.stringify(failure)];
	}
	return [fallback ?? JSON.stringify(failure)];
}

/**
 * Validation wrapper for server-side schema-based form action validation and easier extraction of
 * action failures.
 */
export function validateAction<D extends any, S extends ZodType>(data: D, schema: S) {
	const parsed = zfd.formData(schema).safeParse(data);
	const validated = parsed.success
		? ({
				...parsed,
				failure: false,
		  } as const)
		: ({
				...parsed,
				failure: fail(STATUS_CODES.BadRequest, {
					messages: { error: composeFailureMessages(parsed.error) },
				}),
		  } as const);
	return validated;
}

/**
 * Consume event request's form data, parse it against a zod validation schema, and return an Action
 * Failure object if there are any validation errors.
 */
export async function validateFormData<T extends ZodType>(event: RequestEvent, schema: T) {
	const formData = await event.request.formData();
	return validateAction(formData, schema);
}

/**
 * Helper to validate url search params.
 */
export function validateSearchParams<T extends ZodType>(event: RequestEvent, schema: T) {
	return validateAction(event.url.searchParams, schema);
}

/**
 * Retrieve the error messages returned by form data invalidated using the `validateFormData`
 * helper. Used in AuthModal to manually dispatch error messages otherwise unreached at the root
 * layout's form export since the action called is located at another route.
 *
 * @see https://github.com/sveltejs/kit/issues/8462#issuecomment-1479200160
 */
export function getFailureMessages<R extends ActionResult>(result: R) {
	if (result.type === 'failure') {
		type ValidationFailureData = Exclude<
			Awaited<ReturnType<typeof validateFormData>>['failure'],
			false
		>['data'];
		return (result.data as ValidationFailureData).messages.error;
	}
}

//
// ZOD DATA VALIDATION SCHEMAS
//
// Include here all validation schemas used across the app for easier tracking, reusability, and composition.
//

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const positionSchema = z.union([
	z.tuple([z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number(), z.number()]),
]);

export const roleSchema = z.union([z.literal('visitor'), z.literal('editor'), z.literal('admin')]);

export const roleRequestSchema = zfd.formData({
	role: roleSchema,
});

export const profileSchema = zfd.formData(
	z.object({
		first_name: zfd.text(z.string().min(1)),
		last_name: zfd.text(z.string().nullable().default(null)),
		public_email: zfd.text(z.string().email().nullable().default(null)),
		about: zfd.text(z.string().nullable().default(null)),
	})
);

export const strictCoerceBooleanSchema = z
	.enum(['0', '1', 'true', 'false', 'on', 'off', 'ON', 'OFF', 'TRUE', 'FALSE'])
	.catch('false')
	.transform(
		(value) =>
			value == 'true' || value == '1' || value === 'TRUE' || value === 'on' || value === 'ON'
	);
