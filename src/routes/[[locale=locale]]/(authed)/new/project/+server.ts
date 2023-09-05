import { dbhttp } from '$lib/db/db.server.js';
import { projects } from '$lib/db/schema/projects.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { error } from '@sveltejs/kit';

export const GET = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw error(STATUS_CODES.UNAUTHORIZED);
	}
	// const [project] = await dbhttp
	// 	.insert(projects)
	// 	.values({
	// 		createdById: session.user.id,
	// 		updatedById: session.user.id,
	// 	})
	// 	.returning({ id: projects.id });
	const q = dbhttp
		.insert(projects)
		.values({
			createdById: session.user.id,
			updatedById: session.user.id,
		})
		.toSQL();
	console.log(q);
	// return new Response(null, {
	// 	status: STATUS_CODES.MOVED_TEMPORARILY,
	// 	headers: {
	// 		Location: `/edit/projects/${project.id}`,
	// 	},
	// });
	throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/'); // `/edit/projects/${project.id}`);
};
