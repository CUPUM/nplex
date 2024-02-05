<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<article>
	<LangKey>
		<h1 class="h5">Oops! {m.error_details()}</h1>
	</LangKey>
	<code>
		{#if $page.error?.message}
			{$page.error.message}
		{:else}
			<LangKey>{m.error_no_message()}</LangKey>
		{/if}
	</code>
</article>

<style lang="postcss">
	article {
		grid-column: full;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	h1 {
		color: var(--color-error-800);
		:global(:--dark) & {
			color: var(--color-error-300);
		}
	}
</style>
