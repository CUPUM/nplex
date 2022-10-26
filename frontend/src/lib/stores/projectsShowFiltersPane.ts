import { LocalStorage } from '$utils/keys';
import { persistWritable } from '$utils/persist';

/**
 * Global state of the projects' fitlers drawer.
 */
export const projectsShowFiltersPane = (() => {
	const { subscribe, set, update } = persistWritable<boolean>(LocalStorage.ProjectsFiltersExplorePane, false);

	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();
