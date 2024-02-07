import { InferInsertModel } from 'drizzle-orm';
import { exit } from 'process';
import { AvailableLanguageTag, availableLanguageTags } from '../src/i18n/runtime';
import { USER_ROLES, USER_ROLES_ARR } from '../src/lib/auth/constants';
import { userRoles, userRolesTranslations } from '../src/lib/db/schema/accounts';
import { langs } from '../src/lib/db/schema/i18n';
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
import { LANG_DETAILS } from '../src/lib/i18n/constants';
import { createDrizzle } from './common';

const db = createDrizzle();
const seeded: unknown[] = [];

console.info('🥕 Seeding database with base data...');
try {
	await db.transaction(async (tx) => {
		// Seed locales
		seeded.push(
			await tx
				.insert(langs)
				.values(
					availableLanguageTags.map((lang) => ({ lang: lang, name: LANG_DETAILS[lang].name }))
				)
				.onConflictDoNothing()
				.returning()
		);

		// Seed user USER_ROLES
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
						lang: 'fr',
						name: 'Visiteur',
						description: 'Rôle de base pour tout utilisateur avec un compte.',
					},
					{
						role: USER_ROLES.VISITOR,
						lang: 'en',
						name: 'Visitor',
						description: 'Default role for every registered user.',
					},
					{
						role: USER_ROLES.EDITOR,
						lang: 'fr',
						name: 'Éditeur',
						description:
							'Collaborateur ayant les droits de base pour la gestion et la publication de contenu.',
					},
					{
						role: USER_ROLES.EDITOR,
						lang: 'en',
						name: 'Editor',
						description: '',
					},
					{
						role: USER_ROLES.ADMIN,
						lang: 'fr',
						name: 'Administrateur',
						description:
							'Administrateur avec accès et permissions permettant de gérer les droits des éditeurs et visiteurs.',
					},
					{
						role: USER_ROLES.ADMIN,
						lang: 'en',
						name: 'Administrator',
						description: '',
					},
				])
				.onConflictDoNothing()
		);

		// Seed project types
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
		] satisfies Record<
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectTypesTranslations>, 'lang' | 'id'>
		>[];
		const pt = await tx
			.insert(projectTypes)
			.values(pt_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			pt,
			await tx
				.insert(projectTypesTranslations)
				.values(
					pt_t.flatMap((v, i) =>
						availableLanguageTags.map((lang) => ({
							...v[lang],
							lang,
							id: pt[i].id,
						}))
					)
				)
				.onConflictDoNothing()
				.returning()
		);

		// Seed project intervention and categories
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
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectInterventionCategoriesTranslations>, 'lang' | 'id'>
		>[];
		const pic = await tx
			.insert(projectInterventionCategories)
			.values(pic_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			pic,
			await tx.insert(projectInterventionCategoriesTranslations).values(
				pic_t.flatMap((v, i) =>
					availableLanguageTags.map((lang) => ({
						...v[lang],
						lang,
						id: pic[i].id,
					}))
				)
			)
		);

		// Seed site ownerships
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
		] satisfies Record<
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectSiteOwnershipsTranslations>, 'lang' | 'id'>
		>[];
		const pso = await tx
			.insert(projectSiteOwnerships)
			.values(pso_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			pso,
			await tx.insert(projectSiteOwnershipsTranslations).values(
				pso_t.flatMap((v, i) =>
					availableLanguageTags.map((lang) => ({
						...v[lang],
						lang,
						id: pso[i].id,
					}))
				)
			)
		);

		// Seed project implantation types
		const pim_t = [
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
		] satisfies Record<
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectImplantationTypesTranslations>, 'lang' | 'id'>
		>[];
		const pim = await tx
			.insert(projectImplantationTypes)
			.values(pim_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			pim,
			await tx.insert(projectImplantationTypesTranslations).values(
				pim_t.flatMap((v, i) =>
					availableLanguageTags.map((lang) => ({
						...v[lang],
						lang,
						id: pim[i].id,
					}))
				)
			)
		);

		// Seed project exemplarity categories
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
		] satisfies Record<
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectExemplarityCategoriesTranslations>, 'lang' | 'id'>
		>[];
		const pec = await tx
			.insert(projectExemplarityCategories)
			.values(pec_t.map((v, index) => ({ index })))
			.returning();
		seeded.push(
			pec,
			await tx.insert(projectExemplarityCategoriesTranslations).values(
				pec_t.flatMap((v, i) =>
					availableLanguageTags.map((lang) => ({
						...v[lang],
						lang,
						id: pec[i].id,
					}))
				)
			)
		);

		// Seed project exemplarity indicators

		// Seed project image types
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
		] satisfies Record<
			AvailableLanguageTag,
			Omit<InferInsertModel<typeof projectImageTypesTranslations>, 'lang' | 'id'>
		>[];
		const pit = await tx.insert(projectImageTypes).values(Array(pit_t.length).fill({})).returning();
		seeded.push(
			pit,
			await tx.insert(projectImageTypesTranslations).values(
				pit_t.flatMap((v, i) =>
					availableLanguageTags.map((lang) => ({
						...v[lang],
						lang,
						id: pit[i].id,
					}))
				)
			)
		);
	});
	console.info(seeded);
	console.info('🚀 Database seeded successfully!');
} catch (error) {
	console.error(error);
	console.error('❌ Database seed failed (see error above).');
} finally {
	// Make sure to close pool.
	// await db.end()
	exit();
}
