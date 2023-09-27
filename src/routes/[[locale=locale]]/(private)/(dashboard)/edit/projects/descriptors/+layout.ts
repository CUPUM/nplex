import DescriptorsNavbar from './DescriptorsNavbar.svelte';

export const load = async (event) => {
	return {
		dashboard: {
			sidebar: DescriptorsNavbar,
		},
	};
};
