import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const titleSchema = zfd.text(
	z
		.string()
		.trim()
		.min(1)
		.refine((s) => s.split(' ').length >= 2, {
			message: 'Le titre du projet doit être composé d’au minimum 2 mots',
		})
);
