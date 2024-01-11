<!--
	@component
	# Lang reactive block
	Required for reactive message updates until svelte 5 drops and runes allow for reactivity with paraglide's message funcitons.
 -->
<script context="module" lang="ts">
	/**
	 * Narrowing reactivity.
	 */
	const key = derived(page, ($p) => $p.data.lang);

	/**
	 * Inline equivalent of LangKey to reactively trigger translation message updates.
	 */
	export const langKey = derived<typeof key, <T>(message: T) => T>(key, () => <T,>(message: T) => {
		return message;
	});
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
</script>

{#key $page.data.lang}
	<slot />
{/key}
