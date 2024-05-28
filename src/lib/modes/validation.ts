import { MODES_ARR, MODE_SETTINGS_ARR, type Mode, type ModeSetting } from './constants';

/**
 * Validate a given mode setting.
 */
export function isModeSetting(maybeModeSetting?: unknown): maybeModeSetting is ModeSetting {
	return MODE_SETTINGS_ARR.indexOf(maybeModeSetting as ModeSetting) > -1;
}

/**
 * Validate a given resolved mode.
 */
export function isMode(maybeMode?: unknown): maybeMode is Mode {
	return MODES_ARR.indexOf(maybeMode as Mode) > -1;
}
