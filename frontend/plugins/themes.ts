import { colord } from 'colord';
import { writeFile } from 'fs';
import { resolve } from 'path';
import prettier from 'prettier';
import type { Plugin } from 'vite';
import { flatten } from '../src/lib/utils/object';
import { themes } from '../src/lib/utils/themes';
import { PRETTIER_CONFIG } from './common';

/**
 * Dictates the shape of exhaustive color theme definitions.
 */
// export type Themes = {
// 	[name: string]: {
// 		[neutral in 'bg' | 'fg']: {
// 			[shade in '000' | '100' | '300' | '500' | '700' | '900']: string;
// 		};
// 	} & {
// 		[color in 'primary' | 'secondary' | 'success' | 'error']: {
// 			[shade in '100' | '300' | '500' | '700' | '900']: string;
// 		};
// 	};
// };
export type Theme = {
	[neutral in 'bg' | 'fg']: {
		[shade in '000' | '100' | '300' | '500' | '700' | '900']: string;
	};
} & {
	[color in 'primary' | 'secondary' | 'success' | 'error']: {
		[shade in '100' | '300' | '500' | '700' | '900']: string;
	};
};

const OUTPUT_FILE = resolve('src', 'lib', 'styles', 'themes.css');
const COMMENT = `/*\n* ⚠️ WARNING ⚠️\n*\n* This file was generated by the styles vite-plugin. All changes added manually here will be lost on next iteration run of plugin's generators.\n*\n* Generated at: ${new Date()}\n*\n* ⚠️ WARNING ⚠️\n*/`;

function fade(color: string) {
	const { r, g, b } = colord(color).toRgb();
	return `${r}, ${g}, ${b}`;
}

function toVars(
	object: object,
	format: (k: string, v: string | number) => [k: string, v: string | number]
) {
	return flatten(object)
		.map(([keys, val]) => {
			const [k, v] = format(keys.join('-'), val);
			return `--${k}: ${v}`;
		})
		.join('; ');
}

/**
 * Get or compose a theme's class name with the plugin's established format.
 */
export function themeClass(themeName: string) {
	return `ui-theme-${themeName}`;
}

/**
 * Pattern for matching theme classes in a className attribute.
 */
export const themeClassPattern = new RegExp(/\bui-theme-.+?\b/, 'gi');

/**
 * Enum-like dictionary to retrieve app theme class names.
 */
export const ThemeClass = createThemeBook(themes);
function createThemeBook<T extends Record<string, Theme>>(themes: T) {
	return Object.fromEntries(Object.keys(themes).map((k) => [k, themeClass(k)])) as Record<
		keyof T,
		string
	>;
}

/**
 * Preprocess a given record of themes and output the corresponding css variables declaration into a
 * global style file.
 */
export default function plugin(): Plugin {
	function writeStyles() {
		try {
			const statements = [
				COMMENT,
				...Object.entries(themes).map(([t, c]) => {
					return `.${themeClass(t)} {
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
		name: 'nplex-themes',
		config() {
			writeStyles();
		},
		buildStart() {
			writeStyles();
		},
	};
}
