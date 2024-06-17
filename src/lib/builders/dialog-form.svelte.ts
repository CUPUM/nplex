import { Dialog } from './dialog.svelte';

export class DialogForm extends Dialog {
	constructor(options: ConstructorParameters<typeof Dialog>[0] = {}) {
		super();
	}
}
