import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export function globDocs() {
	return import.meta.glob('./**/*.svx|mdx', { eager: true });
}

export const docMetadataSchema = z
	.object({
		title: z.string(),
	})
	.passthrough();

type DocMetadata = z.infer<typeof docMetadataSchema>;

export const docImportSchema = z
	.object({
		metadata: docMetadataSchema,
		default: z.any(),
	})
	.passthrough();

type Doc = DocMetadata & { slug: string; type: string };

export async function getDocs() {
	try {
		const docs: Record<string, Doc[]> = {};
		const paths = globDocs();
		for (const path in paths) {
			const doc = docImportSchema.safeParse(paths[path]);
			if (!doc.success) {
				continue;
			}
			const tail = path.replace('./', '').split('/+page')[0];
			const split = tail.split('/');
			if (split.length !== 2) {
				continue;
			}
			const type = split[0];
			const slug = tail.split('.')[0];
			if (!docs[type]) {
				docs[type] = [];
			}
			docs[type].push({
				...doc.data.metadata,
				slug,
				type,
			});
		}
		return docs;
	} catch (e) {
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
}
