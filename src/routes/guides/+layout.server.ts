import { languageTag } from '$i18n/runtime';
import { guideMetadataSchema } from '$lib/crud/validation/content';
import { z } from 'zod';

export const prerender = 'auto';

export const load = async (event) => {
	const contents = import.meta.glob('$content/guides/**/*.mdx', { eager: true });

	const guides = Object.keys(contents).reduce<
		Array<z.infer<typeof guideMetadataSchema> & { slug: string }>
	>((acc, path) => {
		if (path.endsWith(`${languageTag()}.mdx`)) {
			const slug = path.split('/guides/')[1]?.split('/')[0];
			const metadata = guideMetadataSchema.extend({ slug: z.string() }).parse({
				...(contents[path] as any).metadata,
				slug,
			});
			acc.push(metadata);
		}
		return acc;
	}, []);

	const featured = guides.filter((guide) => guide.sticky);
	return {
		guides,
		featured,
	};
};
