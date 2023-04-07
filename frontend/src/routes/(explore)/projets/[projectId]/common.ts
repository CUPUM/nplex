import type Icon from '$components/Icon.svelte';
import { defineContext } from '$utils/context';
import { col } from '$utils/css';
import { pgCubeToHsl } from '$utils/format';
import { THEME_PALETTES } from '$utils/themes';
import { colord } from 'colord';
import type { ComponentProps } from 'svelte';
import type { PageData } from './$types';

export const galleryLayouts = [
	{
		layout: 'grid',
		title: 'Grille',
		icon: 'view-masonry-vertical',
	},
	{
		layout: 'list',
		title: 'Liste',
		icon: 'view-list-horizontal',
	},
] as const satisfies readonly {
	layout: string;
	title: string;
	icon: ComponentProps<Icon>['name'];
}[];

type ProjectSection = {
	title: string;
	shortTitle: string;
	hash: string;
	children?: ProjectSection[];
};

export const projectSections = [
	{
		title: 'Présentation du projet',
		shortTitle: 'Présentation',
		hash: 'presentation',
	},
	{
		title: 'Description technique',
		shortTitle: 'Description technique',
		hash: 'description-technique',
	},
	{
		title: 'Indicateurs d’exemplarité',
		shortTitle: 'Exemplarité',
		hash: 'exemplarite',
	},
] satisfies ProjectSection[];

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
	const source = colord(
		project.banner ? pgCubeToHsl(project.banner?.color_dominant_hsl) : THEME_PALETTES.light.bg[300]
	);
	return source.lighten(0.85 - source.brightness()).saturate(0.05 - source.toHsl().s);
}

export const [getProjectContext, setProjectContext] = defineContext<
	PageData['project'] & {
		palette: ReturnType<typeof makeProjectPalette>;
		bannerColors: ReturnType<typeof getBannerColors>;
		bgColor: ReturnType<typeof getBgColor>;
	}
>('project-context');
