import { Dialog } from './dialog.svelte';

export class DialogForm<T extends Record<string, any>> extends Dialog {
	constructor() {
		super();
	}
}
