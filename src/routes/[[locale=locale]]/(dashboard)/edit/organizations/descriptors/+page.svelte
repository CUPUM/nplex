<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Gérez les descripteurs universels d',
		},
		en: {
			heading: 'Edit the universal organization descriptors',
		},
	});

	// const descriptors = [
	// 	{
	// 		titleKey: 'types',
	// 		path: '/edit/projects/descriptors/types',
	// 	},
	// 	{
	// 		titleKey: 'interventions',
	// 		path: '/edit/projects/descriptors/interventions',
	// 	},
	// 	{
	// 		titleKey: 'images',
	// 		path: '/edit/projects/descriptors/images',
	// 	},
	// ] satisfies { titleKey: keyof StoresValues<typeof t>; path: string }[];
</script>

<section>
	<h1 class="heading xl">{$t.heading}</h1>
</section>

<style lang="postcss">
	section {
		padding: 2rem;
	}
</style>
