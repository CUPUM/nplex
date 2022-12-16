import type { ValueOf } from 'ts-essentials';

// Enums (app-wide and module-specific) should be UPPERCASED.
// Conversly, their corresponding union types - provided when relevant - should be PascalCased and singular.

export const CATEGORIES = {
	PROJECTS: 'projects',
	ORGANISATIONS: 'organisations',
	ACTORS: 'actors',
} as const;

export type Category = ValueOf<typeof CATEGORIES>;

/**
 * Global dictionnary of keys to help set and get a URL's search params consistently and avoid
 * naming collisions. Should include an exhaustive list of keys associated to exploration filters.
 *
 * ! ALL KEYS MUST BE URI-ENCODING-COMPLIANT !
 */
export const SEARCH_PARAMS = {
	AUTH_MODAL: 'auth',
	MESSAGE: 'message',
	REDIRECT: 'redirect',
} as const;

export type SearchParam = ValueOf<typeof SEARCH_PARAMS>;

/**
 * Global enum of local storage keys. Use wherever local storage is used to ensure no naming
 * collision emerges.
 */
export const LOCAL_STORAGE_KEYS = {
	FIRST_VISIT: 'first-visit',
	PROJECTS_FILTERS: 'projects-filters',
	PROJECTS_FILTERS_PANE: 'projects-filters-pane',
} as const;

export type LocalStorageKey = ValueOf<typeof LOCAL_STORAGE_KEYS>;

/**
 * App cookies names.
 */
export const COOKIES = {
	SESSION: 'nplex_session',
	AUTH: 'nplex_auth',
	APP_VERSION: 'nplex_version',
	THEME: 'nplex_theme',
} as const;

export type CookieName = ValueOf<typeof COOKIES>;

/**
 * Common keys used to invalidate non-app-route dependencies allowing granular invalidation/re-run
 * of load functions. Such custom keys are useful to fine-tune re-execution of load functions after
 * enhanced form submissions and handling using applyAction().
 *
 * See https://kit.svelte.dev/docs/load#input-methods-depends for more info.
 */
export const LOAD_DEPENDENCIES = {
	SESSION: 'auth:session',
	EDITOR_PROJECT: 'editor:project',
	USER_PROFILE: 'user:profile',
} as const;

/**
 * Supabase-js's storage api isnt typed by default. This facilitates consistent use of bucket names
 * throughout the app.
 */
export const STORAGE_BUCKETS = {
	PROJECTS: 'projects',
	USERS: 'users',
	ORGANISATIONS: 'organisations',
	ACTORS: 'actors',
	GENERAL: 'app',
} as const;

export type StorageBucket = ValueOf<typeof STORAGE_BUCKETS>;

export const STATUS_CODES = {
	MultipleChoices: 300,
	MovedPermanently: 301,
	MovedTemporarily: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	RequestEntityTooLarge: 413,
	RequestURITooLong: 414,
	UnsupportedMediaType: 415,
	RequestedRangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	InsufficientSpaceonResource: 419,
	MethodFailure: 420,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HTTPVersionNotSupported: 505,
	InsufficientStorage: 507,
	NetworkAuthenticationRequired: 511,
} as const;

/**
 * Dictionnary of error codes and their translated message. (Provided as object since enums do not
 * support number members.)
 */
export const ErrorCodeMessage = {
	400: 'Impossible!',
	500: '',
} as const;

/**
 * List of CSS cursor values.
 */
export const CURSOR = {
	Alias: 'alias',
	Auto: 'auto',
	Cell: 'cell',
	Copy: 'copy',
	Crosshair: 'crosshair',
	Default: 'default',
	Grab: 'grab',
	Grabbing: 'grabbing',
	Help: 'help',
	Move: 'move',
	None: 'none',
	Progress: 'progress',
	Pointer: 'pointer',
	Text: 'text',
	URL: 'URL',
	Wait: 'wait',
	Initial: 'initial',
	Inherit: 'inherit',
	ColResize: 'col-resize',
	ContextMenu: 'context-menu',
	EResize: 'e-resize',
	EWResize: 'ew-resize',
	NResize: 'n-resize',
	NEResize: 'ne-resize',
	NESWResize: 'nesw-resize',
	NSResize: 'ns-resize',
	NWResize: 'nw-resize',
	NWSEResize: 'nwse-resize',
	NoDrop: 'no-drop',
	NotAllowed: 'not-allowed',
	RowResize: 'row-resize',
	SResize: 's-resize',
	SEResize: 'se-resize',
	SWResize: 'sw-resize',
	VerticalText: 'vertical-text',
	WResize: 'w-resize',
	ZoomIn: 'zoom-in',
	ZoomOut: 'zoom-out',
} as const;

export type Cursor = ValueOf<typeof CURSOR>;

/**
 * Layer ids used internally by Mapbox-gl-draw.
 */
export const MapDrawLayerId = {
	Hot: {
		PolygonFillActive: 'gl-draw-polygon-fill-active.hot',
		PolygonFillInactive: 'gl-draw-polygon-fill-inactive.hot',
		PolygonMidpoint: 'gl-draw-polygon-midpoint.hot',
		PolygonStrokeActive: 'gl-draw-polygon-stroke-active.hot',
		PolygonStrokeInactive: 'gl-draw-polygon-stroke-inactive.hot',
		LineActive: 'gl-draw-line-active.hot',
		LineInactive: 'gl-draw-line-inactive.hot',
		VertexInactive: 'gl-draw-polygon-and-line-vertex-inactive.hot',
		VertexStrokeInactive: 'gl-draw-polygon-and-line-vertex-stroke-inactive.hot',
		PointActive: 'gl-draw-point-active.hot',
		PointInactive: 'gl-draw-point-inactive.hot',
		PointStrokeActive: 'gl-draw-point-stroke-active.hot',
		PointStrokeInactive: 'gl-draw-point-point-stroke-inactive.hot',
	},
	Cold: {
		PolygonFillActive: 'gl-draw-polygon-fill-active.cold',
		PolygonFillInactive: 'gl-draw-polygon-fill-inactive.cold',
		PolygonMidpoint: 'gl-draw-polygon-midpoint.cold',
		PolygonStrokeActive: 'gl-draw-polygon-stroke-active.cold',
		PolygonStrokeInactive: 'gl-draw-polygon-stroke-inactive.cold',
		LineActive: 'gl-draw-line-active.cold',
		LineInactive: 'gl-draw-line-inactive.cold',
		VertexInactive: 'gl-draw-polygon-and-line-vertex-inactive.cold',
		VertexStrokeInactive: 'gl-draw-polygon-and-line-vertex-stroke-inactive.cold',
		PointActive: 'gl-draw-point-active.cold',
		PointInactive: 'gl-draw-point-inactive.cold',
		PointStrokeActive: 'gl-draw-point-stroke-active.cold',
		PointStrokeInactive: 'gl-draw-point-point-stroke-inactive.cold',
		// PolygonFillStatic: 'gl-draw-polygon-fill-static.hot',
		// PolygonStrokeStatic: 'gl-draw-polygon-stroke-static.hot',
		// LineStatic: 'gl-draw-line-static.hot',
		// PointStatic: 'gl-draw-point-static.hot',
	},
} as const;
