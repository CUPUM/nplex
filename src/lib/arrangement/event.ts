import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { Arrangement } from './constants';

export function createSetEventArrangement(event: ServerLoadEvent | RequestEvent) {
	function setEventArrangement<S extends Arrangement>(setout: S) {
		event.locals.setout = setout;
		return setout;
	}
	return setEventArrangement;
}
