<script lang="ts">
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import type { StoresValues } from 'svelte/store';

	const t = createTranslations({
		fr: {
			types: 'Types de projet',
			interventions: 'Interventions',
			images: 'Images',
		},
		en: {
			types: 'Project types',
			interventions: 'Interventions',
			images: 'Images',
		},
	});

	const descriptors = [
		{
			titleKey: 'types',
			path: '/edit/projects/descriptors/types',
		},
		{
			titleKey: 'interventions',
			path: '/edit/projects/descriptors/interventions',
		},
		{
			titleKey: 'images',
			path: '/edit/projects/descriptors/images',
		},
	] satisfies { titleKey: keyof StoresValues<typeof t>; path: string }[];
</script>

<ul>
	{#each descriptors as d}
		<li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a {...$link(d.path)}>{$t[d.titleKey]}</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
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
	}
</style>
