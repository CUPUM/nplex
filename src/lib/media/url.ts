import { PUBLIC_IMAGES_ENDPOINT } from '$env/static/public';
import type { ResizeOptions, WebpOptions } from 'sharp';

/**
 * Compose an image request url using the media's storage name. Enables on-the-fly image
 * transformations using AWS's serverless image handler cloud formation.
 *
 * @see https://github.com/aws-solutions/serverless-image-handler/issues
 * @see https://aws.amazon.com/solutions/implementations/serverless-image-handler/
 */
export function imageSrc(
	/**
	 * Storage name of the image.
	 */
	storageName: string,
	edits: { resize?: ResizeOptions } & WebpOptions = {}
) {
	const string = JSON.stringify({ key: storageName, edits });
	const encoded = btoa(string);
	return `${PUBLIC_IMAGES_ENDPOINT}/${encoded}`;
}

/**
 * Preset for thumbnail image source url.
 */
export function thumbnailSrc(name: string) {
	return imageSrc(name, {
		resize: { withoutEnlargement: true, fit: 'inside', width: 150 },
		quality: 0.8,
	});
}
