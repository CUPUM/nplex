import { exit } from 'process';
import { USER_ROLES, USER_ROLES_ARR } from '../src/lib/auth/constants';
import { locales } from '../src/lib/db/schema/i18n';
import { userRoles, userRolesTranslations } from '../src/lib/db/schema/personal';
import { projectTypes, projectTypesTranslations } from '../src/lib/db/schema/public';
import { LOCALES, LOCALES_ARR, LOCALES_DETAILS, type Locale } from '../src/lib/i18n/constants';
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
	await db.transaction(async (tx) => {
		seeded.push(
			await tx
				.insert(userRoles)
				.values(USER_ROLES_ARR.map((role) => ({ role })))
				.onConflictDoNothing()
				.returning()
		);
		seeded.push(
			await tx
				.insert(userRolesTranslations)
				.values([
					{
						role: USER_ROLES.VISITOR,
						locale: LOCALES.FRENCH,
						name: 'Visiteur',
						description: 'Rôle de base pour tout utilisateur avec un compte.',
					},
					{
						role: USER_ROLES.VISITOR,
						locale: LOCALES.ENGLISH,
						name: 'Visitor',
						description: 'Default role for every registered user.',
					},
					{
						role: USER_ROLES.EDITOR,
						locale: LOCALES.FRENCH,
						name: 'Éditeur',
						description:
							'Collaborateur ayant les droits de base pour la gestion et la publication de contenu.',
					},
					{
						role: USER_ROLES.EDITOR,
						locale: LOCALES.ENGLISH,
						name: 'Editor',
						description: '',
					},
					{
						role: USER_ROLES.ADMIN,
						locale: LOCALES.FRENCH,
						name: 'Administrateur',
						description:
							'Administrateur avec accès et permissions permettant de gérer les droits des éditeurs et visiteurs.',
					},
					{
						role: USER_ROLES.ADMIN,
						locale: LOCALES.ENGLISH,
						name: 'Administrator',
						description: '',
					},
				])
				.onConflictDoNothing()
		);
	});

	// Seed project types
	await db.transaction(async (tx) => {
		const pt_t = [
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
		seeded.push(
			await tx
				.insert(projectTypes)
				.values(pt_t.map((v, i) => ({ id: i })))
				.onConflictDoNothing()
		);
		seeded.push(
			await tx
				.insert(projectTypesTranslations)
				.values(
					pt_t.flatMap((v, i) => {
						return LOCALES_ARR.map((locale) => {
							return {
								id: i,
								locale,
								title: v[locale].title,
								description: v[locale].description,
							};
						});
					})
				)
				.onConflictDoNothing()
		);
	});

	// Seed project image types
	// await db.transaction();

	// Seed project image temporalities
	// await db.transaction();

	// Seed...
} catch (error) {
	console.error('❌ Database seed failed (see error below).');
	throw error;
} finally {
	// Make sure to close pool.
	// await db.end()
}
console.info('🚀 Database seeded successfully!');
console.info(seeded);
exit();
