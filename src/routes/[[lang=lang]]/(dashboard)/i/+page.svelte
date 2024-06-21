<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';

	let { data } = $props();
</script>

<article class="h-main-full-height flex flex-col items-center justify-center">
	<div class="leading-lg max-w-sm text-center">
		{@html m.account_home_coming_soon()}
		<a {...linkAttributes('/i/settings')} class="button compact mt-sm">
			{m.account_home_coming_soon_button()}
		</a>
	</div>
</article>
