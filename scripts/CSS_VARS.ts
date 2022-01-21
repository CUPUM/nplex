import { cssColors } from '$utils/colors';
import { cssSizes } from '$utils/sizes';
import { readFileSync, writeFile } from 'fs';
import prettier from 'prettier';
import path from 'path';

/**
 * This script uses the defined ts theme values to pregenerate (aka translate into) the project's root css custom properties.
 * We work this way rather than using dynamically (runtime) generated css to:
 * 1) benefit from css-variables-autocomplete intellisens and,
 * 2) reduce the server's & client's runtime processing hassle.
 */

const OUTPUT_DIR = path.resolve('src');
const OUTPUT_COMMENT = `This file was generated using the script at ./scripts/PARSE_ICONS.ts.
You can easily call this script with 'pnpm cssvars' (or 'pnpm cssvars:watch'
during development for automatic rerun after modifications).
All manual modifications added here will be lost on next execution of the generator script.`;
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve('.prettierrc')).toString());

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
			...PRETTIER_CONFIG
		}
	),
	(err) => {
		if (err) return console.error('Error occured when trying to generate css vars file', err);
	}
);