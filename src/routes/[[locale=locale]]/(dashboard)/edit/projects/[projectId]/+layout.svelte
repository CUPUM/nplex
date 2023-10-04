<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	export let data;

	const t = createTranslations({
		fr: {
			general: 'Général',
			gallery: 'Galerie',
			place: 'Lieu',
			settings: 'Paramètres',
		},
		en: {
			general: 'General',
			gallery: 'Gallery',
			place: 'Place',
			settings: 'Settings',
		},
	});
</script>

<article>
	<nav>Some nav</nav>
	<section>
		<slot />
	</section>
</article>

<style lang="scss">
	nav {
	}
</style>
