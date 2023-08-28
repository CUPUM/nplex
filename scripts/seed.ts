import { exit } from 'process';
import { USER_ROLES_ARR } from '../src/lib/auth/constants';
import { userRoles } from '../src/lib/db/schema/auth';
import { locales } from '../src/lib/db/schema/i18n';
import { projectTypes, projectTypesTranslations } from '../src/lib/db/schema/projects';
import { LOCALES_ARR, LOCALES_DETAILS, type Locale } from '../src/lib/i18n/constants';
import { createDrizzle } from './common';

const db = createDrizzle();
const seeded: unknown[] = [];

console.info('🥕 Seeding database with base data...');
try {
	// Seed locales
	const ls = await db
		.insert(locales)
		.values(LOCALES_ARR.map((locale) => ({ locale, name: LOCALES_DETAILS[locale].name })))
		.onConflictDoNothing()
		.returning();
	seeded.push(ls);

	// Seed user roles
	const rs = await db
		.insert(userRoles)
		.values(USER_ROLES_ARR.map((role) => ({ role })))
		.onConflictDoNothing()
		.returning();
	seeded.push(rs);

	// Seed project types
	const pt_seed = [
		{
			fr: {
				title: 'Nouvelle construction',
				description:
					'Cette catégorie de projet fait référence aux nouveaux projets qui ne s’appuient pas - ou s’appuient très modestement - sur une installation existante.',
			},
			en: {
				title: 'New construction',
				description: '',
			},
		},
		{
			fr: {
				title: 'Transformation',
				description:
					'Un projet de transformation consiste en une intervention sur une construction ou un aménagement existant. Cela implique des travaux de rénovation, de valorisation de restauration, etc.',
			},
			en: {
				title: 'Transformation',
				description: '',
			},
		},
		{
			fr: {
				title: 'Restauration',
				description:
					'Travaux de restaurations qui s’inscrivent dans une approche de préservation du patrimoine.',
			},
			en: {
				title: 'Restoration',
				description: '',
			},
		},
	] satisfies Record<Locale, { title: string; description: string }>[];
	const pt = await db.transaction(async (tx) => {
		await tx.insert(projectTypes).values(pt_seed.map((v, i) => ({ id: i })));
		await tx.insert(projectTypesTranslations).values(
			pt_seed.flatMap((v, i) => {
				return LOCALES_ARR.map((locale) => {
					return {
						id: i,
						locale,
						title: v[locale].title,
						description: v[locale].description,
					};
				});
			})
		);
	});
	seeded.push(pt);

	// Seed ...
} catch (error) {
	console.error('❌ Database seed failed (see error below).');
	throw error;
}
console.info('🚀 Database seeded successfully!');
console.info(seeded);
exit();
