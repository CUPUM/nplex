import type { RequestEvent } from '@sveltejs/kit';
import { localize } from './href';

export function eventLocalize(event: RequestEvent) {
	/**
	 * Event-locale-aware location localizer. (also known by some as
	 * LocLocLocLocLoCloCloCloCloClOAlakADa7yAIFOAIS)
	 *
	 * @see {@link localize}
	 */
	return function localized(location: Parameters<typeof localize>[0]) {
		return localize(location, event.locals.locale);
	};
}
