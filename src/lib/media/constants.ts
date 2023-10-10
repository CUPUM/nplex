import type { ValueOf } from 'type-fest';

export const IMAGE_FILE_TYPES = {
	JPEG: 'image/jpeg',
	TIF: 'image/tiff',
	PNG: 'image/png',
	AVIF: 'image/avif',
} as const;

export type ImageFileType = ValueOf<typeof IMAGE_FILE_TYPES>;

export const IMAGE_FILE_TYPES_ARR = Object.values(IMAGE_FILE_TYPES);
