/**
 * Dictionnary of context keys used for automatically detecting certain compositions or nestings like buttons being
 * nested inside field input compoenents or select options inside select parents.
 *
 * Every key specified here should directly refer the host component's name or the targeted styling property. The key's
 * associated values follow a `[kebab-case-key]-context` format for consistency and simplicity. Developpers shouldn't
 * interact with these directly, but rather always refer to them through the enum.
 */
export enum Ctx {
	// Component context keys
	Field = 'field-context',
	FieldMultiline = 'field-multiline-context',
	Token = 'token-context',
	TokenSet = 'token-set-context',
	Switch = 'switch-context',
	ButtonSet = 'button-set-context',
	Button = 'button-context',
	Range = 'range-context',
	Popover = 'popover-context',
	ExploreList = 'projects-list-context',
	ExploreMap = 'explore-map-context',
	Select = 'select-context',
	SelectGroup = 'select-group-context',
	Map = 'map-context',
	MapMarker = 'map-marker-context',
	MapGeoJSONSource = 'map-geojson-source-context',
	MapFeature = 'map-feature-context',
	MapLayer = 'map-layer-context',
	MapTooltip = 'map-tooltip-context',
	MapToolbar = 'map-toolbar-context',
}

/**
 * Human-readable keycodes for key-related event handling.
 */
export enum KeyCode {
	Enter = 13,
}

/**
 * Global dictionnary of keys to help set and get a URL's search params consistently and avoid naming conflicts. Should
 * include an exhaustive list of keys associated to exploration filters.
 */
export enum SearchParam {
	ProjectsCostFork = 'cout-projet',
	ProjectsType = 'type-projet',
	AuthModal = 'auth',
}

/**
 * Global enum of local storage keys. Use wherever local storage is used to ensure no naming collision emerges.
 */
export enum LocalStorage {
	FirstVisit = 'first-visit',
	NewProject = 'new-project',
	Projects = 'projects',
	ProjectsFilters = 'projects-filters',
	ProjectsFiltersExplorePane = 'projects-filters-explore-pane',
}

/**
 * App cookie names.
 */
export enum Cookie {
	DbAccessToken = 'sb-at',
	DbRefreshToken = 'sb-rt',
	DbProviderToken = 'sb-pt',
	DbAccessTokenExpiry = 'sb-ate',
	AuthChange = 'sb-s',
}

// /**
//  * HTML element attributes and related values used for consistent app-wide "dumb" cross-compoenent state sharing, for
//  * styling (ex.: popover open state).
//  *
//  * To do: define as json instead and use Sass json for callability inside style blocks?
//  */
// export const Attribute = {
// 	PopoverState: {
// 		Key: 'popover',
// 		Values: {
// 			Opened: 'opened',
// 			Closed: 'closed',
// 		},
// 	},
// } as const;

/**
 * Dictionnary of error codes and their translated message.
 *
 * Provided as object since enums do not support number members.
 */
export const ErrorCodeMessage = {
	400: 'Impossible!',
	500: '',
} as const;
