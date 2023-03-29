import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { ORG_NAME_MAX, ORG_NAME_MIN, ORG_SHORT_NAME_MAX } from './constants';

const orgNameSchema = zfd.text(
	z
		.string()
		.min(ORG_NAME_MIN, 'Toute organisation doit avoir un nom.')
		.max(ORG_NAME_MAX, `Le nom d'une organisation ne peut pas dépasser ${ORG_NAME_MAX} caractères.`)
);

export const orgCreateSchema = zfd.formData({
	name: orgNameSchema,
});

const orgShortNameSchema = zfd.text(
	z
		.string()
		.max(
			ORG_SHORT_NAME_MAX,
			`Le nom abbrégé de l'organisation ne peut pas dépasser ${ORG_SHORT_NAME_MAX} caractères.`
		)
		.optional()
);

export const orgGeneralUpdateSchema = zfd.formData({
	name: orgNameSchema,
	short_name: orgShortNameSchema,
});
