<script context="module" lang="ts">
	import { browser } from '$app/environment';
	import {
		THEME_ATTRIBUTE,
		THEME_DEFAULT,
		THEME_SETTINGS,
		type Theme,
		type ThemeSetting,
	} from '$lib/theme/constants';
	import { getPersistedTheme, persistTheme } from '$lib/theme/cookie.client';
	import { onDestroy, untrack } from 'svelte';

	let darkQuery = browser ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
	let preference = $state<Theme>(THEME_DEFAULT);
	let system = $state(false);
	let _theme = $state<Theme>(THEME_DEFAULT);
	let resolved = $derived(system ? preference : _theme);

	export const theme = {
		get setting() {
			return system ? THEME_SETTINGS.SYSTEM : _theme;
		},
		set setting(value: ThemeSetting) {
			const isSystem = value === THEME_SETTINGS.SYSTEM;
			system = isSystem;
			_theme = isSystem ? resolved : value;
			persistTheme(resolved, system);
			document.documentElement.setAttribute(THEME_ATTRIBUTE, resolved);
		},
		get resolved() {
			return resolved;
		},
	};

	function handleQuery(e: MediaQueryListEvent) {
		preference = e.matches ? THEME_SETTINGS.DARK : THEME_SETTINGS.LIGHT;
		if (system) {
			persistTheme(resolved, system);
			document.documentElement.setAttribute(THEME_ATTRIBUTE, resolved);
		}
	}
</script>

<script lang="ts">
	onDestroy(() => {
		darkQuery?.removeEventListener('change', handleQuery);
	});

	$effect.pre(() => {
		untrack(() => {
			preference = darkQuery?.matches ? THEME_SETTINGS.DARK : THEME_SETTINGS.LIGHT;
			const persisted = getPersistedTheme(preference);
			system = persisted.system;
			_theme = persisted.theme;
			darkQuery?.addEventListener('change', handleQuery);
		});
	});
</script>
