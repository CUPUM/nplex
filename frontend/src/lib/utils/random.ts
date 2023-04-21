/**
 * Quickly generate a random identifier. Useful where objects or symbols won't cut it (ex.: when
 * HTML attribute compatibility is required).
 */
export function unsafeUid(length: number = 8) {
	const arr = new Uint32Array(length);
	const unsafeRand = [...crypto.getRandomValues(arr)];
	return unsafeRand
		.map((n) => n.toString(16).padStart(8, '0'))
		.join('')
		.slice(0, length);
}

/**
 * (Simple Fischer-Yates shuffle?)
 */
export function shuffleItems<T>(array: T[]) {
	// let oldElement;
	// for (let i = array.length - 1; i > 0; i--) {
	// 	let rand = Math.floor(Math.random() * (i + 1));
	// 	oldElement = array[i];
	// 	array[i] = array[rand];
	// 	array[rand] = oldElement;
	// }
	// return array;
}

function sampleItem<T>(array: T[]) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

/**
 * Easily get random n items from a given array.
 */
export function sampleItems<T, N extends number>(
	array: T[],
	n: N,
	{
		duplicates = true,
		limit = false,
	}: {
		/**
		 * Allow duplicates, i.e. randomly repeated array items.
		 */
		duplicates?: boolean;
		/**
		 * Limit output size to input array's size.
		 */
		limit?: boolean;
	}
) {
	if (!n) {
		return null;
	} else if (n === 1) {
		return sampleItem(array);
	} else {
	}
}
