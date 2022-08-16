/**
 * Use this directive on form input elements to make form reset events trigger input bindings.
 *
 * Credits to @bluwy: https://github.com/sveltejs/svelte/issues/2659.
 */
export function inputOnReset(element: HTMLElement) {
	const form = ((element as any).form as HTMLFormElement) || null;
	if (!form) return;

	async function handleReset() {
		// await tick(); // Does not work, probably because directive runs outside component lifecycle?
		setTimeout(() => {
			element.dispatchEvent(new Event('input'));
			element.dispatchEvent(new Event('change'));
		}, 0);
	}

	form.addEventListener('reset', handleReset);

	return {
		destroy() {
			form.removeEventListener('reset', handleReset);
		},
	};
}
