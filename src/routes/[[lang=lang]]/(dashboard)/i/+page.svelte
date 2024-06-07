<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';

	let { data } = $props();
</script>

<coming_soon>
	{@html m.account_home_coming_soon()}
	<a {...linkAttributes('/i/settings')} class="button button-link">
		{m.account_home_coming_soon_button()}
	</a>
</coming_soon>

<style>
	section {
		padding: 2rem;
	}
</style>
