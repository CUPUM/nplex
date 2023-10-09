import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { ZodAny } from 'zod';
import type { Key } from './constants';

export function isKey<K extends Key>(maybeKey: unknown, ...key: K[]): maybeKey is K {
	return key.indexOf(maybeKey as K) > -1;
}

/**
 * Get an event's corresponding form object without running any validation. Useful for cases where
 * form should be naively forwarded, e.g. form actions without any use of data. Thread carefully.
 */
export function superInert<E extends ServerLoadEvent | RequestEvent, S extends ZodAny>(
	event: E,
	schema: S
) {}
