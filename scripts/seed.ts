import { InferInsertModel } from 'drizzle-orm';
import { exit } from 'process';
import { USER_ROLES, USER_ROLES_ARR } from '../src/lib/auth/constants';
import { userRoles, userRolesTranslations } from '../src/lib/db/schema/accounts';
import { locales } from '../src/lib/db/schema/i18n';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesTranslations,
} from '../src/lib/db/schema/public';
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
		] satisfies Record<Locale, InferInsertModel<typeof projectTypesTranslations>>[];
		const inserted = await tx
			.insert(projectTypes)
			.values(pt_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			inserted,
			await tx
				.insert(projectTypesTranslations)
				.values(
					pt_t.flatMap((v, i) =>
						LOCALES_ARR.map((locale) => ({
							...v[locale],
							locale,
							id: inserted[i].id,
						}))
					)
				)
				.onConflictDoNothing()
				.returning()
		);
	});

	// Seed project intervention and categories
	await db.transaction(async (tx) => {
		const pic_t = [
			{
				fr: {
					title: 'Travaux de fondation ou de structure',
					description: '',
				},
				en: {
					title: 'Structural or foundation work',
					description: '',
				},
			},
			{
				fr: {
					title: 'Travaux d’extérieur de bâtiment',
					description: '',
				},
				en: {
					title: 'Exterior work on building',
					description: '',
				},
			},
			{
				fr: {
					title: 'Travaux d’intérieur',
					description: '',
				},
				en: {
					title: 'Interior work',
					description: '',
				},
			},
			{
				fr: {
					title: 'Travaux de paysagement',
					description: '',
				},
				en: {
					title: 'Landscaping work',
					description: '',
				},
			},
		] satisfies Record<
			Locale,
			InferInsertModel<typeof projectInterventionCategoriesTranslations>
		>[];
		const inserted = await tx
			.insert(projectInterventionCategories)
			.values(pic_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			inserted,
			await tx.insert(projectInterventionCategoriesTranslations).values(
				pic_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed site ownerships
	await db.transaction(async (tx) => {
		const pso_t = [
			{
				fr: {
					title: 'Communauté',
					description: '',
				},
				en: {
					title: 'Community',
					description: '',
				},
			},
			{
				fr: {
					title: 'Entreprise',
					description: '',
				},
				en: {
					title: 'Business',
					description: '',
				},
			},
			{
				fr: {
					title: 'Particulier',
					description: '',
				},
				en: {
					title: 'Individual',
					description: '',
				},
			},
			{
				fr: {
					title: 'Institution publique',
					description: '',
				},
				en: {
					title: 'Public institution',
					description: '',
				},
			},
		] satisfies Record<Locale, InferInsertModel<typeof projectSiteOwnershipsTranslations>>[];
		const inserted = await tx
			.insert(projectSiteOwnerships)
			.values(pso_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			inserted,
			await tx.insert(projectSiteOwnershipsTranslations).values(
				pso_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed project implantation types
	await db.transaction(async (tx) => {
		const pit_t = [
			{
				fr: {
					title: 'Conitgüe',
					description: '',
				},
				en: {
					title: 'Adjoined',
					description: '',
				},
			},
			{
				fr: {
					title: 'Détaché',
					description: 'Bâtiment isolé.',
				},
				en: {
					title: 'Detached',
					description: '',
				},
			},
			{
				fr: {
					title: 'Semi-détaché',
					description: 'Bâtiment jumelé.',
				},
				en: {
					title: 'Semi-detached',
					description: '',
				},
			},
		] satisfies Record<Locale, InferInsertModel<typeof projectImplantationTypesTranslations>>[];
		const inserted = await tx
			.insert(projectImplantationTypes)
			.values(pit_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			await tx.insert(projectImplantationTypesTranslations).values(
				pit_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed project exemplarity categories
	await db.transaction(async (tx) => {
		const pec_t = [
			{
				fr: {
					title: 'Attractivité & valorisation culturelle',
					description: '',
				},
				en: {
					title: 'Attractivity & cultural heritage',
					description: '',
				},
			},
			{
				fr: {
					title: 'Bien-être',
					description: '',
				},
				en: {
					title: 'Well-being',
					description: '',
				},
			},
			{
				fr: {
					title: 'Innovation',
					description: '',
				},
				en: {
					title: 'Innovation',
					description: '',
				},
			},
			{
				fr: {
					title: 'Durabilité',
					description: '',
				},
				en: {
					title: 'Sustainability',
					description: '',
				},
			},
			{
				fr: {
					title: 'Optimisation économique',
					description: '',
				},
				en: {
					title: 'Financial optimisation',
					description: '',
				},
			},
			{
				fr: {
					title: 'Résilience',
					description: '',
				},
				en: {
					title: 'Resilience',
					description: '',
				},
			},
			{
				fr: {
					title: 'Équité & inclusion',
					description: '',
				},
				en: {
					title: 'Equity & inclusivity',
					description: '',
				},
			},
		] satisfies Record<Locale, InferInsertModel<typeof projectExemplarityCategoriesTranslations>>[];
		const inserted = await tx
			.insert(projectExemplarityCategories)
			.values(pec_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			await tx.insert(projectExemplarityCategoriesTranslations).values(
				pec_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed project exemplarity indicators

	// Seed project image types
	await db.transaction(async (tx) => {
		const pit_t = [
			{
				fr: {
					title: 'Photographie',
					description: '',
				},
				en: {
					title: 'Photograph',
					description: '',
				},
			},
			{
				fr: {
					title: 'Image de synthèse',
					description: '',
				},
				en: {
					title: 'Render',
					description: '',
				},
			},
			{
				fr: {
					title: 'Esquisse',
					description: '',
				},
				en: {
					title: 'Sketch',
					description: '',
				},
			},
			{
				fr: {
					title: 'Plan',
					description: '',
				},
				en: {
					title: 'Plan',
					description: '',
				},
			},
		] satisfies Record<Locale, InferInsertModel<typeof projectImageTypesTranslations>>[];
		const inserted = await tx
			.insert(projectImageTypes)
			.values(Array(pit_t.length).fill({}))
			.returning();
		seeded.push(
			await tx.insert(projectImageTypesTranslations).values(
				pit_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed project image temporalities
	await db.transaction(async (tx) => {
		const pit_t = [
			{
				fr: {
					title: 'Photographie',
					description: '',
				},
				en: {
					title: 'Photograph',
					description: '',
				},
			},
			{
				fr: {
					title: 'Image de synthèse',
					description: '',
				},
				en: {
					title: 'Render',
					description: '',
				},
			},
			{
				fr: {
					title: 'Esquisse',
					description: '',
				},
				en: {
					title: 'Sketch',
					description: '',
				},
			},
			{
				fr: {
					title: 'Plan',
					description: '',
				},
				en: {
					title: 'Plan',
					description: '',
				},
			},
		] satisfies Record<Locale, InferInsertModel<typeof projectImageTypesTranslations>>[];
		const inserted = await tx
			.insert(projectImageTypes)
			.values(Array(pit_t.length).fill({}))
			.returning();
		seeded.push(
			await tx.insert(projectImageTypesTranslations).values(
				pit_t.flatMap((v, i) =>
					LOCALES_ARR.map((locale) => ({
						...v[locale],
						locale,
						id: inserted[i].id,
					}))
				)
			)
		);
	});

	// Seed...
	console.info('🚀 Database seeded successfully!');
	console.info(seeded);
} catch (error) {
	console.error('❌ Database seed failed (see error below).');
	console.error(error);
} finally {
	// Make sure to close pool.
	// await db.end()
	exit();
}
