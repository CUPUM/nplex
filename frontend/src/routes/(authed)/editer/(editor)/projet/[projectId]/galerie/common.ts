import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const IMAGE_MAX_SIZE = 5e6;
export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const IMAGE_MAX_RESOLUTION = 1_600;
export const IMAGE_TITLE_MAX_LENGTH = 200;
export const IMAGE_DESCRIPTION_MAX_LENGTH = 500;

export const imageSchema = zfd.file(
	z
		.instanceof(File)
		.refine((file) => IMAGE_TYPES.includes(file.type), `Format d'image incompatible.`)
);

export const gallerySchema = zfd.repeatableOfType(
	z.object({
		id: zfd.text(),
		name: zfd.text(),
		title: zfd.text(
			z
				.string()
				.max(IMAGE_TITLE_MAX_LENGTH, "Le titre de l'image dépasse le nombre maximum de caractères.")
				.nullable()
				.default(null)
		),
		description: zfd.text(
			z
				.string()
				.max(
					IMAGE_DESCRIPTION_MAX_LENGTH,
					"La description de l'image dépasse le nombre maximum de caractères."
				)
				.nullable()
				.default(null)
		),
	})
);
