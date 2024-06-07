<script context="module" lang="ts">
	import { browser } from '$app/environment';
	import {
		MODE_ATTRIBUTE,
		MODE_FALLBACK,
		MODE_SETTINGS,
		type Mode,
		type ModeSetting,
	} from '$lib/modes/constants';
	import { getPersistedMode, persistMode } from '$lib/modes/cookie.client';
	import { onDestroy, untrack } from 'svelte';

	let darkQuery = browser ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
	let preference = $state<Mode>(MODE_FALLBACK);
	let system = $state(false);
	let _mode = $state<Mode>(MODE_FALLBACK);
	let resolved = $derived(system ? preference : _mode);

	export const mode = {
		get setting() {
			return system ? MODE_SETTINGS.SYSTEM : _mode;
		},
		set setting(value: ModeSetting) {
			const isSystem = value === MODE_SETTINGS.SYSTEM;
			system = isSystem;
			_mode = isSystem ? resolved : value;
			persistMode(resolved, system);
			document.documentElement.setAttribute(MODE_ATTRIBUTE, resolved);
		},
		get resolved() {
			return resolved;
		},
	};

	function handleQuery(e: MediaQueryListEvent) {
		preference = e.matches ? MODE_SETTINGS.DARK : MODE_SETTINGS.LIGHT;
		if (system) {
			persistMode(resolved, system);
			document.documentElement.setAttribute(MODE_ATTRIBUTE, resolved);
		}
	}
</script>

<script lang="ts">
	onDestroy(() => {
		darkQuery?.removeEventListener('change', handleQuery);
	});

	$effect.pre(() => {
		untrack(() => {
			preference = darkQuery?.matches ? MODE_SETTINGS.DARK : MODE_SETTINGS.LIGHT;
			const persisted = getPersistedMode(preference);
			system = persisted.system;
			_mode = persisted.mode;
			darkQuery?.addEventListener('change', handleQuery);
		});
	});
</script>
