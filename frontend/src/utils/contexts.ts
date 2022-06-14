/**
 * Dictionnary of component context keys used for automatically detecting certain compositions or nestings like buttons
 * being nested inside field input compoenents or select options inside select parents.
 *
 * Every key specified here should directly refer the host component's name. The key's associated values follow a
 * `[kebab-case-key]-context` format for consistency and simplicity, but developpers shouldn't interact with these
 * directly, but rather always refer to them using `Ctx.[key]`
 */
export enum Ctx {
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
	MapSource = 'map-source-context',
	MapFeature = 'map-feature-context',
	MapLayer = 'map-layer-context',
	MapTooltip = 'map-tooltip-context',
	MapToolbar = 'map-toolbar-context',
}
