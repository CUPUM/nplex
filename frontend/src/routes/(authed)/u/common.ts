import type { icons } from '$utils/icons';
import { EDITOR_BASE_ROUTE, USER_BASE_ROUTE, type Routes } from '$utils/routes';

function base(pathname: string) {
	return `${USER_BASE_ROUTE.pathname}${pathname}` as const;
}

export const USER_ROUTES = {
	profile: {
		title: 'Compte',
		pathname: base('/compte'),
		icon: 'user',
	},
	notifications: {
		title: 'Notifications',
		pathname: base('/notifications'),
		icon: 'announcement',
	},
	collections: {
		title: 'Collections',
		pathname: base('/collections'),
		icon: 'bookmarks',
	},
	favorites: {
		title: 'Favoris',
		pathname: base('/favoris'),
		icon: 'heart',
	},
	editor: {
		title: 'Éditeur',
		pathname: EDITOR_BASE_ROUTE.pathname,
		icon: 'pen',
	},
} satisfies Routes<{ icon: keyof typeof icons }>;
