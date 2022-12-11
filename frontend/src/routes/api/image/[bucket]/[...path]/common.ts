import type { StorageBucket } from '$utils/enums';
import type sharp from 'sharp';
import type { RequestEvent } from './$types';

const ENDPOINT_BASE = '/api/image';

type ImageOptions = {
	format?: keyof sharp.FormatEnum;
	// withMetadata?: sharp.Metadata;
} & Pick<
	sharp.ResizeOptions,
	'fastShrinkOnLoad' | 'fit' | 'height' | 'width' | 'withoutEnlargement' | 'position' | 'kernel'
>;

/**
 * Compose the proper api query url to get an image with properly formatted specifications.
 */
export function img(bucket: StorageBucket, path: string, options?: ImageOptions) {
	const q = options
		? new URLSearchParams(Object.entries(options).map(([k, v]) => [k, v + ''])).toString()
		: '';
	return `${ENDPOINT_BASE}/${bucket}/${path}?${q}`;
}

/**
 * Revives the query's options with typed getters.
 */
export function options(event: RequestEvent) {
	const o = Object.assign(event.url.searchParams, {
		getOption: <K extends keyof ImageOptions>(option: K) => {
			const v = o.get(option);
			return v ? (JSON.parse(decodeURIComponent(v)) as ImageOptions[K]) : undefined;
		},
	});
	return o;
}

/**
 * Compose an array of image endpoint url's to use as a source set.
 */
export function srcset() {}
