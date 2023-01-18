import type { Arrify } from '$types/utils';
import type { ValueOf } from 'ts-essentials';
import { browserDb } from './database';
import type { STORAGE_BUCKETS } from './enums';

/**
 * CAD currency formatter.
 */
export const cadformatter = new Intl.NumberFormat('fr-CA', {
	style: 'currency',
	currency: 'CAD',
	currencyDisplay: 'narrowSymbol',
	maximumFractionDigits: 0,
});

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

/**
 * Counter-part to pgarr, useful to parse array strings from postgrest responses into actual js
 * arrays.
 */
export function jsarr<T extends `(${string})`>(pgarr: T): string[] {
	return pgarr.slice(1, -1).split(',');
}

/**
 * Make a value always an array, i.e. wrap non-array inputs in an array.
 */
export function alwaysarr<T>(arr: T): Arrify<T> {
	if (arr === undefined || arr === null) return <Arrify<T>>[];
	return Array.isArray(arr) ? <Arrify<T>>arr : <Arrify<T>>[arr];
}

export function csshsl(pghsl: string) {
	let comma = 0;
	return `hsl${pghsl
		.replace(/,/g, (substr) => {
			return ++comma === 2 ? '%,' : substr;
		})
		.replace(')', '%)')}`;
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
