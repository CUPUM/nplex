import OrganizationDescriptorsNav from './OrganizationDescriptorsNav.svelte';

export const load = async () => {
	return {
		dashboard: {
			sidebar: OrganizationDescriptorsNav,
		},
	};
};
