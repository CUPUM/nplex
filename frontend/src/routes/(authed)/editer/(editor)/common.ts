import { derived, writable } from 'svelte/store';

export const EDITOR_FORM_ID = 'editor-form';
export const EDITOR_FORM_ACTION = 'update';

/**
 * Is a form submission currently in progress?
 */
export const editorUpdating = writable(false);

/**
 * Map of dirty fields, managed by each formgroup component.
 */
export const editorDirtyValues = writable<Record<string, boolean>>({});

/**
 * Are there currently any dirty values?
 */
export const editorDirty = derived(editorDirtyValues, ($dirty) => {
	return !!Object.values($dirty).filter((v) => v).length;
});
