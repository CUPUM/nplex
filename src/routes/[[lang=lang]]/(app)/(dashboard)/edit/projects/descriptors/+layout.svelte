<script lang="ts">
	import { page } from '$app/stores';
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import { get, writable } from 'svelte/store';
	import type { Snapshot } from './$types';
	import { setEditorLangCtx } from './common';

	const langCtx = writable($page.data.lang);
	setEditorLangCtx(langCtx);

	export const snapshot: Snapshot<AvailableLanguageTag> = {
		capture: () => get(langCtx),
		restore(snapshot) {
			langCtx.set(snapshot);
		},
	};
</script>

<slot />
