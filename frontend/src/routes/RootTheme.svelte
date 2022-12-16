<!--
	@component
	This singleton component manages the theme class applied to the `:root` element of the app.html.
	The theme can be updated by the client using the global theme store.
	Percolation of theme updates to the theme cookie can also be enabled/disabled for each use cases.

 -->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { themeClassPattern } from '$plugins/themes/utils';
	import { COOKIES } from '$utils/enums';
	import { THEME_CLASSES } from '$utils/themes';
	import type { RequestEvent } from '@sveltejs/kit';
	import jscookie from 'js-cookie';
	import { writable } from 'svelte/store';

	type ThemeName = keyof typeof THEME_CLASSES;

	const COOKIE_LIFETIME = 60 * 60 * 24 * 365;
	const ROOT = browser ? (document.querySelector(':root') as HTMLElement) : undefined;

	/**
	 * Use this theme to initialize the first SSR result inside hooks.
	 */
	export const DEFAULT_THEME: ThemeName = 'LIGHT' as const;

	function setUserTheme(name: ThemeName | null) {
		if (browser) {
			if (name) {
				jscookie.set(COOKIES.THEME, name, {
					path: '/',
					expires: Date.now() + COOKIE_LIFETIME,
				});
			} else {
				jscookie.remove(COOKIES.THEME, { path: '/' });
			}
		}
	}

	export function getUserTheme(event?: RequestEvent) {
		const cookie = event
			? event.cookies.get(COOKIES.THEME)
			: browser
			? jscookie.get(COOKIES.THEME)
			: undefined;
		if (!cookie || !(THEME_CLASSES as any)[cookie]) {
			return DEFAULT_THEME;
		}
		return cookie as ThemeName;
	}

	const init = getUserTheme();

	export const rootTheme = (function () {
		const { subscribe, set: _set } = writable(init);
		function set(name: ThemeName, setCookie: boolean = false) {
			if (ROOT) {
				ROOT.className = ROOT.className.replace(themeClassPattern, '');
				if (name) {
					ROOT.classList.add(THEME_CLASSES[name]);
				}
			}
			if (setCookie) {
				setUserTheme(name);
			}
			_set(name);
		}
		function reset(setCookie: boolean = false) {
			set(init, setCookie);
		}
		return {
			subscribe,
			reset,
			set,
		};
	})();
</script>
