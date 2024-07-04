import { z } from 'zod';

const headingBaseSchema = z.object({
	id: z.string(),
	depth: z.number().min(1).max(6),
	value: z.string(),
});

type Heading = z.infer<typeof headingBaseSchema> & {
	children?: Heading[];
};

const headingsSchema: z.ZodType<Heading[]> = headingBaseSchema
	.extend({
		children: z.lazy(() => headingsSchema).optional(),
	})
	.array();

const headingsMetadataSchema = z.object({ headings: headingsSchema });

export const aboutMetadataSchema = z.object({
	title: z.string(),
});

export const guideMetadataSchema = headingsMetadataSchema.extend({
	title: z.string(),
	summary: z.string().optional(),
	sticky: z.boolean().optional(),
	published: z.string().pipe(z.coerce.date()).optional(),
});
