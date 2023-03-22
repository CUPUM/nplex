import type { Builtin } from 'ts-essentials';
import type { AnyRecord, NonUndefinable } from './utils';

// Uses unexported ts helper from ts-essentials.
// More on the subject: https://github.com/ts-essentials/ts-essentials/issues/339

export type DeepModify<T, U = true> =
	| (T extends AnyRecord
			? {
					[K in keyof T]?: undefined extends {
						[K2 in keyof T]: K2;
					}[K]
						? NonUndefinable<T[K]> extends object
							? U | DeepModify<NonUndefinable<T[K]>, Builtin>
							: U | unknown
						: T[K] extends object
						? U | DeepModify<T[K], Builtin>
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
	| (T extends Array<infer E> ? Array<DeepModify<E, Builtin>> : never)
	| (T extends Promise<infer E> ? Promise<DeepModify<E, Builtin>> : never)
	| (T extends Set<infer E> ? Set<DeepModify<E, Builtin>> : never)
	| (T extends ReadonlySet<infer E> ? ReadonlySet<DeepModify<E, Builtin>> : never)
	| (T extends WeakSet<infer E> ? WeakSet<DeepModify<E, Builtin>> : never)
	| (T extends Map<infer K, infer E> ? Map<K, DeepModify<E, Builtin>> : never)
	| (T extends ReadonlyMap<infer K, infer E> ? ReadonlyMap<K, DeepModify<E, Builtin>> : never)
	| (T extends WeakMap<infer K, infer E> ? WeakMap<K, DeepModify<E, Builtin>> : never);
