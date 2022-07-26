import { Cookie } from '$utils/keys';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const res = new Response();
	console.log('Update cookie api tapped!', body);

	const userCookie = cookie.serialize(Cookie.User, JSON.stringify(body), {
		maxAge: 86400,
		httpOnly: true,
		path: '/',
		sameSite: true,
	});

	res.headers.set('set-cookie', userCookie);

	return res;
};
