import { colors } from '$utils/colors';
import { sizes } from '$utils/sizes';
import { readFileSync, writeFile } from 'fs';
import convert from 'color-convert';
import prettier from 'prettier';
import path from 'path';

/**
 * This script uses the defined ts theme values to pregenerate (aka translate into) the project's root css custom
 * properties. We work this way rather than using dynamically (runtime) generated css to:
 *
 * 1. Benefit from css-variables-autocomplete intellisens and,
 * 2. Reduce the server's & client's runtime processing hassle.
 */

const OUTPUT_DIR = path.resolve('src', 'styles');
const OUTPUT_COMMENT = `This file was generated using the script at ./scripts/PARSE_ICONS.ts.
You can easily call this script with 'pnpm cssvars' (or 'pnpm cssvars:watch'
during development for automatic rerun after modifications).
All manual modifications added here will be lost on next execution of the generator script.`;
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve('.prettierrc')).toString());

const cssSizes =
	Object.entries(sizes)
		.map(([name, val]) => `--size-${name}: ${val}px`)
		.join('; ') + '; ';

const cssColors =
	Object.entries(colors)
		.map(([group, shades]) =>
			Object.entries(shades).map(
				([shade, def]) =>
					`--color-${group}-${shade}: ${def}; ` +
					`--rgb-${group}-${shade}: ${Object.values(extractColorComponents(def)).join(', ')}`
			)
		)
		.reduce((accumulated, current) => [...accumulated, ...current])
		.join('; ') + '; ';

function extractColorComponents(colorString: string) {
	let matched;
	/* rgb */
	matched = colorString
		.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
		?.slice(1)
		?.map((comp) => parseInt(comp, 10));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	/* hsl */
	matched = colorString.match(/^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\s*\)$/i)?.slice(1);
	if (matched) {
		matched.length = 3;
		const rgb = convert.hsl.rgb(
			matched.map((v, i) => (i === 0 ? v : v.indexOf('%') > -1 ? parseInt(v) : parseFloat(v) * 100))
		);
		// return { h: parseInt(matched[0]), s: matched[1], l: matched[2] };
		return { r: rgb[0], g: rgb[1], b: rgb[2] };
	}
	/* hex */
	matched = colorString
		.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
		?.slice(1)
		?.map((comp) => parseInt(comp, 16));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	matched = colorString
		.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
		?.slice(1)
		?.map((comp) => 0x11 * parseInt(comp, 16));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	throw new Error('No valid matching format found for provided colorString');
}

writeFile(
	path.resolve(OUTPUT_DIR, 'vars.css'),
	prettier.format(
		`/* ⚠️ WARNING ⚠️ */

			/* ${OUTPUT_COMMENT} */
			
			/* ⚠️ WARNING ⚠️ */

			:root {
				${cssColors}
				${cssSizes}
			}`,
		{
			parser: 'css',
			...PRETTIER_CONFIG,
		}
	),
	(err) => {
		if (err) return console.error('Error occured when trying to generate css vars file', err);
	}
);
