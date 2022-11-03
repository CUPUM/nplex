import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();

	// const { data: projectsPreview, error: projcetsError } = await db
	// 	.from('projects')
	// 	.select(
	// 		`
	// 				*
	// 			`
	// 	)
	// 	.order('updated_at', { ascending: false })
	// 	.range(...getPagination(0, 5));
	// if (projcetsError) throw error(404, projcetsError.message);

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
