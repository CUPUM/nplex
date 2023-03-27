import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const SHORT_NAME_MAX = 30;

export const orgShortNameSchema = zfd.text(
	z
		.string()
		.max(
			SHORT_NAME_MAX,
			`Le nom abbrégé de l'organisation ne peut pas dépasser ${SHORT_NAME_MAX} caractères.`
		)
		.optional()
);
