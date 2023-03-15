import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	console.log(event);
	return json(Math.round(Math.random() * 100));
};
