import { persistWritable } from '$utils/persist';
import { LocalStorage } from '$utils/values/keys';

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
