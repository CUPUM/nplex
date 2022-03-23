interface FormatInputOptions {
	pattern?: RegExp;
	delimiters?: string | string[];
}

export function formatInput(element: HTMLInputElement, {
	pattern = ,
	delimiters = ''
}: FormatInputOptions = {}) {

}

/* Presets */

export const emailFormatOptions = {
	pattern: ,
	delimiters: ,
}