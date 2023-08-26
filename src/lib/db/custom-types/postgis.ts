// https://github.com/drizzle-team/drizzle-orm/issues/671

import { customType } from 'drizzle-orm/pg-core';

export const geometry = customType<{ data: string }>({
	dataType(config) {
		return 'geometry';
	},
});
