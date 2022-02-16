function isObject(value) {
	return value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Helper to deep merge objects and overcome `Object.assign` or `{...a, ...b}` ignoring nested objects.
 * 
 * __To avoid affecting the original `base` object, simply pass it as a destructured assignment: `{...base}`__
 * @param base Reference object used for the base values
 * @param modifications Modification objects to apply on top of the base. Modifications applied from left to right.
 * @returns Merged object of the base with the applied modifications.
 */
export function mergeObjects(base: Record<any, any>, ...modifications: Record<any, any>[]) {
	if (!modifications) {
		return base;
	}
	const modif = modifications.shift();
	if (isObject(base) && isObject(modif)) {
		for (const key in modif) {
			if (isObject(modif[key])) {
				if (!isObject(base[key])) {
					base[key] = {};
				}
				mergeObjects(base[key], modif[key]);
			}
			else {
				base[key] = modif[key];
			}
		}
	}
	return base;
}