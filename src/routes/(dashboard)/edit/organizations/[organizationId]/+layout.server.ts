import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import { organizations, organizationsTranslations } from '$lib/db/schema/public.server';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.ORGANIZATION_NAME);
	const [project] = await joinTranslation(
		db
			.select({
				name: organizationsTranslations.name,
			})
			.from(organizations)
			.where(eq(organizationsTranslations.id, event.params.organizationId))
			.limit(1)
			.$dynamic(),
		organizationsTranslations,
		eq(organizations.id, organizationsTranslations.id),
		event
	);
	return {
		id: event.params.organizationId,
		...project,
	};
};
