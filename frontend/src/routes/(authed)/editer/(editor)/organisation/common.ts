import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const NAME_MIN = 1;
export const NAME_MAX = 150;

export const orgNameSchema = zfd.text(
	z
		.string()
		.min(NAME_MIN, 'Toute organisation doit avoir un nom.')
		.max(NAME_MAX, `Le nom d'une organisation ne peut pas dépasser ${NAME_MAX} caractères.`)
);
