import { getDb } from '$utils/database';
import sharp from 'sharp';
import type { RequestHandler } from './$types';
import { options } from './common';

const MAX_AGE = 600;
const DEFAULT_FORMAT = 'webp';

/**
 * Serves optimized versions of images stored in **public** buckets on Supabase's storage.
 *
 * ! Deprecate (too compute-intensive...) !
 */
export const GET: RequestHandler = async (event) => {
	const db = await getDb(event);
	const url = db.storage.from(event.params.bucket).getPublicUrl(event.params.path).data.publicUrl;
	const file = await event.fetch(url);
	const q = options(event);
	const format = q.getOption('format') ?? event.url.pathname.split('.').pop() ?? DEFAULT_FORMAT;
	const img = await sharp(Buffer.from(await file.arrayBuffer()))
		.resize({
			width: q.getOption('width'),
			height: q.getOption('height'),
			fit: q.getOption('fit'),
			position: q.getOption('position'),
			kernel: q.getOption('kernel'),
			withoutEnlargement: q.getOption('withoutEnlargement'),
			fastShrinkOnLoad: q.getOption('fastShrinkOnLoad'),
		})
		.toFormat(format as any)
		.toBuffer();
	return new Response(img, {
		headers: {
			'content-type': `image/${format}`,
			'cache-control': `max-age: ${MAX_AGE}`,
		},
	});
};
