import { z } from 'zod';

export const docMetadataSchema = z
	.object({
		title: z.string(),
	})
	.passthrough();

export type DocMetadata = z.infer<typeof docMetadataSchema>;

export const docImportSchema = z
	.object({
		metadata: docMetadataSchema,
		default: z
			.object({
				render: z.function(),
			})
			.passthrough(),
	})
	.passthrough();
