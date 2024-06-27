import { STATUS_CODES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityMarkers,
	projectExemplarityMarkersTranslations,
	projects,
	projectsExemplarityMarkers,
	projectsImages,
	projectsImagesTranslations,
	projectsTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { and, eq, exists } from 'drizzle-orm';
import { coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAggBuildObject } from 'drizzle-orm-helpers/pg';

export const load = async (event) => {
	const [project] = await joinTranslation(
		db
			.select({
				...getColumns(projectsTranslations),
				...getColumns(projects),
				bannerStorageName: projectsImages.storageName,
			})
			.from(projects)
			.where(eq(projects.id, event.params.projectId))
			.leftJoin(projectsImages, eq(projects.bannerId, projectsImages.id))
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id),
		event
	);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND);
	}
	const gallery = joinTranslation(
		db
			.select({
				...getColumns(projectsImagesTranslations),
				...getColumns(projectsImages),
			})
			.from(projectsImages)
			.where(eq(projectsImages.projectId, event.params.projectId))
			.$dynamic(),
		projectsImagesTranslations,
		eq(projectsImages.id, projectsImagesTranslations.id),
		event
	);
	const exemplarityCategories = db.$with('exemplarity_categories').as(
		joinTranslation(
			db
				.select({
					...getColumns(projectExemplarityCategoriesTranslations),
					...getColumns(projectExemplarityCategories),
				})
				.from(projectExemplarityCategories)
				.$dynamic(),
			projectExemplarityCategoriesTranslations,
			eq(projectExemplarityCategories.id, projectExemplarityCategoriesTranslations.id),
			event
		)
	);
	const markersByCategories = joinTranslation(
		db
			.with(exemplarityCategories)
			.select({
				...getColumns(exemplarityCategories),
				markers: coalesce(
					jsonAggBuildObject({
						...getColumns(projectExemplarityMarkersTranslations),
						...getColumns(projectExemplarityMarkers),
					}),
					$emptyJsonArray
				),
			})
			.from(exemplarityCategories)
			.leftJoin(
				projectExemplarityMarkers,
				eq(exemplarityCategories.id, projectExemplarityMarkers.categoryId)
			)
			.where(
				exists(
					db
						.select()
						.from(projectsExemplarityMarkers)
						.where(
							and(
								eq(projectsExemplarityMarkers.projectId, event.params.projectId),
								eq(projectsExemplarityMarkers.markerId, projectExemplarityMarkers.id)
							)
						)
				)
			)
			.groupBy(...Object.values(getColumns(exemplarityCategories)))
			.$dynamic(),
		projectExemplarityMarkersTranslations,
		eq(projectExemplarityMarkers.id, projectExemplarityMarkersTranslations.id),
		event
	);
	return {
		project,
		gallery,
		markersByCategories,
	};
};
