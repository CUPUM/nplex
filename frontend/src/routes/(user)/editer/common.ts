import type { Category } from '$utils/enums';

export const EDITABLES_HASHES = {
	projects: 'projets-editables',
	organisations: 'organisations-editables',
	actors: 'acteurs-editables',
} satisfies Record<Category, string>;
