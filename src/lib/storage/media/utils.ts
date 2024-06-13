function getResizeRatio(
	image: HTMLImageElement,
	max: number | { width: number; height?: number } | { width?: number; height: number }
) {
	if (typeof max === 'number') {
		return Math.min(1, max / Math.max(image.width, image.height));
	}
	const ratioWidth = max.width ? max.width / image.width : 1;
	const ratioHeight = max.height ? max.height / image.height : 1;
	return Math.min(ratioWidth, ratioHeight, 1);
}

/**
 * Client-side image transform helper.
 *
 * @default format 'webp'
 * @default quality 1
 */
export async function transformImage(
	source: File | string,
	{
		filename,
		max,
		quality = 1,
		format = 'webp',
	}: {
		/**
		 * New file's name (escluding its extension)
		 */
		filename: string;
		max: Parameters<typeof getResizeRatio>[1];
		quality?: number;
		format?: 'webp' | 'jpeg' | 'jpg';
	}
) {
	const src = source instanceof File ? URL.createObjectURL(source) : source;
	const canvas = document.createElement('canvas');
	const type = `image/${format}`;
	const ctx = canvas.getContext('2d');
	const img = new Image();
	img.src = src;
	return new Promise<{ file: File; width: number; height: number }>((res) => {
		img.onload = function () {
			const ratio = getResizeRatio(img, max);
			canvas.width = ratio * img.width;
			canvas.height = ratio * img.height;
			ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						throw new Error('No blob returned inside image onload callback of transform.');
					}
					const resized = new File([blob], `${filename}.${format}`, { type });
					if (source instanceof File) {
						URL.revokeObjectURL(src);
					}
					res({ file: resized, width: img.width, height: img.height });
				},
				type,
				quality
			);
		};
	});
}

export function isEventWithFileList<T extends Event>(
	e: T
): e is T & { target: { files: FileList } } {
	if (!e.target) {
		return false;
	}
	if (!('files' in e.target)) {
		return false;
	}
	if (!(e.target.files instanceof FileList)) {
		return false;
	}
	return true;
}
