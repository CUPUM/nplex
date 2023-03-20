import { setAuthCookie } from '$routes/api/auth/common';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

/**
 * Posted signin from tokens detected in client url.
 */
export const POST = async (event) => {
	const body = await event.request.json();
	console.log(body);
	const tokens = z
		.object({
			access_token: z.string(),
			refresh_token: z.string(),
		})
		.safeParse(body);
	const signin = await event.locals.db.auth.setSession(body);
	if (signin.error || !signin.data.session) {
		throw error(STATUS_CODES.BadRequest, {
			message: "Les jetons d'identification utilisés ne sont pas valides.",
		});
	}
	setAuthCookie(event, signin.data.session);
	return new Response(null, {
		status: 200,
		statusText: 'Connecté avec succès en utilisant les jetons.',
	});
};
