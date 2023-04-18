import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.session) {
		throw error(STATUS_CODES.Unauthorized, {
			message: 'Oops. Vous devez être connecté pour accéder à cette section de Nplex.',
		});
	}

	return {
		editorBreadcrumbs: [
			{
				title: 'Éditeur',
				href: '/editer',
			},
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
