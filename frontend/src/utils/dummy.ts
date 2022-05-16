/**
 * These utils allow for creating dummy entities to help implement the ui.
 */

class Project {
	id: string;
	name: string;
	showcase_image: string;

	constructor() {
		this.id = (Math.random() * 1000).toString(16);
		this.name = `Fiche de projet ${this.id}`;
		this.showcase_image = `https://picsum.photos/seed/${(Math.random() * 1000).toFixed(0)}/1200/800`;
	}
}

export const projects = new Array(10).fill(null).map(p => new Project());