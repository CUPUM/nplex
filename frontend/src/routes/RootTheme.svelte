<!--
	@component
	# Root Theme
	This singleton component manages the theme class applied to the `:root` element of app.html.
	The theme can be updated by the client using the global theme store.
	Percolation of theme updates to the theme cookie can also be enabled/disabled for each use cases.

 -->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { COOKIES } from '$utils/enums';
	import { THEMES, type ThemeName } from '$utils/themes';
	import type { RequestEvent } from '@sveltejs/kit';
	import jscookie from 'js-cookie';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * Use this theme to initialize the first SSR result inside hooks.
	 */
	export let defaultTheme: ThemeName = THEMES.light;

	const COOKIE_LIFETIME = 60 * 60 * 24 * 365;
	const ROOT = browser ? document.documentElement : undefined;

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
		if (!cookie || !(THEMES as any)[cookie]) {
			return defaultTheme;
		}
		return cookie as ThemeName;
	}

	const init = getUserTheme();

	export const rootTheme = (function () {
		const { subscribe, set: _set } = writable(init);
		function set(name: ThemeName, setCookie: boolean = false) {
			if (ROOT) {
				ROOT.setAttribute('data-theme', name);
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

<script lang="ts">
	/**
	 * Set a root theme and reset to default theme following the lifecycle this component's instance.
	 */
	export let theme: ThemeName;

	onMount(() => {
		rootTheme.set(theme);
	});

	onDestroy(() => {
		rootTheme.reset();
	});
</script>
