<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR } from '$lib/i18n/constants';
</script>

<!-- <form method="POST" action="/?/locale" use:enhanceLocale>
	{#each LOCALES_ARR as l}
		<button name={LOCALE_INPUT_NAME} type="submit" value={l}>{LOCALES_DETAILS[l].name}</button>
	{/each}
</form> -->

<nav>
	{#each LOCALES_ARR as l}
		<a href={$page.url.pathname.replace($page.params.locale, l)}>{l}</a>
	{/each}
</nav>

<!-- <p>{intl.formatNumber(20)}</p> -->

<style lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		gap: var(--space-xs);
	}

	a {
		padding: var(--space-sm);
		background: var(--color-light-600);
		border-radius: var(--radius-md);
	}
</style>
