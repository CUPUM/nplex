import type { Routes } from '$utils/routes';

export const AUTHED_ROUTES = {
	User: {
		pathname: '/u',
		title: "Ma page d'accueil",
	},
	Editor: {
		pathname: '/editer',
		title: 'Éditeur',
	},
} satisfies Routes;
