import type { icons } from '$utils/icons';
import { USER_BASE_ROUTE, type Routes } from '$utils/routes';

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
		icon: 'bookmark',
	},
	favorites: {
		title: 'Favoris',
		pathname: base('/favoris'),
		icon: 'bookmark',
	},
} satisfies Routes<{ icon?: keyof typeof icons }>;
