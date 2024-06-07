export const load = async (event) => {
	// const search = event.url.searchParams.get('search');
	// const { title, summary } = getColumns(projectsTranslations);
	// const { id } = getColumns(projects);
	// event.depends(LOAD_DEPENDENCIES.LANG);
	// const filtered = db
	// 	.select({
	// 		id,
	// 		title,
	// 		summary,
	// 		bannerStorageName: projectsImages.storageName,
	// 		created: event.locals.user ? eq(projects.createdById, event.locals.user.id) : fal,
	// 	})
	// 	.from(projects)
	// 	.where(
	// 		and(
	// 			or(
	// 				// To do: should ideally be a time check, e.g. projects.publishedAt < Date.now()
	// 				isNotNull(projects.publishedAt),
	// 				event.locals.user ? isCreatedProject(event.locals.user) : undefined
	// 			),
	// 			search
	// 				? exists(
	// 						db
	// 							.select({ id: projectsTranslations.id })
	// 							.from(projectsTranslations)
	// 							.where(
	// 								and(
	// 									eq(projectsTranslations.id, projects.id),
	// 									sql`${projectsTranslations.ts} @@ plainto_tsquery(${projectsT}, ${search})`
	// 								)
	// 							)
	// 					)
	// 				: undefined
	// 		)
	// 	)
	// 	.leftJoin(
	// 		projectsTranslations,
	// 		and(
	// 			eq(projects.id, projectsTranslations.id),
	// 			eq(projectsTranslations.lang, event.locals.lang)
	// 		)
	// 	)
	// 	.leftJoin(projectsImages, eq(projectsImages.id, projects.bannerId));
	// console.log(filtered.toSQL());
	// return {
	// 	filtered: await filtered,
	// 	search,
	// };
};
