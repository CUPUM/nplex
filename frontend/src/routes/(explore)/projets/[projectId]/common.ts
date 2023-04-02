import { defineContext } from '$utils/context';
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

export const [getProjectContext, setProjectContext] = defineContext<
	PageData['project'] & { palette: ReturnType<typeof makeProjectPalette> }
>('project-context');
