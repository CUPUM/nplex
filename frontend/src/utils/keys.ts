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
	Field = 'input-context',
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
	// Styling context keys
	Inset = 'inset-context',
	BorderRadius = 'border-radius-context',
	Size = 'size-context',
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
	/**
	 * Params indicating if the auth modal should be open or not.
	 */
	AuthModal = 'auth',
}

export enum ProjectFilterParam {}

/**
 * Global enum of local storage keys. Use wherever local storage is used to ensure no naming collision emerges.
 */
export enum LocalStorage {
	/**
	 * Holds an array of project objects.
	 */
	Projects = 'projects',
	/**
	 * Stringified query params corresponding to the filters used for the saved projects array. Properties' key and
	 * value within this object are translated in the client's URL and should thus abide to the above SearchParams enum.
	 */
	ProjectsFilters = 'projects-filters',
}

export enum Cookie {
	User = 'nplex-user-cookie',
}
