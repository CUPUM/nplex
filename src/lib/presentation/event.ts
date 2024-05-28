import type { ServerLoadEvent } from '@sveltejs/kit';
import { PRESENTATION_DEFAULT, type Presentation } from './constants';

/**
 * Sets presentation mode on server event for page chunk transformation in hooks and returns data to
 * be destructured.
 */
export function setEventPresentation(event: ServerLoadEvent, presentation?: Presentation) {
	event.locals.presentation = presentation ?? PRESENTATION_DEFAULT;
	return {
		presentation,
	};
}
