import type { Builtin, KeyofBase } from 'ts-essentials';
import type { Database } from './database';

/**
 * Until the postgrest / supabase client's typing system for joined data is improved, sprinkle this
 * helper to typecast a *-to-one property as the expected maybeSingle.
 *
 * ! This is purely a type-casting function and does not modify data whatsoever !
 *
 * For info, read on: https://github.com/supabase/postgrest-js/issues/303.
 */
export function maybeSingle<T>(entity: T) {
	return entity as T extends unknown[] ? T[0] : T;
}

export type Arrify<T> = T extends null | undefined ? [] : T extends readonly unknown[] ? T : [T];

// Uses unexported ts helper from ts-essentials.
// More on the subject: https://github.com/ts-essentials/ts-essentials/issues/339
type AnyRecord<T = any> = Record<KeyofBase, T>;
type NonUndefinable<T> = T extends undefined ? never : T;

type Db = DeepReplace<
	Database,
	{
		public: {
			Functions: {
				get_project_descriptors: {
					Returns: {
						types: (Database['public']['Tables']['project_type']['Row'] & {
							works: ({
								type_id: Database['public']['Tables']['project_type']['Row']['id'];
							} & Database['public']['Tables']['project_work']['Row'])[];
						})[];
						works: (Database['public']['Tables']['project_work']['Row'] & {
							type_ids: Database['public']['Tables']['project_type']['Row']['id'][];
						})[];
						siteOwnerships: Database['public']['Tables']['project_site_ownership']['Row'][];
						siteUsagesCategories: Database['public']['Tables']['project_site_usage_category']['Row'][];
						siteUsages: (Database['public']['Tables']['project_site_usage']['Row'] & {
							category_ids: Database['public']['Tables']['project_site_usage_site_usage_category']['Row']['category_id'][];
						})[];
						implantationModes: Database['public']['Tables']['project_implantation_mode']['Row'][];
						materialOrigins: Database['public']['Tables']['project_material_origin']['Row'][];
						materialTypes: Database['public']['Tables']['project_material_type']['Row'][];
						materialUses: Database['public']['Tables']['project_material_use']['Row'][];
						eventTypes: Database['public']['Tables']['project_event_type']['Row'][];
						exemplarityIndicatorsCategories: Database['public']['Tables']['project_exemplarity_indicator_category']['Row'][];
						exemplarityIndicators: Database['public']['Tables']['project_exemplarity_indicator']['Row'][];
					};
				};
			};
		};
	}
>;

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

export type DeepReplace<T, Replacer extends DeepModifyT<T, Builtin>> = T extends Builtin
	? T
	: T extends Map<infer KeyType, infer ValueType>
	? Replacer extends Map<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModifyT<ValueType, Builtin>
			? Map<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends ReadonlyMap<infer KeyType, infer ValueType>
	? Replacer extends ReadonlyMap<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModifyT<ValueType, Builtin>
			? ReadonlyMap<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends WeakMap<infer KeyType, infer ValueType>
	? Replacer extends WeakMap<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModifyT<ValueType, Builtin>
			? WeakMap<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends Set<infer ItemType>
	? Replacer extends Set<infer ReplacerItemType>
		? ReplacerItemType extends DeepModifyT<ItemType, Builtin>
			? Set<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends ReadonlySet<infer ItemType>
	? Replacer extends ReadonlySet<infer ReplacerItemType>
		? ReplacerItemType extends DeepModifyT<ItemType, Builtin>
			? ReadonlySet<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends WeakSet<infer ItemType>
	? Replacer extends WeakSet<infer ReplacerItemType>
		? ReplacerItemType extends DeepModifyT<ItemType, Builtin>
			? WeakSet<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends Array<infer ItemType>
	? Replacer extends Array<infer ReplacerItemType>
		? ReplacerItemType extends DeepModifyT<ItemType, Builtin>
			? Array<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends Promise<infer ItemType>
	? Replacer extends Promise<infer ReplacerItemType>
		? ReplacerItemType extends DeepModifyT<ItemType, Builtin>
			? Promise<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: Replacer extends AnyRecord
	? T extends AnyRecord
		? {
				[K in keyof T]: Replacer[K & keyof Replacer] extends true
					? T[K]
					: K extends keyof Replacer
					? Replacer[K] extends DeepModifyT<T[K], Builtin>
						? DeepReplace<T[K], Replacer[K]>
						: Replacer[K]
					: never;
		  }
		: Replacer
	: never;
