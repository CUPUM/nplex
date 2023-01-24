import type { PageLoad } from './$types';

export const load = (async (event) => {
	// const res = await event.fetch(`/api/data/${CITIES.MONTREAL.param}/districts.json`, {
	// 	method: 'GET',
	// });
	// const data = await res.json();
	// console.log(data);
	return {};
}) satisfies PageLoad;
