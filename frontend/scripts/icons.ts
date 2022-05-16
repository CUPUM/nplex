import { readdirSync, readFileSync, writeFile } from 'fs';
import { parse, type INode } from 'svgson';
import prettier from 'prettier';
import toPath from 'element-to-path';
import path from 'path';

/**
 * This script takes the svg files contained in ICONS_DIR, parses them to convert every non-path svg element to a path
 * and creates an `icons.ts` files containing a const declaration with all the processed svg's contents
 */

const ICONS_DIR = path.resolve('src/utils/icons/');
const OUTPUT_COMMENT =
	"This file was generated from the svg files found in ./src/utils/icons, using ./scripts/PARSE_ICONS.ts, a script that you can call easily with 'pnpm icons' (or 'pnpm icons:watch' for automatic rerun after modifications during development). All changes added manually here will be lost on next execution of the generator script.";
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve('.prettierrc')).toString());
const SVG_FILES = readdirSync(ICONS_DIR).filter((f) => path.extname(f).toLocaleLowerCase() === '.svg');
const PATH_TYPES = ['primary', 'secondary'];

async function extractSvgPaths(svg: INode) {
	const strokes = [],
		fills = [];

	if (['path', 'rect', 'line', 'polyline', 'polygon', 'circle', 'ellipse'].includes(svg.name)) {
		const d = svg.name === 'path' ? svg.attributes.d : toPath(svg);
		if (svg.attributes.stroke) {
			strokes.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
		} else if (svg.attributes.fill) {
			fills.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
		}

		// svg.attributes.stroke && strokes[svg.attributes.type || PATH_TYPES[0]].push(d);
		// svg.attributes.fill && fills[svg.attributes.secondary ? 'secondary' : 'primary'].push(d);
	}
	if (svg.children.length) {
		for await (const child of svg.children) {
			const childPaths = await extractSvgPaths(child);
			strokes.push(...childPaths.strokes);
			fills.push(...childPaths.fills);
		}
	}
	// return { strokes: strokes.join(' '), fills: fills.join(' ') };
	return { strokes, fills };
}

/** Read files in icons' directory and generate the js const. */
const promises = SVG_FILES.map(async (file) => {
	const svg = await parse(readFileSync(path.resolve(ICONS_DIR, file)).toString());
	const name = path.parse(file).name.replace(/\s/g, '-');
	const { width, height, viewBox } = svg.attributes;
	const { strokes, fills } = await extractSvgPaths(svg);
	return {
		name,
		width,
		height,
		viewBox,
		strokes,
		fills,
	};
});

Promise.all(promises).then((arr) => {
	const iconsDefinitions = {};
	arr.forEach(({ name, ...props }) => {
		iconsDefinitions[name] = props;
	});
	writeFile(
		path.resolve(ICONS_DIR, 'icons.ts'),
		prettier.format(
			`/**
				* ⚠️ WARNING ⚠️ // prettier-ignore
				* 
				* ${OUTPUT_COMMENT}
				* 
				* ⚠️ WARNING ⚠️ // prettier-ignore
				*/

				export const icons = ${JSON.stringify(iconsDefinitions)}
				`,
			{
				parser: 'babel-ts',
				...PRETTIER_CONFIG,
			}
		),
		(err) => {
			if (err) return console.error('Error occured when trying to generate icons file', err);
		}
	);
});
