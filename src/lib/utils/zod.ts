import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

/**
 * Similar to zod's RecordType, but where indexed keys are required instead of optional.
 *
 * @see https://github.com/colinhacks/zod/issues/55
 */
export const strictRecord = <T extends Readonly<string[]>, S extends ZodTypeAny>(
	keys: T,
	valueSchema: S | ((k: T[number]) => S)
) => {
	return z.object(
		keys.reduce(
			(agg, k) => ({
				...agg,
				[k]: valueSchema instanceof Function ? valueSchema(k) : valueSchema,
			}),
			{} as Record<T[number], S>
		)
	);
};
