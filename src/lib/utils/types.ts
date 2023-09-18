/**
 * Narrow a LiteralUnion to a strick union of string literals.
 *
 * @see https://stackoverflow.com/questions/75078562/is-it-possible-to-remove-a-wider-type-from-an-literal-union-in-typescript
 */
// export type ExtractLiteral<T> = T extends infer U
// 	? U extends string
// 		? string extends U
// 			? never
// 			: U
// 		: never
// 	: never;
export type ExtractLiteral<T> = T extends `${infer L}` ? L : never;

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
