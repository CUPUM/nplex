/**
 * Dictionnary of component context keys used for automatically detecting certain compositions
 * or nestings like buttons being nested inside field input compoenents.
 * 
 * Parent components present these keys to children using `setContext(*key*, true)`,
 * children detect what's the closest parent context using `getContext(*key*)`.
 */
export enum Ctx {
	Field = 'input-context',
	Token = 'token-context',
	Switch = 'switch-context',
	ButtonSet = 'button-set-context',
	Button = 'button-context',
	Range = 'range-context',
	ProjectsList = 'projects-list-context',
}