import DescriptorsNavbar from './DescriptorsNavbar.svelte';

export const load = async () => {
	return {
		dashboard: {
			sidebar: DescriptorsNavbar,
		},
	};
};
