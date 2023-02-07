import type { LayoutLoad } from './$types';
import { NAVBAR_MAX_WIDTH } from './Navbar.svelte';

export const load = (async (event) => {
	const { session } = event.data;

	// console.log('Root layout', session);

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNavbar: false,
		showExploreSearchbar: false,
		navbarMaxWidth: NAVBAR_MAX_WIDTH.Default,
	};
}) satisfies LayoutLoad;
