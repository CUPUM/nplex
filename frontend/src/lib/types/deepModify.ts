import type { Builtin } from 'ts-essentials';
import type { AnyRecord, NonUndefinable } from './utils';

// Uses unexported ts helper from ts-essentials.
// More on the subject: https://github.com/ts-essentials/ts-essentials/issues/339

export type DeepModifyT<T, U = true> =
	| (T extends AnyRecord
			? {
					[K in keyof T]?: undefined extends {
						[K2 in keyof T]: K2;
					}[K]
						? NonUndefinable<T[K]> extends object
							? U | DeepModifyT<NonUndefinable<T[K]>, Builtin>
							: U | unknown
						: T[K] extends object
						? U | DeepModifyT<T[K], Builtin>
						: U | unknown;
					// Original:
					// ? NonUndefinable<T[K]> extends object
					// 	? true | DeepModify<NonUndefinable<T[K]>>
					// 	: true
					// : T[K] extends object
					// ? true | DeepModify<T[K]>
					// : true;
			  }
			: never)
	| (T extends Array<infer E> ? Array<DeepModifyT<E, Builtin>> : never)
	| (T extends Promise<infer E> ? Promise<DeepModifyT<E, Builtin>> : never)
	| (T extends Set<infer E> ? Set<DeepModifyT<E, Builtin>> : never)
	| (T extends ReadonlySet<infer E> ? ReadonlySet<DeepModifyT<E, Builtin>> : never)
	| (T extends WeakSet<infer E> ? WeakSet<DeepModifyT<E, Builtin>> : never)
	| (T extends Map<infer K, infer E> ? Map<K, DeepModifyT<E, Builtin>> : never)
	| (T extends ReadonlyMap<infer K, infer E> ? ReadonlyMap<K, DeepModifyT<E, Builtin>> : never)
	| (T extends WeakMap<infer K, infer E> ? WeakMap<K, DeepModifyT<E, Builtin>> : never);
