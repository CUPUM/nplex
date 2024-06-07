import { z } from 'zod';

export const projectsSearchSchema = z.object({
	search: z.string().optional(),
});
