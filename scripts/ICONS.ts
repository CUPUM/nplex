import { readdirSync, readFileSync, writeFile } from 'fs';
import { parse, INode } from 'svgson';
import prettier from 'prettier';
import toPath from 'element-to-path';
import path from 'path';

/**
 * This script takes the svg files contained in ICONS_DIR, parses them to convert every non-path svg
 * element to a path and creates an `icons.ts` files containing a const declaration with all the
 * processed svg's contents
 */

const ICONS_DIR = path.resolve('src/utils/icons/');
const OUTPUT_COMMENT = `This file was generated from the svg files found in ./src/utils/icons, using ./scripts/PARSE_ICONS.ts, a script that you can call easily with 'pnpm icons' (or 'pnpm icons:watch' for automatic rerun after modifications during development). All changes added manually here will be lost on next execution of the generator script.`;
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve('.prettierrc')).toString());

const svgFiles = readdirSync(ICONS_DIR).filter(
	(f) => path.extname(f).toLocaleLowerCase() === '.svg'
);

async function getSvgPaths(element: INode) {
	const strokes = [];
	const fills = [];
	if (
		['path', 'rect', 'line', 'polyline', 'polygon', 'circle', 'ellipse'].includes(element.name)
	) {
		if (element.name !== 'path') {
			element.attributes.d = toPath(element);
		}
		element.attributes.stroke ?? strokes.push(element.attributes.d);
		element.attributes.fill ?? fills.push(element.attributes.d);
	}
	if (element.children) {
		for await (const child of element.children) {
			const childPaths = await getSvgPaths(child);
			strokes.push(...childPaths.strokes);
			fills.push(...childPaths.fills);
		}
	}
	return { strokes, fills };
}

const promises = svgFiles.map(async (file) => {
	const svg = await parse(readFileSync(path.resolve(ICONS_DIR, file)).toString());
	const name = path.parse(file).name.replace(/\s/g, '-');
	const { width, height, viewBox } = svg.attributes;
	const paths = await getSvgPaths(svg);
	const strokes = paths.strokes.join(' ') // paths.strokes.length ? paths.strokes.join(' ') : null as string;
	const fills = paths.fills.join(' ') // paths.fills.length ? paths.fills.join(' ') : null as string;
	return {
		name,
		width,
		height,
		viewBox,
		strokes,
		fills
	};
});

Promise.all(promises).then((arr) => {
	const iconsDefinitions = {};
	arr.forEach(({name, ...props}) => {
		iconsDefinitions[name] = props
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
				...PRETTIER_CONFIG
			}
		),
		(err) => {
			if (err) return console.error('Error occured when trying to generate icons file', err);
		}
	);
});