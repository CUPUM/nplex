/**
 * Takes desired page range, page size, and returns tuple of start and end to be used with range selector of db client.
 *
 * @param page Zero-based desired page, i.e. pagination start at index 0.
 */
export function getPagination(page: number, size: number): [number, number] {
	const start = page * size;
	const end = start + size;

	return [start, end];
}
