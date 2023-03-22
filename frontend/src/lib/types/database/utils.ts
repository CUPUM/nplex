import type { Many, MaybeSingle, NonUndefinable, Single } from '$types/utils';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './generated';

export type AppDbClient = SupabaseClient<App.Database>;

export type PgCube = `(${number},${number},${number})`;

export type PgRange = `[${number},${number}]`;

export type MinimalSingleGeometry = Pick<
	Extract<GeoJSON.Geometry, { coordinates: NonUndefinable<unknown> }>,
	'type' | 'coordinates'
>;

/**
 * Until the postgrest / supabase client's typing system for joined data is improved, sprinkle this
 * helper to typecast a *-to-one property as the expected maybeSingle.
 *
 * ! This is purely a type-casting function and does not modify data in any way !
 *
 * For info, read on: https://github.com/supabase/postgrest-js/issues/303.
 */
export function maybeSingle<T>(entity: T) {
	return entity as T extends unknown[] ? T[0] : T;
}

export type TableName = keyof App.Database['public']['Tables'];

export type TableRow<
	T extends TableName,
	Schema extends Database = App.Database
> = Schema['public']['Tables'][T]['Row'];

export type ViewName = keyof App.Database['public']['Views'];

export type ViewRow<
	V extends ViewName,
	Schema extends Database = App.Database
> = Schema['public']['Views'][V]['Row'];

/**
 * As it stands, typescript can't do partial inference of generics :(. We are thus currying through
 * buff() to provide a common type inference site.
 */
export function fixTypes<D>(data: D) {
	type SingleD = Single<D>;
	type FilterD = Partial<{ [K in keyof SingleD]: true }>;

	function toSingle<ToSingle extends FilterD>() {
		type F = {
			[K in keyof SingleD]: K extends keyof ToSingle ? Single<SingleD[K]> : SingleD[K];
		};
		type Fixed = D extends unknown[] ? F[] : F;
		return fixTypes(data as Fixed);
	}

	function toMaybeSingle<ToMaybeSingle extends FilterD>() {
		type F = {
			[K in keyof SingleD]: K extends keyof ToMaybeSingle ? MaybeSingle<SingleD[K]> : SingleD[K];
		};
		type Fixed = D extends unknown[] ? F[] : F;
		return fixTypes(data as Fixed);
	}

	function toMany<ToMany extends FilterD>() {
		type F = {
			[K in keyof SingleD]: K extends keyof ToMany ? Many<SingleD[K]> : SingleD[K];
		};
		type Fixed = D extends unknown[] ? F[] : F;
		return fixTypes(data as Fixed);
	}

	return {
		data,
		toSingle,
		toMaybeSingle,
		toMany,
	};
}
