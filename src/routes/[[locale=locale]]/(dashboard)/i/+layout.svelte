<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Mon compte',
		},
		en: {
			heading: 'My account',
		},
	});
</script>

<article>
	<header>
		<h1 class="heading lg">{$t.heading}</h1>
	</header>
	<slot />
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		border-radius: inherit;
		background-color: var(--dashboard-base-bg);
	}

	header {
		padding: 2rem;
		margin: 1rem;
		border-radius: var(--radius-xs);
	}
</style>
