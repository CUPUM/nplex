import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const workIdSchema = zfd.numeric(z.number().positive());

export const workSchema = zfd.formData({
	id: workIdSchema,
	title: zfd.text(),
	description: zfd.text(z.string().optional()),
	types_ids: zfd.repeatableOfType(zfd.numeric(z.number().positive())),
});
