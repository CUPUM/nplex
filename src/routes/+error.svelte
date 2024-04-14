<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<article>
		<h1 class="h5">Oops! {m.error_details()}</h1>
	<code>
		{#if $page.error?.message}
			{$page.error.message}
		{:else}
			{m.error_no_message()}
		{/if}
	</code>
</article>

<style>
</style>
