import type { ReferenceConfig } from 'drizzle-orm/pg-core';
import { locale } from '../schema/custom-types';
import { locales } from '../schema/i18n';

/**
 * Streamline foreign key ref for i18n.locals(locale).
 *
 * @warning The reference config for actions is set by default to cascade on delete and on update. Use carefully or remember to customize the actions config.
 */
export function localeForeignKey<N extends string>(
	name: N,
	config: ReferenceConfig['actions'] = { onDelete: 'cascade', onUpdate: 'cascade' }
) {
	return locale(name).references(() => locales.locale, config);
}
