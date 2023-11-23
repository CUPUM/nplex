/**
 * Spread an element's checked data-attribute based on a given state.
 */
export function checked(state: boolean | null | undefined) {
	return {
		'data-state': state ? 'checked' : 'unchecked',
	} as const;
}
