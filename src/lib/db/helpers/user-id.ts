import type { ReferenceConfig } from 'drizzle-orm/mysql-core';
import { varchar } from 'drizzle-orm/pg-core';
import { users } from '../schema/auth';

/**
 * Streamline type for users' id.
 *
 * @see https://lucia-auth.com/basics/users
 */
export function userid<N extends string>(name: N) {
	return varchar(name, { length: 15 });
}

/**
 * Streamline foreign key ref for users' id.
 *
 * @warning The reference config for actions is set by default to cascade on delete and on update. Use carefully or remember to customize the actions config.
 * @see {@link userid}
 */
export function useridfk<N extends string>(
	name: N,
	config: ReferenceConfig['actions'] = { onDelete: 'cascade', onUpdate: 'cascade' }
) {
	return userid(name).references(() => users.id, config);
}
