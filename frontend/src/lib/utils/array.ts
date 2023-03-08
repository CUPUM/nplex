import { mod } from './number';

/**
 * Move given item(s) to a new place in the array.
 *
 * @returns A new array, reordered.
 */
export function moveItem<T>(array: T[], currentIndex: number | number[], destinationIndex: number) {
	let items: T[];
	let currentIndices: number[];
	if (typeof currentIndex === 'number') {
		items = [array[currentIndex]];
		currentIndices = [currentIndex];
	} else {
		items = currentIndex.reduce<T[]>((acc, curr) => {
			if (array[curr]) {
				acc.push(array[curr]);
			}
			return acc;
		}, []);
		currentIndices = currentIndex;
	}
	const marker = {};
	let sorted = [...array];
	currentIndices.forEach((index) => {
		if (index >= 0 && index < array.length) {
			(sorted[index] as any) = marker;
		}
	});
	sorted = sorted.filter((item) => item !== marker);
	let to = mod(destinationIndex, sorted.length);
	sorted.splice(to, 0, ...items);
	return sorted;
}

/**
 * Offset given item(s) by a given index distance. Can take into account indices to exclude in
 * offset calculation.
 *
 * @returns A new array with items shifted accordingly.
 */
export function offsetItem<T>(
	array: T[],
	currentIndex: number | number[],
	indexOffset: number,
	skip?: number[]
) {
	const skipper = {};
	const origin = Array.isArray(currentIndex) ? currentIndex[0] : currentIndex;
	let availableIndices = array.map((_, i) => i);
	if (skip && skip.length) {
		skip.forEach((index) => {
			if (index < availableIndices.length && index >= 0 && index !== origin) {
				(availableIndices[index] as T | typeof skipper) = skipper;
			}
		});
		availableIndices = availableIndices.filter((v): v is number => v !== skipper);
	}
	const from = availableIndices.indexOf(origin);
	if (from < 0) {
		throw new Error('Could not find a valid origin index for item offset.');
	}
	const to = availableIndices[mod(from + indexOffset, availableIndices.length)];
	return moveItem(array, currentIndex, to);
}

/**
 * Exclude multiple elements from an array based on a given array of indices.
 *
 * @returns A new filtered array.
 */
export function excludeByIndex<T>(array: T[], ...exclude: number[]) {
	const filter = {};
	const filtered: (T | typeof filter)[] = [...array];
	exclude.forEach((exclude) => {
		if (exclude < filtered.length && exclude >= 0) {
			filtered[exclude] = filter;
		}
	});
	return filtered.filter((v) => v !== filter) as T[];
}
