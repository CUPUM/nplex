export function camelCaseToKebabCase(input: string) {
	return input
		.replace(/\B([A-Z])(?=[a-z])/g, '-$1')
		.replace(/\B([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase();
}
