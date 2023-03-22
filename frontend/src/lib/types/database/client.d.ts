/**
 * @see https://github.com/supabase/postgrest-js/issues/303
 */

// declare module '@supabase/postgrest-js' {
// 	class PostgrestFilterBuilder<Schema, Row, Result> {
// 		fixToMany<K>(): PostgrestFilterBuilder<Schema, Row, FixToMany<Result, K>>;
// 		fixToOne<K>(): PostgrestFilterBuilder<Schema, Row, FixToOne<Result, K>>;
// 		fixToMaybeOne<K>(): PostgrestFilterBuilder<Schema, Row, FixToMaybeOne<Result, K>>;
// 	}
// }

// type FixToMany<Result, K> = Result extends Array<infer T>
// 	? Array<FixToManyItem<T, K>>
// 	: Result extends infer T | null
// 	? FixToManyItem<T, K> | null
// 	: FixToManyItem<Result, K>;

// type FixToManyItem<T, Key> = Key extends keyof T
// 	? Omit<T, Key> & { [K in Key]: Extract<T[K], Array<T[K]>> }
// 	: T;

// PostgrestFilterBuilder.prototype.fixToMany = function fixToMany() {
// 	return this;
// };

// type FixToOne<Result, K> = Result extends Array<infer T>
// 	? Array<FixToOneItem<T, K>>
// 	: Result extends infer T | null
// 	? FixToOneItem<T, K> | null
// 	: FixToOneItem<Result, K>;

// type FixToOneItem<T, Key> = Key extends keyof T
// 	? Omit<T, Key> & { [K in Key]: Exclude<T[K], Array<T[K]> | null> }
// 	: T;

// PostgrestFilterBuilder.prototype.fixToOne = function fixToOne() {
// 	return this;
// };

// type FixToMaybeOne<Result, K> = Result extends Array<infer T>
// 	? Array<FixToMaybeOneItem<T, K>>
// 	: Result extends infer T | null
// 	? FixToMaybeOneItem<T, K> | null
// 	: FixToMaybeOneItem<Result, K>;

// type FixToMaybeOneItem<T, Key> = Key extends keyof T
// 	? Omit<T, Key> & { [K in Key]: Exclude<T[K], Array<T[K]>> }
// 	: T;

// PostgrestFilterBuilder.prototype.fixToMaybeOne = function fixToMaybeOne() {
// 	return this;
// };
