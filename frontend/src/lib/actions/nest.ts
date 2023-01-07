interface NestOptions {
	radius?: number | string;
	inset?: number | string;
}

const CTX_KEY = 'nest-context';

/**
 * Directive to implement computed inheritance of css variables, allowing calculations based on
 * parent variables. Exposes the inherited vars under the `--nest-[var name]: [value]` pattern.
 */
export default function nest(
	element: HTMLElement,
	options: NestOptions = {
		radius: '20px',
		inset: '10px',
	}
): SvelteActionReturnType {
	return {
		destroy() {},
		update() {},
	};
}
