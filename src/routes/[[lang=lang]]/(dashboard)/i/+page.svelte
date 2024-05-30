<script lang="ts">
	import * as m from '$i18n/messages';
	import { link } from '$lib/i18n/location.js';

	export let data;
</script>

<coming_soon>
	{@html m.account_home_coming_soon()}
	<a {...$link('/i/settings')} class="button link inline">
		{m.account_home_coming_soon_button()}
	</a>
</coming_soon>

<style>
	section {
		padding: 2rem;
	}
</style>
