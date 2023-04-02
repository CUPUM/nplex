import { defineContext } from '$utils/context';
import { col } from '$utils/css';
import { pgCubeToHsl } from '$utils/format';
import { colord } from 'colord';
import type { PageData } from './$types';

export function makeProjectPalette(project: PageData['project']) {
	return project.gallery.flatMap((img) => [
		{
			id: img.id,
			type: 'average',
			color: colord(pgCubeToHsl(img.color_average_hsl)),
		} as const,
		{
			id: img.id,
			type: 'dominant',
			color: colord(pgCubeToHsl(img.color_dominant_hsl)),
		} as const,
	]);
}

export function getBannerColors(project: PageData['project']) {
	return {
		average: colord(pgCubeToHsl(project.banner?.color_average_hsl ?? col('bg', 500))),
		dominant: colord(pgCubeToHsl(project.banner?.color_dominant_hsl ?? col('bg', 700))),
	};
}

export function getBgColor(project: PageData['project']) {
	const source = colord(project.banner?.color_dominant_hsl ?? col('bg', 300));
	return source.lighten(0.9 - source.brightness());
}

export const [getProjectContext, setProjectContext] = defineContext<
	PageData['project'] & {
		palette: ReturnType<typeof makeProjectPalette>;
		bannerColors: ReturnType<typeof getBannerColors>;
		bgColor: ReturnType<typeof getBgColor>;
	}
>('project-context');
