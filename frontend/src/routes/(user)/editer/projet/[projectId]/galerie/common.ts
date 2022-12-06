export const MAX_SIZE = 5e6;

export const GALLERY_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const GALLERY_INPUT_NAME = 'files';

export const GALLERY_FOLDER = 'gallery';

export const GALLERY_SRCSET = [
	{ tag: 'sm', width: 640 },
	{ tag: 'md', width: 960 },
	{ tag: 'lg', width: 1200 },
] as const;
