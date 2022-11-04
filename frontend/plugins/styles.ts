import { colord } from 'colord';
import { writeFile } from 'fs';
import { resolve } from 'path';
import prettier from 'prettier';
import type { Plugin } from 'vite';
import { px } from '../src/lib/utils/css';
import { themeClassName } from '../src/lib/utils/enums';
import { flatten } from '../src/lib/utils/object';
import { colors, sizes } from '../src/lib/utils/vars';
import { PRETTIER_CONFIG } from './common';

const OUTPUT_FILE = resolve('src', 'lib', 'styles', 'vars.scss');
const COMMENT = `/*\n* ⚠️ WARNING ⚠️\n*\n* This file was generated by the styles vite-plugin. All changes added manually here will be lost on next iteration run of plugin's generators.\n*\n* Generated at: ${new Date()}\n*\n* ⚠️ WARNING ⚠️\n*/`;

function fade(color: string) {
	const { r, g, b } = colord(color).toRgb();
	return `${r}, ${g}, ${b}`;
}

function toVars(object: object, format: (k: string, v: string | number) => [k: string, v: string | number]) {
	return flatten(object)
		.map(([keys, val]) => {
			const [k, v] = format(keys.join('-'), val);
			return `--${k}: ${v}`;
		})
		.join('; ');
}

export default function stylesPlugin(): Plugin {
	function writeStyles() {
		try {
			const statements = [
				COMMENT,
				`:root {
					${toVars(sizes, (k, v) => ['size-' + k, px(v)])}
				}`,
				...Object.entries(colors).map(([t, c]) => {
					return `.${themeClassName(t)} {
						${toVars(c, (k, v) => ['color-' + k, v])};
						${toVars(c, (k, v) => ['rgb-' + k, fade(v + '')])};
					}`;
				}),
			];

			const formatted = prettier.format(statements.join('\n\n'), {
				parser: 'css',
				...PRETTIER_CONFIG,
			});

			writeFile(OUTPUT_FILE, formatted, (error) => {
				if (error) throw error;
				else console.info('Style globals generated successfully');
			});
		} catch (error) {
			console.error('Error generating theme', error);
		}
	}

	return {
		name: 'nplex-styles',
		config() {
			writeStyles();
		},
		buildStart() {
			writeStyles();
		},
	};
}
