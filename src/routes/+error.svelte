<script lang="ts">
	import { page } from '$app/stores';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			title: 'Oops, une petite erreur est survenue!',
			noError: 'Aucun message d’erreur.',
		},
		en: {
			title: 'Oops, a small error occurred!',
			noError: 'No error message.',
		},
	});
</script>

<article>
	<h1>{$t.title}</h1>
	<code>
		{$page.error?.message ?? $t.noError}
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
