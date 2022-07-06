import toPath from 'element-to-path';
import { readdirSync, readFileSync, writeFile } from 'fs';
import path from 'path';
import prettier from 'prettier';
import { parse, type INode } from 'svgson';
import type { Plugin } from 'vite';

const ICONS_DIR = path.resolve('src', 'utils', 'icons', 'svgs');
const OUTPUT_DIR = path.resolve('src', 'utils', 'icons');
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve('.prettierrc')).toString());
const PATH_TYPES = ['primary', 'secondary'];

/**
 * Parse a given svg's paths and return it normalized, where every non-path svg element (rect, circle, etc.) is
 * converted to a path, returned as arrays of strokes and fills paths' `d` attribute values.
 */
async function extractSvgPaths(svg: INode) {
	const strokes = [];
	const fills = [];

	if (['path', 'rect', 'line', 'polyline', 'polygon', 'circle', 'ellipse'].includes(svg.name)) {
		const d = svg.name === 'path' ? svg.attributes.d : toPath(svg);
		if (svg.attributes.stroke) {
			strokes.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
		} else if (svg.attributes.fill) {
			fills.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
		}
	}
	if (svg.children.length) {
		for await (const child of svg.children) {
			const childPaths = await extractSvgPaths(child);
			strokes.push(...childPaths.strokes);
			fills.push(...childPaths.fills);
		}
	}
	return { strokes, fills };
}

/**
 * Plugin to handle and automate generation of icons' ts definition from svg assets.
 */
export default function generateIconsPlugin(): Plugin[] {
	async function generateIcons() {
		process.stdout.write("Generating icons' definition from provided svg assets...");

		/**
		 * Read files in icons' directory and generate the const value.
		 */
		const promises = readdirSync(ICONS_DIR)
			.filter((f) => path.extname(f).toLocaleLowerCase() === '.svg')
			.map(async (file) => {
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
			const iconsDefinitions = arr.reduce((acc, { name, ...props }) => ({ ...acc, [name]: props }), {});
			writeFile(
				path.resolve(OUTPUT_DIR, 'icons.ts'),
				prettier.format(
					`/**
						* ⚠️ WARNING ⚠️
						*
						* This file was generated from the svg assets found at ./src/utils/icons.
						* All changes added manually here will be lost on next execution of the generator script
						* 
						* Last generated on: ${new Date()}
						*
						* ⚠️ WARNING ⚠️
						*/
						export const icons = ${JSON.stringify(iconsDefinitions)}
					`,
					{ parser: 'babel-ts', ...PRETTIER_CONFIG }
				),
				(err) => {
					if (err) return console.error("Error occured when trying to generate icons' definition.", err);
				}
			);
		});

		if (Boolean(process.stdout.isTTY)) {
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
		} else {
			process.stdout.write('\n');
		}
		process.stdout.write("Successfuly generated new icons' definition :)");
		process.stdout.write('\n');
	}

	return [
		{
			/**
			 * Plugin for dev server reloads and watchers.
			 */
			name: 'generate-icons-dev',
			apply: 'serve',
			configureServer(server) {
				async function listener(abspath) {
					if (
						abspath.startsWith(path.resolve('src', 'utils', 'icons')) &&
						path.extname(abspath).toLocaleLowerCase() === '.svg'
					) {
						generateIcons();
					}
				}
				server.watcher.on('add', listener);
				server.watcher.on('change', listener);
			},
		},
		{
			/**
			 * Plugin for builds.
			 */
			name: 'generate-icons-build',
			apply: 'build',
			async buildStart() {
				try {
					generateIcons();
				} catch (error) {
					console.error('Error occured while trying to generate icons.', error);
				}
			},
		},
	];
}
