<!--
	@component
	This singleton component manages the theme class applied to the `:root` element of the app.html.
	The theme can be updated by the client using the global theme store.
	Percolation of theme updates to the theme cookie can also be enabled/disabled for each use cases.

 -->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { Cookie } from '$utils/enums';
	import jscookie from 'js-cookie';
	import { writable } from 'svelte/store';
	import { ThemeClass, themeClassPattern } from './AppThemes.svelte';

	const COOKIE_LIFETIME = 60 * 60 * 24 * 365;
	export const DEFAULT_THEME: keyof typeof ThemeClass = 'light';

	function updateThemeCookie(name: keyof typeof ThemeClass) {
		if (browser) {
			if (name) {
				jscookie.set(Cookie.Theme, name, {
					path: '/',
					expires: Date.now() + COOKIE_LIFETIME,
				});
			} else {
				jscookie.remove(Cookie.Theme, { path: '/' });
			}
		}
	}

	const root = browser ? (document.querySelector(':root') as HTMLElement) : null;
	// const init = get(page).data.theme;
	let init: keyof typeof ThemeClass = DEFAULT_THEME;
	if (root) {
		const lookup = Object.fromEntries(
			Object.entries(ThemeClass).map(([t, c]) => [c, t as keyof typeof ThemeClass])
		);
		init = lookup[[...root.classList].reverse().find((c) => lookup[c]) ?? DEFAULT_THEME];
	}

	updateThemeCookie(init);

	export const rootTheme = (function () {
		const { subscribe, set: _set } = writable(init);
		function set(name: keyof typeof ThemeClass, cookie: boolean = false) {
			if (root) {
				root.className = root.className.replace(themeClassPattern, '');
				if (name) {
					root.classList.add(ThemeClass[name]);
				}
			}
			if (cookie) {
				updateThemeCookie(name);
			}
			_set(name);
		}
		function reset(cookie: boolean = false) {
			set(init, cookie);
		}
		return {
			subscribe,
			reset,
			set,
		};
	})();
</script>

<!-- <section>
	{#each Object.keys(ThemeClass) as t}
		<label>
			{t}
			<input type="radio" bind:group={$rootTheme} value={t} id="" />
		</label>
	{/each}
</section> -->
