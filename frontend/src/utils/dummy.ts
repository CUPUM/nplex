import { randomPoint } from '@turf/random';

/**
 * This utility class allows for generating dummy project entities to help implement the ui.
 */
export class Project {
	id: string;
	creation_date: Date;
	name: string;
	description: Promise<string>;
	geometry: any;
	showcase_image: ReturnType<typeof prepareImage>;
	gallery: ReturnType<typeof prepareImage>[];
	cost_bracket: ReturnType<typeof generateCostBracket>;

	constructor(id: string) {
		/**
		 * Project id.
		 */
		this.id = id;
		this.creation_date = new Date(Date.now() - Math.random() * 360000);
		/**
		 * Give it some random name.
		 */
		this.name = `Fiche de projet ${this.id}`;
		/**
		 * Give it a main description text (tbd: markdown or html)
		 */
		this.description = fetch('https://jaspervdj.be/lorem-markdownum/markdown.txt?no-code=on').then((res) =>
			res.json()
		);
		/**
		 * Generate a random geometry, here a point with a randomized radius.
		 */
		this.geometry = randomPoint(1, {
			bbox: [-73.5452, 45.4687, -73.6811, 45.5486],
		}).features[0];
		this.geometry.properties.radius = Math.round(Math.random() * 500 + 120);
		/**
		 * Define a main image.
		 */
		this.showcase_image = prepareImage(generateId());
		/**
		 * Define an image gallery that includes the main image.
		 */
		this.gallery = Array(Math.round(Math.random() * 8 + 2))
			.fill(null)
			.map(() => prepareImage(generateId()))
			.concat(this.showcase_image);
		/**
		 * Define an arbitrary cost bracket.
		 */
		this.cost_bracket = generateCostBracket();
	}
}

/**
 * Generate random image and description.
 */
function prepareImage(id: string) {
	const url = `https://picsum.photos/seed/${id}/600/800`;
	const description = fetch('loripsum.net/api/1/short/plaintext').then((res) => res.json());
	return {
		url,
		description,
	};
}

/**
 * Generate a random id.
 */
function generateId() {
	return (Math.random() * 10000).toString(16);
}

/**
 * Generate a cost bracket.
 */
function generateCostBracket() {
	const min = Math.round(Math.random() * 100) * 30 + 1000;
	const max = min + Math.round(Math.random() * 50) * 20 + 1500;
	return {
		min,
		max,
	};
}
