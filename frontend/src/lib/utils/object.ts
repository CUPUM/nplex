/**
 * Check if value is an object.
 */
export function isObject<T>(value: T): value is Record<keyof T, any> {
	return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Utility function expecting an object and returning a recursively formatted version of the object.
 */
export function walk<O extends object>(source: O, format: Walker<O>): any {
	const formatted = Object.entries(source).map(([k, v]) => {
		if (isObject(v)) {
			return [k, walk({ ...v }, format)];
		}
		return format(k, v);
	});
	return Object.fromEntries(formatted);
}
type Walker<O extends object> = (k: unknown, v: unknown) => [unknown, unknown];

// /**
//  * Helper to deep merge objects and overcome `Object.assign` or `{...a, ...b}` ignoring nested objects. **To avoid
//  * affecting the original `base` object, simply pass it as a destructured assignment: `{...base}`**
//  *
//  * @param base Reference object used for the base values.
//  * @param modifications Modification objects to apply on top of the base. Modifications applied from left to right.
//  * @returns Merged object of the base with the applied modifications.
//  */
// export function mergeObjects<T>(base: Record<keyof T, any>, ...modifications: Record<any, any>[]) {
// 	if (!modifications) {
// 		return base;
// 	}
// 	const modif = modifications.shift();
// 	if (isObject(base) && isObject(modif)) {
// 		for (const key in modif) {
// 			if (isObject(modif[key])) {
// 				if (!isObject(base[key])) {
// 					base[key] = {};
// 				}
// 				mergeObjects(base[key], modif[key]);
// 			} else {
// 				base[key] = modif[key];
// 			}
// 		}
// 	}
// 	return base;
// }

/**
 * Remove keys with values equal to null, '', or undefined.
 *
 * @param obj Object to be cleaned.
 * @returns Object stripped of keys with empty values.
 */
export function removeEmptyProps<T extends Record<keyof T, any>>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([k, v]) => v !== null || v !== '' || v !== undefined)
			.map(([k, v]) => [k, typeof v === 'object' ? removeEmptyProps(v as Record<string | number, unknown>) : v])
	) as Partial<T>;
}
