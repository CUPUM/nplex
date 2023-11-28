<!--
	@component
	Until svelte 5 drops and runes allow for reactivity with paraglide's message funcitons.
 -->
<script context="module" lang="ts">
	/**
	 * Inline equivalent of LangKey to reactively trigger translation message updates.
	 */
	export const langKey = derived<typeof lang, <T>(message: T) => T>(
		lang,
		() =>
			<T,>(message: T) => {
				return message;
			}
	);
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { lang } from '$lib/i18n/store';
	import { derived } from 'svelte/store';
</script>

{#key $page.data.lang}
	<slot />
{/key}
