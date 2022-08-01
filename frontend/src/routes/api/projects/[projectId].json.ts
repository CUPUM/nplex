// import type { RequestHandler } from '.svelte-kit/types/src/routes/api/projects/__types/[projectId].json';
import type { RequestHandler } from './__types/[projectId].json';

/**
 * Endpoint to handle client request for a single project by its id.
 *
 * @returns Redirect if the supabase query returns empty or with error, else return project data.
 */
export const GET: RequestHandler = ({ params }) => {
	return {};
};
