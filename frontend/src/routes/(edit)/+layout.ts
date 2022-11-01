import { messages } from '$stores/messages';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		messages.dispatch({
			content: 'Désolé, un compte est nécessaire pour accéder à cette section de Nplex.',
			type: 'default',
		});
		return redirect(302, '/');
	}

	return {};
};
