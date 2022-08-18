import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/projects/params-lists.json', {
		method: 'GET',
	});
	console.log(res.body);
	console.log(await res.json());
	return {};
};
