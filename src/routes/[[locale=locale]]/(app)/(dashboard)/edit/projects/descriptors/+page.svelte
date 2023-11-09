<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Éditez les descripteurs universels de projet',
			// types: 'Types de projet',
			// interventions: 'Interventions',
			// images: 'Images',
		},
		en: {
			heading: "Edit the platform's universal project descriptors",
			// types: 'Project types',
			// interventions: 'Interventions',
			// images: 'Images',
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

	/* ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding: 2rem;
	}

	li {
		padding: 2rem;
		border-radius: var(--radius-sm);
		border: var(--base-border-size) solid
			color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
	} */
</style>
