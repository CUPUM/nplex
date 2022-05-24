/**
 * Dictionnary of component context keys used for automatically detecting certain compositions or nestings like buttons
 * being nested inside field input compoenents or select options inside select parents.
 */
export enum Ctx {
	Field = 'input-context',
	Token = 'token-context',
	TokenSet = 'token-set-context',
	Switch = 'switch-context',
	ButtonSet = 'button-set-context',
	Button = 'button-context',
	Range = 'range-context',
	ProjectsList = 'projects-list-context',
	Select = 'select-context',
	SelectGroup = 'select-group-context',
}
