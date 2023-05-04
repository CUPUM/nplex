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

export function getRandomInt(max: number) {
	return Math.round(Math.random() * max);
}

/**
 * Pure Fischer-Yates shuffle.
 *
 * @returns A new shuffled array.
 * @see https://bost.ocks.org/mike/shuffle/
 */
export function shuffleItems<T>(array: T[]) {
	let shuffled = [...array];
	let m = array.length;
	let i: number;
	let current: T;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		current = array[m];
		array[m] = array[i];
		array[i] = current;
	}
	return shuffled;
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
		const l = limit ? Math.max(n, array.length) : n;
		if (duplicates) {
			return Array(l)
				.fill(null)
				.map((_) => sampleItem(array));
		}
		return shuffleItems(array).slice(0, l);
	}
}
