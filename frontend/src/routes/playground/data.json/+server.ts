import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	// console.log('Handling request...');
	return json(Math.round(Math.random() * 100));
};
