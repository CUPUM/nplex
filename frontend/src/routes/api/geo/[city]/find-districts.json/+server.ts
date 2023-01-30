import type { RequestHandler } from './$types';

export const GET = (async (event) => {
	const districts = await event.fetch(`/api/geo/${event.params.city}/districts.json`);
	if (!districts.ok) {
		return districts;
	}
	return districts;
}) satisfies RequestHandler;
