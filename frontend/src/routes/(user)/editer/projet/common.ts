import { z } from 'zod';
import { zfd } from 'zod-form-data';

export type ProjectTitleFailure = {
	title?: string[];
};

export const titleSchema = zfd.text(
	z
		.string()
		.trim()
		.min(1, 'Le titre du projet ne peut pas être vide.')
		.refine((s) => s.split(' ').length >= 2, {
			message: 'Le titre du projet doit être composé d’au minimum 3 mots',
		})
);
