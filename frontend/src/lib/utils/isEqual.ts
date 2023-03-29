import { isObject } from './object';

/**
 * Checks if two values are equal. Can handle primitive types as well as arrays and objects.
 */
export default function isEqual<T>(
	/**
	 * Reference value to check against.
	 */
	sample: T,
	/**
	 * Value that needs to be validated as equal or not.
	 */
	specimen: T,
	/**
	 * In case of arrays, are the array items required to be in the same order?
	 */
	strictOrder: boolean = false
): boolean {
	const err = new Error('Types of compared values do not coincide.');
	try {
		if (typeof sample != typeof specimen) {
			// Handle comparison when types differ because one of element is nullish.
			if ((sample == null && specimen == '') || (sample == '' && specimen == null)) {
				return true;
			} else if (sample == null || specimen == null) {
				return false;
			}
			throw err;
		}
		// Compare primitives (including null and undefined) with naive equality check.
		if (
			typeof sample === 'string' ||
			typeof sample === 'number' ||
			typeof sample === 'boolean' ||
			sample == null
		) {
			return specimen == sample;
		}
		// Compare arrays.
		else if (Array.isArray(sample)) {
			if (!Array.isArray(specimen)) {
				throw err;
			}
			if (sample.length !== specimen.length) {
				return false;
			}
			if (strictOrder) {
				return sample.every((sampleItem, i) => {
					return isEqual(sampleItem, specimen[i], strictOrder);
				});
			}
			const eqed = new Set();
			return sample.every((sampleItem) => {
				return specimen.some((specimenItem) => {
					const eq = isEqual(sampleItem, specimenItem, strictOrder);
					if (eq) {
						if (eqed.has(specimenItem)) {
							return false;
						}
						eqed.add(specimenItem);
					}
					return eq;
				});
			});
		}
		// Compare objects.
		else if (isObject(sample)) {
			if (!isObject(specimen)) {
				throw err;
			}
			const sampleKeys = Object.keys(sample);
			const specimenKeys = Object.keys(specimen);
			if (!isEqual(sampleKeys, specimenKeys)) {
				return false;
			}
			return sampleKeys.every((sampleKey) => {
				return isEqual((sample as any)[sampleKey], specimen[sampleKey], strictOrder);
			});
		}
	} catch (error) {
		console.error(error);
		// throw error;
		return false;
	}
	return true;
}
