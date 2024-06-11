// export function getCreatedOrganizations(user: User) {
// 	return db.select().from(organizations).where(eq(organizations.createdById, user.id));
// }

// export function getEditableOrganizations(user: User) {
// 	return db
// 		.select({
// 			...getColumns(organizations),
// 		})
// 		.from(organizations)
// 		.where(
// 			or(
// 				bool(user.role === USER_ROLES.ADMIN),
// 				eq(organizations.createdById, user.id),
// 				exists(
// 					db
// 						.select()
// 						.from(organizationsUsers)
// 						.where(
// 							and(
// 								eq(organizationsUsers.organizationId, organizations.id),
// 								eq(organizationsUsers.userId, user.id)
// 							)
// 						)
// 				)
// 			)
// 		);
// }
