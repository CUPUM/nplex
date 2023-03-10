import { queryMessage } from '$routes/MessagesOutlet.svelte';
import { STATUS_CODES } from '$utils/enums';
import { redirect } from '@sveltejs/kit';

const MESSAGE = 'Désolé, un compte est requis pour accéder à cette section de Nplex.';

export const load = async (event) => {
	const { session } = await event.parent();

	if (!session) {
		throw redirect(STATUS_CODES.TemporaryRedirect, queryMessage('/', { content: MESSAGE }));
	}
};
