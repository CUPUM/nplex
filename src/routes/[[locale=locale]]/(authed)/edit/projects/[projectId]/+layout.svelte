<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	export let data;

	const t = createTranslations({
		fr: {},
		en: {},
	});
</script>

<article>
	<nav>Some nav</nav>
	<section>
		<slot />
	</section>
</article>

<style lang="scss">
</style>
