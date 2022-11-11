import { paramCase } from 'change-case';
// @ts-ignore:next-line
import toPath from 'element-to-path';
import { readdirSync, readFileSync, writeFile } from 'fs';
import { extname, parse, resolve } from 'path';
import prettier from 'prettier';
import { parse as parseSvg, type INode } from 'svgson';
import type { Plugin } from 'vite';
import { PRETTIER_CONFIG } from './common';

const OUTPUT_FILE = resolve('src', 'lib', 'utils', 'icons.ts');
const SOURCE_DIR = resolve('.', 'icons');
const SVG_PATH_TYPES = ['primary', 'secondary'] as const;
const COMMENT = `/*\n* ⚠️ WARNING ⚠️\n*\n* This file was generated by the icons vite-plugin. All changes added manually here will be lost on next iteration run of plugin's generators.\n*\n* Generated at: ${new Date()}\n*\n* ⚠️ WARNING ⚠️\n*/`;

/**
 * Parse a given svg's paths and return it normalized, where every non-path svg element (rect, circle, etc.) is
 * converted to a path, returned as arrays of strokes and fills paths' `d` attribute values.
 */
function extractSvgPaths(svg: INode) {
	const paths: {
		d: string;
		type: keyof typeof SVG_PATH_TYPES;
		fill: boolean;
		stroke: boolean;
	}[] = [];

	if (['path', 'rect', 'line', 'polyline', 'polygon', 'circle', 'ellipse'].includes(svg.name)) {
		const d = svg.name === 'path' ? svg.attributes.d : toPath(svg);
		paths.push({
			d,
			type: (svg.attributes.type as keyof typeof SVG_PATH_TYPES) ?? 'primary',
			fill: !!svg.attributes.fill,
			stroke: !!svg.attributes.stroke,
		});
	}
	if (svg.children.length) {
		for (const child of svg.children) {
			paths.push(...extractSvgPaths(child));
		}
	}
	return paths;
}

/**
 * Plugin to handle and automate generation of icons' ts definition from svg assets.
 */
export default function iconsPlugin(): Plugin {
	async function writeIcons() {
		try {
			const promises = readdirSync(SOURCE_DIR)
				.filter((f) => extname(f).toLocaleLowerCase() === '.svg')
				.map(async (fname) => {
					const svg = await parseSvg(readFileSync(resolve(SOURCE_DIR, fname)).toString());
					const name = paramCase(parse(fname).name);
					const { width, height, viewBox } = svg.attributes;
					const paths = extractSvgPaths(svg);
					return {
						name,
						width,
						height,
						viewBox,
						paths,
					};
				});

			const parsed = (await Promise.all(promises)).reduce(
				(acc, { name, ...props }) => ({ ...acc, [name]: props }),
				{}
			);

			const statements = [COMMENT, `export const icons = ${JSON.stringify(parsed)}`];

			const formatted = prettier.format(statements.join('\n\n'), {
				parser: 'typescript',
				...PRETTIER_CONFIG,
			});

			writeFile(OUTPUT_FILE, formatted, (error) => {
				if (error) throw error;
				else console.info('Successfully generated new icons from svg assets!');
			});
		} catch (error) {
			console.error('Error generating new icons', error);
		}
	}

	return {
		name: 'nplex-icons',
		configureServer(server) {
			async function watch(abspath: string) {
				const isSvgIcon = abspath.startsWith(SOURCE_DIR) && extname(abspath).toLocaleLowerCase() === '.svg';
				if (isSvgIcon || abspath === __filename) {
					writeIcons();
				}
			}
			server.watcher.on('add', watch);
			server.watcher.on('change', watch);
		},
		buildStart: {
			async handler() {
				writeIcons();
			},
		},
	};
}
