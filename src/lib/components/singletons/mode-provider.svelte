<script context="module" lang="ts">
	import { browser } from '$app/environment';

	let setting = $state<ModeSetting>(MODE_SETTINGS.SYSTEM);
	let preference = $state<Mode>();

	export const mode = {
		get setting() {
			return setting;
		},
		set setting(value: ModeSetting) {
			persistMode(value);
			document.documentElement.setAttribute(MODE_SETTING_ATTRIBUTE, value);
			setting = value;
		},
		get resolved() {
			return setting === MODE_SETTINGS.SYSTEM ? preference : setting;
		},
	};

	function handleQuery(e: MediaQueryListEvent) {
		preference = e.matches ? MODE_SETTINGS.LIGHT : MODE_SETTINGS.DARK;
	}

	let query = browser ? window.matchMedia('(prefers-color-scheme: light)') : undefined;
</script>

<script lang="ts">
	import {
		MODE_SETTINGS,
		MODE_SETTING_ATTRIBUTE,
		type Mode,
		type ModeSetting,
	} from '$lib/modes/constants';
	import { getPersistedMode, persistMode } from '$lib/modes/cookie';
	import { onDestroy, untrack } from 'svelte';

	onDestroy(() => {
		query?.removeEventListener('change', handleQuery);
	});

	$effect.pre(() => {
		untrack(() => {
			preference = query?.matches ? MODE_SETTINGS.LIGHT : MODE_SETTINGS.DARK;
			query?.addEventListener('change', handleQuery);
			setting = getPersistedMode();
		});
	});
</script>
