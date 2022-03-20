import { db } from '$utils/database';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
	const data = await request.formData();
	const email = JSON.stringify(data.get('email'));
	const password = JSON.stringify(data.get('password'));

	const { session, error } = await db.auth.signUp({email, password});

	if (error) {
		return {
			status: error.status,
			body: error.message
		}
	}

	return {
		status: 200,
		body: {
			session
		}
	}
}