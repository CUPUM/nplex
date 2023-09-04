import { STATUS_CODES } from '$lib/utils/constants.js';

export const POST = async (event) => {
	// ...
	throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/projects/${''}`);
};
