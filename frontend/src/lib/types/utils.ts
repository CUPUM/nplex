import type { Writable } from 'svelte/store';
import type { KeyofBase } from 'ts-essentials';

/**
 * General purpose type utils.
 *
 * Providing unexported ts helper from ts-essentials, and more.
 */

export type AnyRecord<T = any> = Record<KeyofBase, T>;

export type NonUndefinable<T> = T extends undefined ? never : T;

export type ValueOfWritable<W extends Writable<unknown>> = W extends Writable<infer T> ? T : never;

export type Arrify<T> = T extends null | undefined ? [] : T extends readonly unknown[] ? T : [T];

export type Single<T> = T extends readonly unknown[] ? T[0] : never;

export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

export type KeyOfSet<S extends Set<unknown>> = S extends Set<infer K> ? K : never;

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
	E extends keyof svelteHTML.HTMLAttributes<T>,
	T extends HTMLElement = HTMLElement
> = NonUndefinable<svelteHTML.HTMLAttributes<T>[E]> extends (...args: any) => any
	? Parameters<NonUndefinable<svelteHTML.HTMLAttributes<T>[E]>>[0]
	: never;