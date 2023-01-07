/**
 * Check if value is an object.
 */
export function isObject<T>(value: T): value is Record<any, any> {
	return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Translates a form data into an object with JSON.parse'd properties.
 */
export function objectFromFormData<T extends {} = any>(formData: FormData) {
	return Object.fromEntries(
		[...formData.entries()].map(([k, v]) => [k, typeof v === 'string' ? JSON.parse(v) : v])
	) as T;
}

/**
 * Utility function expecting an object and returning an array of flattened keys and their path-end
 * value.
 */
export function flatten(source: Record<string | number, any>): Flattened {
	return Object.entries(source).reduce<Flattened>((acc, [k, v]) => {
		if (isObject(v)) {
			return [
				...acc,
				...flatten(v).map(([k1, v1]) => {
					return [[k, ...k1], v1] as Flattened[number];
				}),
			];
		}
		return [...acc, [[k], v]];
	}, []);
}
type Flattened = [keys: string[], value: string | number][];

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
			.map(([k, v]) => [
				k,
				typeof v === 'object' ? removeEmptyProps(v as Record<string | number, unknown>) : v,
			])
	) as Partial<T>;
}
