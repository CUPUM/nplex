<script lang="ts">
	import * as m from '$i18n/messages';
	import ComingSoon from '$lib/components/ComingSoon.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';

	export let data;
</script>

<ComingSoon>
	<LangKey>{@html m.account_home_comingSoon()}</LangKey>
	<a {...$link('/i/settings')} class="button link compact">
		<LangKey>{m.account_home_comingSoonButton()}</LangKey>
	</a>
</ComingSoon>

<style lang="postcss">
	section {
		padding: 2rem;
	}
</style>
