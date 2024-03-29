import { MODES_ARR, type Mode } from './constants';

/**
 * Validate a given theme identifier.
 */
export function isMode(maybeMode?: unknown): maybeMode is Mode {
	return MODES_ARR.indexOf(maybeMode as Mode) > -1;
}
