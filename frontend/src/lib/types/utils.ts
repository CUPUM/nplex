import type { Writable } from 'svelte/store';

export type RecordKey = string | number | symbol;

export type AnyRecord<T = any> = Record<RecordKey, T>;

export type NonUndefinable<T> = T extends undefined ? never : T;

export type ValueOfWritable<W extends Writable<unknown>> = W extends Writable<infer T> ? T : never;

export type Many<T> = T extends null | undefined ? [] : T extends readonly unknown[] ? T : [T];

export type Single<T> = NonNullable<T extends readonly unknown[] ? T[0] : T>;

// export type DeepPartialTrue<T extends AnyRecord> = Partial<{
// 	[K in keyof T]: true | T[K] extends AnyRecord ? DeepPartialTrue<T[K]> : never;
// }>;

// export type DeepSingle<T extends AnyRecord, S extends DeepPartialTrue<T>> = {
// 	[K in keyof T]: S[K] extends true
// 		? Single<T[K]>
// 		: S[K] extends DeepPartialTrue<T[K]>
// 		? DeepSingle<T[K], S[K]>
// 		: T[K];
// };

export type MaybeSingle<T> = Single<T> | null | undefined;

export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

export type KeyOfSet<S extends Set<unknown>> = S extends Set<infer K> ? K : never;

export type SvelteEasingFunction = (t: number) => number;

/**
 * Make an object with readonly props mutable.
 */
export type Mutable<T> = {
	-readonly [key in keyof T]: T[key];
};

/**
 * Union of standard HTMLInputElement type attributes excluding HTMLInputTypeAttribute's widening
 * (string & {}) literal member.
 */
export type StrictHTMLInputTypeAttribute =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';

/**
 * Typescript's native HTMLInputElement typing is too ambiguous and hardly allows more specific type
 * constriction.
 *
 * We here provide a helper type that accepts a string generic that narrows down the input element's
 * expected type attribute.
 */
export type TypedHTMLInputElement<
	T extends StrictHTMLInputTypeAttribute = Exclude<
		StrictHTMLInputTypeAttribute,
		'button' | 'submit' | 'reset'
	>
> = Omit<HTMLInputElement, 'type'> & { type: T };

/**
 * Retrieve the type of an event declared in the global namespace. Mostly used for retrieving
 * directive's custom event types.
 */
export type AppCustomEvent<
	E extends keyof A,
	T extends Element = Element,
	A extends
		| svelteHTML.HTMLAttributes<T>
		| svelteHTML.SVGAttributes<T> = svelteHTML.HTMLAttributes<T> & svelteHTML.SVGAttributes<T>
> = NonUndefinable<A[E]> extends (...args: any) => any
	? Parameters<NonUndefinable<A[E]>>[0]
	: never;

/**
 * Generate the typings for static and dynamic style props for use in $$Props declaration.
 */
export type ComponentStyleProps<
	Component extends string,
	StyleProps extends {
		static?: StylePropsRecord;
		dynamic?: StylePropsRecord;
		conditions?: 'hover' | 'active' | 'checked' | 'current' | 'focused';
	}
> = {
	[StaticProp in keyof StyleProps['static'] &
		string as `--${Component}-${StaticProp}`]?: StyleProps['static'][StaticProp];
} & {
	[DynamicProp in keyof StyleProps['dynamic'] &
		string as `--${Component}-${DynamicProp}`]?: StyleProps['dynamic'][DynamicProp];
} & (StyleProps['conditions'] extends string
		? {
				[DynamicProp in keyof StyleProps['dynamic'] &
					string as `--${Component}-${StyleProps['conditions']}-${DynamicProp}`]?: StyleProps['dynamic'][DynamicProp];
		  }
		: {});
type StylePropsRecord = Record<string | number, string | number>;
