import ProjectDescriptorsNav from './ProjectDescriptorsNav.svelte';

export const load = async () => {
	return {
		dashboard: {
			sidebar: ProjectDescriptorsNav,
		},
	};
};
