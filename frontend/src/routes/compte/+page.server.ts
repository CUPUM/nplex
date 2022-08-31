import type { Action } from './$types';

export const post: Action = async ({ request }) => {
	const newData = await request.json();
	console.log(newData);
};
