import AccountNav from './AccountNav.svelte';

export const load = async () => {
	return {
		dashboard: {
			sidebar: AccountNav,
		},
	};
};
