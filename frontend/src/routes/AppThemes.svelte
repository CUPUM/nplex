<script lang="ts" context="module">
	import { flatten } from '$utils/object';
	import { colord } from 'colord';

	type Theme = {
		[neutral in 'bg' | 'fg']: {
			[shade in '000' | '100' | '300' | '500' | '700' | '900']: string;
		};
	} & {
		[color in 'primary' | 'secondary' | 'success' | 'error']: {
			[shade in '100' | '300' | '500' | '700' | '900']: string;
		};
	};

	const light: Theme = {
		bg: {
			'000': 'hsl(54, 20%, 100%)',
			100: 'hsl(55, 20%, 98%)',
			300: 'hsl(56, 18%, 94%)',
			500: 'hsl(57, 15%, 90%)',
			700: 'hsl(59, 12%, 86%)',
			900: 'hsl(60, 11%, 82%)',
		},
		fg: {
			'000': 'hsl(165, 20%, 0%)',
			100: 'hsl(165, 20%, 7%)',
			300: 'hsl(165, 18%, 11%)',
			500: 'hsl(165,16%, 15%)',
			700: 'hsl(165, 14%, 19%)',
			900: 'hsl(165, 12%, 22%)',
		},
		primary: {
			100: 'hsl(77, 45%, 72%)',
			300: 'hsl(76, 44%, 62%)',
			500: 'hsl(76, 43%, 50%)',
			700: 'hsl(77, 54%, 39%)',
			900: 'hsl(78, 65%, 30%)',
		},
		secondary: {
			100: 'hsl(243, 86%, 81%)',
			300: 'hsl(244, 83%, 77%)',
			500: 'hsl(245, 77%, 72%)',
			700: 'hsl(246, 74%, 66%)',
			900: 'hsl(247, 66%, 58%)',
		},
		success: {
			100: 'hsl(83, 71%, 74%)',
			300: 'hsl(83, 72%, 68%)',
			500: 'hsl(83, 73%, 60%)',
			700: 'hsl(83, 74%, 49%)',
			900: 'hsl(83, 80%, 44%)',
		},
		error: {
			100: 'hsl(5, 90%, 78%)',
			300: 'hsl(5, 85%, 70%)',
			500: 'hsl(5, 80%, 62%)',
			700: 'hsl(5, 74%, 54%)',
			900: 'hsl(5, 70%, 46%)',
		},
	};

	const dark: Theme = {
		bg: {
			'000': 'hsl(204, 20%, 0%)',
			100: 'hsl(203, 19%, 8%)',
			300: 'hsl(202,18%, 11%)',
			500: 'hsl(201,17%, 13%)',
			700: 'hsl(200, 16%, 15%)',
			900: 'hsl(199, 14%, 17%)',
		},
		fg: {
			'000': 'hsl(140, 9%, 86%)',
			100: 'hsl(125, 10%, 90%)',
			300: 'hsl(110, 12%, 93%)',
			500: 'hsl(95, 16%, 95%)',
			700: 'hsl(80, 20%, 98%)',
			900: 'hsl(0, 0%, 100%)',
		},
		primary: {
			100: 'hsl(88, 65%, 30%)',
			300: 'hsl(87, 54%, 39%)',
			500: 'hsl(86, 43%, 50%)',
			700: 'hsl(86, 44%, 62%)',
			900: 'hsl(87, 45%, 72%)',
		},
		secondary: {
			100: 'hsl(247, 66%, 58%)',
			300: 'hsl(246, 74%, 66%)',
			500: 'hsl(245, 77%, 72%)',
			700: 'hsl(244, 83%, 77%)',
			900: 'hsl(243, 86%, 81%)',
		},
		success: {
			100: 'hsl(83, 71%, 74%)',
			300: 'hsl(83, 72%, 68%)',
			500: 'hsl(83, 73%, 60%)',
			700: 'hsl(83, 74%, 49%)',
			900: 'hsl(83, 80%, 44%)',
		},
		error: {
			100: 'hsl(2, 90%, 78%)',
			300: 'hsl(3, 88%, 72%)',
			500: 'hsl(3, 84%, 66%)',
			700: 'hsl(4, 76%, 59%)',
			900: 'hsl(5, 66%, 50%)',
		},
	};

	export const themes = {
		light,
		dark,
	} as const;

	function vars(
		object: Record<string, any>,
		format: (k: string, v: string | number) => [k: string, v: string | number]
	) {
		return flatten(object)
			.map(([keys, val]) => {
				const [k, v] = format(keys.join('-'), val);
				return `--${k}: ${v}`;
			})
			.join('; ');
	}

	function fade(color: string) {
		const { r, g, b } = colord(color).toRgb();
		return `${r}, ${g}, ${b}`;
	}

	function getThemeClass(name: string) {
		return `ui-theme-${name}`;
	}

	/**
	 * Pattern for matching theme classes in a className attribute.
	 */
	export const themeClassPattern = new RegExp(/\bui-theme-.+?\b/, 'gi');

	function composeThemeClasses(themes: Record<string, Theme>) {
		return (
			'<' +
			'style>' +
			Object.entries(themes)
				.map(([t, c]) => {
					return (
						`.${getThemeClass(t)} {` +
						`${vars(c, (k, v) => ['color-' + k, v])};` +
						`${vars(c, (k, v) => ['rgb-' + k, fade(v + '')])};` +
						`}`
					);
				})
				.join(' ') +
			'</' +
			'style>'
		);
	}

	function createThemeBook<T extends Record<string, Theme>>(themes: T) {
		return Object.fromEntries(Object.keys(themes).map((k) => [k, getThemeClass(k)])) as Record<
			keyof T,
			string
		>;
	}

	/**
	 * Enum-like dictionary to retrieve app theme class names.
	 */
	export const ThemeClass = createThemeBook(themes);
</script>

<svelte:head>
	{@html composeThemeClasses(themes)}
</svelte:head>
