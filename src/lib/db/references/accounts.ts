import type { ReferenceConfig } from 'drizzle-orm/mysql-core';
import { USER_ID_LENGTH } from '../constants';
import { users } from '../schema/accounts';
import { nanoid } from '../schema/custom-types';
import { generateNanoid } from '../sql';

/**
 * Streamline type for users' id. Separated in own module to allow cross-schema module import
 * without causing circular dep errors.
 *
 * @see https://lucia-auth.com/basics/users
 */
export function userId<N extends string>(name: N) {
	return nanoid(name, { length: USER_ID_LENGTH });
}

/**
 * Streamline foreign key ref for auth.users(id).
 *
 * @warning The reference config for actions is set by default to cascade on delete and on update. Use carefully or remember to customize the actions config.
 * @see {@link userId}
 */
export function userIdForeignKey<N extends string>(
	name: N,
	config: ReferenceConfig['actions'] = { onDelete: 'cascade', onUpdate: 'cascade' }
) {
	return userId(name).references(() => users.id, config);
}

export function generateUserId() {
	return generateNanoid({ length: USER_ID_LENGTH });
}
