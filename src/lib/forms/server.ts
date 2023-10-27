import type { RequestEvent } from '@sveltejs/kit';
import type { SuperValidated, UnwrapEffects, ZodValidation } from 'sveltekit-superforms';
import { superValidate as sv, type SuperValidateOptions } from 'sveltekit-superforms/server';
import type { AnyZodObject, z } from 'zod';

export function superValidate<
	T extends ZodValidation<AnyZodObject>,
	M extends App.PageData['flash'] = App.PageData['flash'],
>(
	schema: T,
	options?: SuperValidateOptions<UnwrapEffects<T>>
): Promise<SuperValidated<UnwrapEffects<T>, M>>;
export function superValidate<
	T extends ZodValidation<AnyZodObject>,
	M extends App.PageData['flash'] = App.PageData['flash'],
>(
	data:
		| RequestEvent
		| Request
		| FormData
		| URLSearchParams
		| URL
		| Partial<z.infer<UnwrapEffects<T>>>
		| null
		| undefined,
	schema: T,
	options?: SuperValidateOptions<UnwrapEffects<T>>
): Promise<SuperValidated<UnwrapEffects<T>, M>>;
export function superValidate(...args: unknown[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return sv(...(args as [any]));
}
