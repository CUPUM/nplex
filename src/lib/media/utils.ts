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
		quality = 1,
		max,
		format = 'webp',
	}: {
		/** New file's name (escluding its extension) */
		filename: string;
		quality?: number;
		format?: 'webp' | 'jpeg' | 'jpg';
		max: Parameters<typeof getResizeRatio>[1];
	}
) {
	const src = source instanceof File ? URL.createObjectURL(source) : source;
	const canvas = document.createElement('canvas');
	const type = `image/${format}`;
	const ctx = canvas.getContext('2d');
	const img = new Image();
	img.src = src;
	return new Promise<File>((res) => {
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
					res(resized);
				},
				type,
				quality
			);
		};
	});
}
