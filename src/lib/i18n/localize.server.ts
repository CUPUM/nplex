import type { RequestEvent } from '@sveltejs/kit';
import { localize as agnosticLocalize } from './href';

export function eventLocalize(event: RequestEvent) {
	/**
	 * Event-locale-aware location localizer. (also known by some as
	 * LocLocLocLocLoCloCloCloCloClOAlakADa7yAIFOAIS)
	 *
	 * @see {@link agnosticLocalize}
	 */
	return function localize(location: Parameters<typeof agnosticLocalize>[0]) {
		return agnosticLocalize(location, event.locals.locale);
	};
}
