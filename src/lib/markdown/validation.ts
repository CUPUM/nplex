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

export const headingsMetadataSchema = z.object({ headings: headingsSchema });
