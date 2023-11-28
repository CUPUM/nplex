import { dbpool } from '$lib/db/db.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const descriptors = await dbpool.transaction(async (tx) => {
		const types = await tx
			.select({
				...getTableColumns(organizationTypes),
				...getTableColumns(organizationTypesTranslations),
			})
			.from(organizationTypes)
			.leftJoin(
				organizationTypesTranslations,
				and(
					eq(organizationTypes.id, organizationTypesTranslations.id),
					eq(organizationTypesTranslations.lang, event.locals.locale)
				)
			);
		return {
			types,
		};
	});
	return {
		descriptors,
	};
};
