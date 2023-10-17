import type { ValueOf } from 'type-fest';

export const IMAGE_FILE_TYPES = {
	JPEG: 'image/jpeg',
	TIF: 'image/tiff',
	PNG: 'image/png',
	AVIF: 'image/avif',
} as const;

export type ImageFileType = ValueOf<typeof IMAGE_FILE_TYPES>;

export const IMAGE_FILE_TYPES_ARR = Object.values(IMAGE_FILE_TYPES);

export const IMAGE_SIZES = {
	THUMBNAIL: 'thb',
	SMALL: 'sm',
	MEDIUM: 'md',
	LARGE: 'lg',
} as const;

export type ImageSize = ValueOf<typeof IMAGE_SIZES>;

export const IMAGE_SIZES_DETAILS = {
	[IMAGE_SIZES.THUMBNAIL]: {
		max: 150,
		quality: 0.7,
	},
	[IMAGE_SIZES.SMALL]: {
		max: 350,
		quality: 0.8,
	},
	[IMAGE_SIZES.MEDIUM]: {
		max: 750,
		quality: 0.9,
	},
	[IMAGE_SIZES.LARGE]: {
		max: 1200,
		quality: 0.9,
	},
} as const satisfies Record<ImageSize, { max: number; quality: number }>;
