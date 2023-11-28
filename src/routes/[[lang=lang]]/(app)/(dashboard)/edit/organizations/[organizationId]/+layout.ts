import OrganizationNav from './OrganizationNav.svelte';

export const load = async (event) => {
	return {
		dashboard: {
			sidebar: OrganizationNav,
		},
		descriptors: event.data.descriptors,
	};
};
