import type { Handle } from '@sveltejs/kit';
import { ARRANGEMENT_DEFAULT, type Arrangement } from './constants';

const handle = (async ({ event, resolve }) => {
	function setArrangement<S extends Arrangement>(setout: S) {
		event.locals.setout = setout;
		return setout;
	}

	event.locals.setout = ARRANGEMENT_DEFAULT;
	event.locals.setArrangement = setArrangement;

	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%setout%', event.locals.setout ?? ARRANGEMENT_DEFAULT);
		},
	});

	return res;
}) satisfies Handle;

export default handle;
