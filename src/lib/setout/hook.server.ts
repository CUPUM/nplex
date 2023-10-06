import type { Handle } from '@sveltejs/kit';
import { SETOUT_DEFAULT, type Setout } from './constants';

const handle = (async ({ event, resolve }) => {
	function setSetout<S extends Setout>(setout: S) {
		event.locals.setout = setout;
		return setout;
	}

	event.locals.setout = SETOUT_DEFAULT;
	event.locals.setSetout = setSetout;

	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%setout%', event.locals.setout);
		},
	});

	return res;
}) satisfies Handle;

export default handle;
