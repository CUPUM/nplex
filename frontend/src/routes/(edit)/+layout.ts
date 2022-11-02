import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		// messages.dispatch({
		// 	content: 'Désolé, un compte est nécessaire pour accéder à cette section de Nplex.',
		// 	type: 'default',
		// });
		// return goto('/')
		throw redirect(302, '/');
	}

	return {};
};
