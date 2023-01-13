import type { ValueOf } from 'ts-essentials';
import { browserDb } from './database';
import type { STORAGE_BUCKETS } from './enums';

/**
 * Translate a javascript array to a postgres compliant array string.
 *
 * @param arr The javascript array source.
 * @param text Determines if the array should be formatted as a text representation, using curly
 *   brackets instead of parentheses and wrapping each values in double-quotes.
 */
export function pgarr<T extends readonly unknown[] | unknown[]>(arr: T, text?: boolean) {
	if (text) {
		return `{${arr.map((v) => '"' + v + '"').join(',')}}`;
	}
	return `(${arr.join(',')})`;
}

export function jsarr<T extends `(${string})`>(pgarr: T): string[] {
	return pgarr.slice(1, -1).split(',');
}

/**
 * Takes desired page range, page size, and returns tuple of start and end to be used with range
 * selector of db client.
 *
 * @param page Zero-based desired page, i.e. pagination start at index 0.
 */
export function pagination(page: number, size: number): [start: number, end: number] {
	const start = page * size;
	const end = start + size;
	return [start, end];
}

/**
 * Reduce inline verbosity of getting storage assets' public URL.
 */
export function publicurl(bucket: ValueOf<typeof STORAGE_BUCKETS>, name?: string | null) {
	if (!name) {
		return '';
	}
	return browserDb.storage.from(bucket).getPublicUrl(name).data.publicUrl;
}

/**
 * Helper to format a project gallery's colors as a flat array.
 */
export function projectcolors(gallery?: ProjectGalleryItem | ProjectGalleryItem[] | null) {
	if (!gallery) {
		return '';
	}
	if (!Array.isArray(gallery)) {
		gallery = [gallery];
	}
	return gallery.reduce((acc, curr) => {
		if (curr.color_dominant_hsl) {
			acc.push('hsl' + curr.color_dominant_hsl);
		}
		if (curr.color_mean_hsl) {
			acc.push('hsl' + curr.color_mean_hsl);
		}
		return acc;
	}, [] as string[]);
}
type ProjectGalleryItem = Partial<App.DatabaseSchema['public']['Tables']['projects_images']['Row']>;
