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
