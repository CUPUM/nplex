import type { Handle } from '@sveltejs/kit';

/**
 * Handle hook step to manage event locals, cookies, html lang attribute, ...
 */
export const handlei18n = (async (req) => {
	console.log('i18n handler');
	const locale = 'fr';
	// Set html lang attribute

	return req.resolve(req.event, {
		transformPageChunk(input) {
			input.html.replace('%lang%');
		},
	});
}) satisfies Handle;

export default handlei18n;
