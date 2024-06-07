import { db } from '$lib/db/db.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public.server';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const descriptors = await db.transaction(async (tx) => {
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
					eq(organizationTypesTranslations.lang, event.locals.lang)
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
