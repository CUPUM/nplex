interface FormatInputOptions {
	pattern?: RegExp;
	delimiters?: string | string[];
}

export function formatInput(element: HTMLInputElement, options: FormatInputOptions) {}

/* Presets */

export const emailFormatOptions = {
	pattern: '',
	delimiters: '',
};
