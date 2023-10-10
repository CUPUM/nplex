import ProjectHeader from './ProjectHeader.svelte';
import ProjectNav from './ProjectNav.svelte';

export const load = async (event) => {
	return {
		dashboard: {
			sidebar: ProjectNav,
			header: ProjectHeader,
		},
		...event.data,
	};
};
