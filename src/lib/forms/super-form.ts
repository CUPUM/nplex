import { superForm as _superForm } from 'sveltekit-superforms/client';

/**
 * Extend superform's client-side function by additioanlly returning actions to handle loading state
 * on elements in relation to the form's submitter and the submitted form action.
 */
export function superForm() {
	return _superForm();
}
