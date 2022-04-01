import { db } from '$utils/database';
import type { UserCredentials } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
	const data = await request.formData();
	const email = JSON.stringify(data.get('email')) as UserCredentials['email'];
	const password = JSON.stringify(data.get('password')) as UserCredentials['password'];
	const provider = JSON.stringify(data.get('provider')) as UserCredentials['provider'];

	const { session, error } = await db.auth.signIn({email, password, provider});

	if (error) {
		return {
			status: error.status,
			body: error.message
		}
	}

	return {
		status: 200,
		body: {}
	}
}