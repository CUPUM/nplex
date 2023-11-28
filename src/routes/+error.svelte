<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<article>
	<LangKey>
		<h1>Oops! {m.errorDetails()}</h1>
	</LangKey>
	<code>
		{#if $page.error?.message}
			{$page.error.message}
		{:else}
			<LangKey>{m.errorNoMessage()}</LangKey>
		{/if}
	</code>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: flex-start;
		justify-content: center;
		height: 100vh;
	}
</style>
