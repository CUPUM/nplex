import type { NonUndefinable, Single } from '$types/utils';

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

type BuffOptions = 'single' | 'maybeSingle';

/**
 * As it stands, typescript can't do partial inference of generics :(. We are thus currying through
 * buff() to provide a common type inference site.
 */
export function buff<D>(data: D) {
	type SingleD = Single<D>;
	function singularize<Buff extends Partial<{ [K in keyof SingleD]: BuffOptions }>>() {
		type TBuff = {
			[K in keyof Buff]: K extends keyof SingleD
				? Buff[K] extends 'single'
					? Single<SingleD[K]>
					: Buff[K] extends 'maybeSingle'
					? Single<SingleD[K]> | null
					: Buff[K]
				: never;
		};
		type S = Omit<SingleD, keyof Buff> & TBuff;
		return data as D extends unknown[] ? S[] : S;
	}

	return { singularize };
}
