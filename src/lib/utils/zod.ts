import { z, type ZodTypeAny } from 'zod';

/**
 * Similar to zod's RecordType, but where indexed keys are required instead of optional.
 *
 * @see https://github.com/colinhacks/zod/issues/55
 */
export const strictRecord = <
	T extends Record<string, string>,
	K extends T[keyof T],
	S extends ZodTypeAny,
>(
	keysEnum: T,
	valueSchema: S | ((k: K) => S)
) => {
	const keys = Object.values(keysEnum) as K[];
	return z.object(
		keys.reduce(
			(agg, k) => ({
				...agg,
				[k]: valueSchema instanceof Function ? valueSchema(k) : valueSchema,
			}),
			{} as Record<K, S>
		)
	);
};

export const strictRecordKeys = <
	T extends Record<string, unknown>,
	K extends keyof T,
	S extends ZodTypeAny,
>(
	keysEnum: T,
	valueSchema: S
) => {
	const keys = Object.keys(keysEnum);
	return z.object(
		keys.reduce(
			(agg, k) => ({
				...agg,
				[k]: valueSchema,
			}),
			{} as Record<K, S>
		)
	);
};
