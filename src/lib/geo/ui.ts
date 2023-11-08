import type { GestureOptions } from 'maplibre-gl';

export type MapLocale = Partial<{
	'AttributionControl.ToggleAttribution': string;
	'AttributionControl.MapFeedback': string;
	'FullscreenControl.Enter': string;
	'FullscreenControl.Exit': string;
	'GeolocateControl.FindMyLocation': string;
	'GeolocateControl.LocationNotAvailable': string;
	'LogoControl.Title': string;
	'Map.Title': string;
	'NavigationControl.ResetBearing': string;
	'NavigationControl.ZoomIn': string;
	'NavigationControl.ZoomOut': string;
	'TouchPanBlocker.Message': string;
	'ScrollZoomBlocker.CtrlMessage': string;
	'ScrollZoomBlocker.CmdMessage': string;
}>;

export const MAP_LOCALES = {
	french: {
		'ScrollZoomBlocker.CtrlMessage': 'Utilisez ctrl + ↕ pour zoomer',
		'ScrollZoomBlocker.CmdMessage': 'Utilisez ⌘ + ↕ pour zoomer',
	},
} as const satisfies Record<string, MapLocale>;

export const MAP_GESTURES_TEXT = {
	french: {
		windowsHelpText: 'Utilisez Ctrl + ⭥ pour zoomer.',
		macHelpText: 'Utilisez <kbd>cmd ⌘</kbd> et défilez <kbd>⭥</kbd> pour zoomer.',
		mobileHelpText: 'Utilisez deux doigts pour déplacer.',
	},
} as const satisfies Record<string, GestureOptions>;
