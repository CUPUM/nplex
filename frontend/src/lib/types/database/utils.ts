import type { NonUndefinable } from '$types/utils';

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

export type TableRow<T extends TableName> = App.Database['public']['Tables'][T]['Row'];
