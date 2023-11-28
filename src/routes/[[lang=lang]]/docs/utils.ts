import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export function globDocs() {
	return import.meta.glob('./**/!(index).svx|mdx', { eager: true });
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

type Doc = DocMetadata & { slug: string; section: string };

export async function getDocs() {
	try {
		const docs: Record<string, Doc[]> = {};
		const paths = globDocs();
		for (const path in paths) {
			const doc = docImportSchema.safeParse(paths[path]);
			if (!doc.success) {
				continue;
			}
			const trimmed = path.replace('./', '');
			const split = trimmed.split('/');
			if (split.length !== 2) {
				continue;
			}
			const section = split[0];
			const slug = trimmed.split('.')[0];
			if (!docs[section]) {
				docs[section] = [];
			}
			docs[section].push({
				...doc.data.metadata,
				slug,
				section,
			});
		}
		return docs;
	} catch (e) {
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
}

export function globIndexes() {
	return import.meta.glob('./**/index.svx|mdx', { eager: true });
}

export const indexImportSchema = z
	.object({
		default: z.any(),
	})
	.passthrough();

type Index = { section: string };

export async function getIndexes() {
	try {
		const indexes: Record<string, Index> = {};
		const paths = globIndexes();
		for (const path in paths) {
			const index = indexImportSchema.safeParse(paths[path]);
			if (!index.success) {
				continue;
			}
			const section = path.replace('./', '').split('/index')[0];
			indexes[section] = {
				section,
			};
		}
		return indexes;
	} catch (e) {
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
}
