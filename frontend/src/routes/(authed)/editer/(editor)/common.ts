import { writable } from 'svelte/store';

export const EDITOR_FORM_ID = 'editor-form';

export const EDITOR_FORM_ACTION = 'update';

/**
 * Map of dirty fields, managed by each formgroup component.
 */
export const editorDirty = writable<Record<string, boolean>>({});
