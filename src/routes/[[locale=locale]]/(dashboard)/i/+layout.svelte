<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { composeMeshgradient } from '$lib/utils/mesh-gradient';

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
	<header style:background={composeMeshgradient({ opacity: [0.25, 0.5], nodes: [5, 7] })}>
		<h1 class="heading lg">{$t.heading}</h1>
	</header>
	<slot />
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	header {
		padding: 2rem;
		margin: 1rem;
		border-radius: var(--radius-xl);
	}
</style>
