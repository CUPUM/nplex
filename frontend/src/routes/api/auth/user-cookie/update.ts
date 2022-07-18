import { Cookie } from '$utils/keys';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export interface UserCookieRequestBody {
	user: App.Session['user'];
}

export const POST: RequestHandler = async ({ request, locals }) => {
	// console.log('Update cookie api tapped!');
	const body = await request.json();
	const res = new Response();

	const userCookie = cookie.serialize(Cookie.User, JSON.stringify(body.user), {
		maxAge: 86400,
		httpOnly: true,
		path: '/',
		sameSite: true,
	});

	res.headers.set('Set-Cookie', userCookie);

	return res;
};
