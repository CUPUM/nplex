/**
 * 
 * @param obj Object to be cleaned
 * @returns Object stripped of keys with empty values
 */
export function removeEmptyKeys(obj: Record<string|number, unknown>) {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([k, v]) => v != null || v != '')
			.map(([k, v]) => [k, typeof v === 'object' ? removeEmptyKeys(v as Record<string|number, unknown>) : v])
	);
}