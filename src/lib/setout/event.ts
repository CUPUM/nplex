import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { Setout } from './constants';

export function createSetEventSetout(event: ServerLoadEvent | RequestEvent) {
	function setEventSetout<S extends Setout>(setout: S) {
		event.locals.setout = setout;
		return setout;
	}
	return setEventSetout;
}
