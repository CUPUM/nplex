/**
 * Take a given number and make it abide to a discrete domain based on a step size and an origin.
 * Useful for inputs where value should snap according to the step attribute's value.
 */
export function snap(
	value: number,
	step: number,
	{
		origin = 0,
		round = Math.round,
	}: { origin?: number; round?: (typeof Math)['ceil' | 'round' | 'floor'] } = {}
) {
	return round((value - origin) / step) * step + origin;
}
