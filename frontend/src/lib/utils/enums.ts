import type { ValueOf } from 'ts-essentials';

/**
 * Intl (i18n) locale strings.
 */
export const LOCALES = {
	Fr: 'fr-CA',
	En: 'en-CA',
} as const;
export type Locale = ValueOf<typeof LOCALES>;

/**
 * Component / stylistic variants.
 */
export const VARIANTS = {
	Default: 'default',
	CallToAction: 'cta',
	Outlined: 'outlined',
	Dashed: 'dashed',
	Ghost: 'ghost',
	Feature: 'feature',
} as const;
export type Variant = ValueOf<typeof VARIANTS>;

/**
 * Granular component / stylistic semantic feedback states. These states should not be used to style
 * components in their default appearance, they should only be used to communicate feedback.
 */
export const STATES = {
	Normal: '',
	Warning: 'warning',
	Success: 'success',
	Error: 'error',
} as const;
export type State = ValueOf<typeof STATES>;

/**
 * Orientations useful for component stylings. For easier customization, provide css helper classes
 * with the appropriate `writing-mode` propertie.
 */
export const ORIENTATIONS = {
	Row: 'row',
	Column: 'column',
} as const;
export type Orientation = ValueOf<typeof ORIENTATIONS>;

/**
 * Direction, use in complementarity with orientations. For styling purposes, typically refers to
 * the `direction` property (ltr, rtl);
 */
export const DIRECTIONS = {
	Normal: 'normal',
	Reverse: 'reverse',
} as const;
export type Direction = ValueOf<typeof DIRECTIONS>;

/**
 * Element positionings.
 */
export const POSITIONINGS = {
	Top: 'top',
	Right: 'right',
	Bottom: 'bottom',
	Left: 'left',
	BlockStart: 'blockstart',
	BlockEnd: 'bloackend',
	InlineStart: 'inlinestart',
	InlineEnd: 'inlinend',
} as const;
export type Positioning = ValueOf<typeof POSITIONINGS>;

/**
 * Element alignments, complementary to positionings.
 */
export const ALIGNMENTS = {
	Start: 'start',
	Center: 'center',
	End: 'end',
	Stretch: 'stretch',
} as const;
export type Position = ValueOf<typeof ALIGNMENTS>;

/**
 * MapboxDraw event names. Based on Record<string, MapboxDraw.DrawEventType>
 */
export const MAP_DRAW_EVENTS = {
	Create: 'draw.create',
	Delete: 'draw.delete',
	Update: 'draw.update',
	Render: 'draw.render',
	Combine: 'draw.combine',
	Uncombine: 'draw.uncombine',
	ModeChange: 'draw.modechange',
	Actionable: 'draw.actionable',
	SelectionChange: 'draw.selectionchange',
	// Custom events for MapDraw component lifecycle
	Init: 'mapdraw.init',
	Destroy: 'mapdraw.destroy',
} as const;

/**
 * Keys (string names) of mapbox draw modes including custom modes.
 */
export const MAP_DRAW_MODES = {
	Static: 'static',
	DrawLineString: 'draw_line_string',
	DrawPolygon: 'draw_polygon',
	DrawPoint: 'draw_point',
	DirectSelect: 'direct_select',
	SimpleSelect: 'simple_select',
	// DrawPoints: 'draw_points',
	DrawCircle: 'draw_circle',
} as const;
export type MapDrawMode = ValueOf<typeof MAP_DRAW_MODES>;

export const MAP_DRAW_CLASSES = {
	CONTROL_BASE: 'mapboxgl-ctrl',
	CONTROL_PREFIX: 'mapboxgl-ctrl-',
	CONTROL_BUTTON: 'mapbox-gl-draw_ctrl-draw-btn',
	CONTROL_BUTTON_LINE: 'mapbox-gl-draw_line',
	CONTROL_BUTTON_POLYGON: 'mapbox-gl-draw_polygon',
	CONTROL_BUTTON_POINT: 'mapbox-gl-draw_point',
	CONTROL_BUTTON_TRASH: 'mapbox-gl-draw_trash',
	CONTROL_BUTTON_COMBINE_FEATURES: 'mapbox-gl-draw_combine',
	CONTROL_BUTTON_UNCOMBINE_FEATURES: 'mapbox-gl-draw_uncombine',
	CONTROL_GROUP: 'mapboxgl-ctrl-group',
	ATTRIBUTION: 'mapboxgl-ctrl-attrib',
	ACTIVE_BUTTON: 'active',
	BOX_SELECT: 'mapbox-gl-draw_boxselect',
} as const;

export const MAP_DRAW_SOURCES = {
	Hot: 'mapbox-gl-draw-hot',
	Cold: 'mapbox-gl-draw-cold',
} as const;

export const MAP_DRAW_TYPES = {
	Polygon: 'polygon',
	Line: 'line_string',
	Point: 'point',
} as const;

export const MAP_DRAW_UPDATE_ACTIONS = {
	Move: 'move',
	ChangeCoordinates: 'change_coordinates',
} as const;

export const MAP_DRAW_META_PROPERTY = {
	Feature: 'feature',
	Midpoint: 'midpoint',
	Vertex: 'vertex',
} as const;

export const MAP_DRAW_ACTIVE_STATES = {
	Active: 'true',
	Inactive: 'false',
} as const;

export const MAP_DRAW_INTERACTIONS = {
	ScrollZoom: 'scrollZoom',
	BoxZoom: 'boxZoom',
	DragRotate: 'dragRotate',
	DragPan: 'dragPan',
	Keyboard: 'keyboard',
	DoubleClickZoom: 'doubleClickZoom',
	TouchZoomRotate: 'touchZoomRotate',
};

export const GEOJSON_TYPES = {
	Feature: 'Feature',
	FeatureCollection: 'FeatureCollection',
} as const;
export type GeoJSONType = ValueOf<typeof GEOJSON_TYPES>;

export const GEOJSON_GEOMETRY_TYPE = {
	Point: 'Point',
	MultiPoint: 'MultiPoint',
	LineString: 'LineString',
	MultiLineString: 'MultiLineString',
	Polygon: 'Polygon',
	MultiPolygon: 'MultiPolygon',
	GeometryCollection: 'GeometryCollection',
} as const satisfies Record<GeoJSON.GeoJsonGeometryTypes, GeoJSON.GeoJsonGeometryTypes>;
export type GeoJSONGeometryType = ValueOf<typeof GEOJSON_GEOMETRY_TYPE>;

/**
 * Common coordinate projection systems and their Spatial Reference System ID.
 */
export const SRID = {
	/**
	 * Lat/Lon globe-based coordinate system. Uses degrees to represent spheroid position.
	 */
	WGS84: 4326,
	/**
	 * Lat/Lon flat-map coordinates in meters. Generally the default system used for web apps.
	 */
	WebMercator: 3857,
} as const;
export type SRID = ValueOf<typeof SRID>;

export const BRACKETS = {
	curly: {
		start: '{',
		end: '}',
	},
	square: {
		start: '[',
		end: ']',
	},
	parenthesis: {
		start: '(',
		end: ')',
	},
} as const satisfies Record<string, { start: string; end: string }>;

export const KEY = {
	Undefined: 'Undefined',
	Space: ' ',
	Alt: 'Alt',
	AltGraph: 'AltGraph',
	CapsLock: 'CapsLock',
	Control: 'Control',
	Fn: 'Fn',
	FnLock: 'FnLock',
	Hyper: 'Hyper',
	Meta: 'Meta',
	NumLock: 'NumLock',
	ScrollLock: 'ScrollLock',
	Shift: 'Shift',
	Super: 'Super',
	Symbol: 'Symbol',
	SymbolLock: 'SymbolLock',
	Enter: 'Enter',
	Tab: 'Tab',
	ArrowUp: 'ArrowUp',
	ArrowRight: 'ArrowRight',
	ArrowDown: 'ArrowDown',
	ArrowLeft: 'ArrowLeft',
	End: 'End',
	Home: 'Home',
	PageUp: 'PageUp',
	PageDown: 'PageDown',
	Backspace: 'Backspace',
	Clear: 'Clear',
	Copy: 'Copy',
	CrSel: 'CrSel',
	Cut: 'Cut',
	Delete: 'Delete',
	EraseEof: 'EraseEof',
	ExSel: 'ExSel',
	Insert: 'Insert',
	Paste: 'Paste',
	Redo: 'Redo',
	Undo: 'Undo',
	Cancel: 'Cancel',
	ContextMenu: 'ContextMenu',
	Escape: 'Escape',
	Execute: 'Execute',
	Find: 'Find',
	Help: 'Help',
	Finish: 'Finish',
	Pause: 'Pause',
	Play: 'Play',
	Select: 'Select',
	ZoomIn: 'ZoomIn',
	ZoomOut: 'ZoomOut',
} as const;

/**
 * The main exploration categories.
 */
export const CATEGORIES = {
	Projects: 'projects',
	Organisations: 'organisations',
	Actors: 'actors',
} as const;

export type Category = ValueOf<typeof CATEGORIES>;

export const CATEGORY_TITLES = {
	[CATEGORIES.Projects]: {
		singular: 'Projet',
		plural: 'Projets',
	},
	[CATEGORIES.Organisations]: {
		singular: 'Organisation',
		plural: 'Organisations',
	},
	[CATEGORIES.Actors]: {
		singular: 'Acteur',
		plural: 'Acteurs',
	},
} as const satisfies Record<Category, { singular: string; plural: string }>;

/**
 * Cities enum used to future-proof api designs, facilitating normalized route params and more.
 */
export const CITIES = {
	Montreal: {
		param: 'montreal',
		label: 'Montréal',
		name: 'Ville de Montréal',
	},
} as const satisfies Record<
	string,
	{
		param: Lowercase<string>;
		label: string;
		name: string;
	}
>;

/**
 * Global dictionnary of keys to help set and get a URL's search params consistently and avoid
 * naming collisions. Should include an exhaustive list of keys associated to exploration filters.
 *
 * ! ALL KEYS MUST BE URI-ENCODING-COMPLIANT !
 */
export const SEARCH_PARAMS = {
	AUTH_MODAL: 'auth',
	MESSAGE: 'message',
	REDIRECT: 'redirectTo',
	PROJECT_ID: 'projectid',
	IMAGE_ID: 'imageid',
	FILENAME: 'filename',
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
 * Supabase-js's storage api is not typed by default. This facilitates consistent use of bucket
 * names throughout the app. This constant should ALWAYS reflect the bucket names defined under the
 * db storage schema's `buckets` table.
 */
export const STORAGE_BUCKETS = {
	PROJECTS: 'projects',
	USERS: 'users',
	ORGANISATIONS: 'organisations',
	ACTORS: 'actors',
	GENERAL: 'app',
} as const;

/**
 * Level-agnostic foldernames. Make sure to keep in sync with conditions used in sql functions /
 * triggers.
 */
export const STORAGE_FOLDERS = {
	IMAGE_GALLERY: 'image-gallery',
} as const;

export type StorageBucket = ValueOf<typeof STORAGE_BUCKETS>;

export const STATUS_CODES = {
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
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
 * Dictionnary of db rest api error messages and their translated counterpart.
 */
export const DB_ERROR_MESSAGE = {
	'Invalid login credentials': 'Les identifiants utilisés ne sont pas valides.',
} as Record<string | number, string>;

export const DB_ERROR_CODE_STATUS = {} as const;

/**
 * List of CSS cursor values.
 */
export const CURSOR = {
	Add: 'add',
	Alias: 'alias',
	Auto: 'auto',
	Cell: 'cell',
	Copy: 'copy',
	Crosshair: 'crosshair',
	Default: 'default',
	Drag: 'drag',
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
