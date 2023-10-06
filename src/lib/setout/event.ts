import type { ServerLoadEvent } from '@sveltejs/kit';
import type { RequestEvent } from '../../routes/[[locale=locale]]/$types';
import type { Setout } from './constants';

export function setEventSetout(event: ServerLoadEvent | RequestEvent, setout: Setout) {
	event.locals.setout = setout;
	return setout;
}
