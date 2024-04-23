<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/location.js';

	export let data;
</script>

<coming_soon>
	<LangKey>{@html m.account_home_coming_soon()}</LangKey>
	<a {...$link('/i/settings')} class="button link inline">
		<LangKey>{m.account_home_coming_soon_button()}</LangKey>
	</a>
</coming_soon>

<style>
	section {
		padding: 2rem;
	}
</style>
