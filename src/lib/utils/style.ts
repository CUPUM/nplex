import type { Join } from 'type-fest';

/**
 * Use ts to reference css variables to benefit from simple intellisense.
 */
export function createVar<N extends string>(name: N) {
	const raw = `--${name}` as const;

	function ref<F extends string[] | [string]>(...fallback: F) {
		const arr = [raw, ...fallback] as const;
		const joined = arr.join(', ') as Join<typeof arr, ', '>;
		return `var(${joined})` as const;
	}
	return {
		/**
		 * Get the raw (pre-double-dashed) variable name.
		 */
		name: raw,
		/**
		 * Get the css var function to use the variable.
		 */
		ref,
	} as const;
}
