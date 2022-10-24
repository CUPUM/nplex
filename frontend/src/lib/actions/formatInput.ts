interface FormatInputOptions {
	pattern?: RegExp;
}

export function formatInput(element: HTMLInputElement, options: FormatInputOptions) {
	const patternAttribute = element.getAttribute('pattern');
	if (!options.pattern && patternAttribute) options.pattern = RegExp(patternAttribute);

	function format(event: InputEvent) {
		const value = (event.target as HTMLInputElement).value;

		return;
	}

	element.addEventListener('input', format);
	element.addEventListener('input', format);

	return {
		update() {},
		destroy() {},
	};
}
