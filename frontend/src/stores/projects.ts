import { randomPoint } from '@turf/random';
import { readable, writable } from 'svelte/store';

/*
 * Projects UI and general purpose data stores
 */

/**
 * Enums used to describe and filter projects. These include controled and enumerated lists from the database.
 */
export const projectsEnums = readable(null, function start(set) {
	async function setEnums() {
		const res = await fetch('/api/projects/lists.json');
		const lists = await res.json();
		set(lists);
	}
	setEnums();

	return function stop() {};
});

/**
 * Store for managing the filters' states.
 */
interface ProjectsFilter {
	expanded: boolean;
	[key: string]: any;
}

export const projectsFilters = (function () {
	const { subscribe, update, set } = writable<ProjectsFilter[]>(null);
})();

/**
 * Array of projects fetched from the database.
 */
export interface Project {
	id: string;
	title: string;
	image_url: string;
	geometry?: any;
}

export const projects = writable<Project[]>();

projects.set(
	Array(12)
		.fill(null)
		.map((_) => {
			const id = Math.round(Math.random() * 10000).toString(16);
			const point = randomPoint(1, {
				bbox: [-73.5452, 45.4687, -73.6811, 45.5486],
			}).features[0];
			point.properties.radius = Math.round(Math.random() * 500 + 120);
			console.log(point);
			return {
				id,
				title: 'Nom du projet ' + id,
				image_url: `https://picsum.photos/seed/${id}/600/800`,
				geometry: point,
			};
		})
);
