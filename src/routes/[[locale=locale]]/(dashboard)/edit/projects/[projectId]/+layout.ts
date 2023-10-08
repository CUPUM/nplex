import ProjectHeader from './ProjectHeader.svelte';
import ProjectNav from './ProjectNav.svelte';

export const load = async () => {
	return {
		dashboard: {
			sidebar: ProjectNav,
			header: ProjectHeader,
		},
	};
};
