<script lang="ts">
	import DashboardNav from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Descripteurs',
			items: {
				types: 'Types de projet',
				interventions: 'Interventions',
				images: 'Images',
			},
			othersHeading: 'Autres',
		},
		en: {
			heading: 'Descriptors',
			items: {
				types: 'Project types',
				interventions: 'Interventions',
				images: 'Images',
			},
			othersHeading: 'Others',
		},
	});

	// const links = [
	// 	{ key: 'types', path: '/edit/projects/descriptors/types' },
	// 	{ key: 'interventions', path: '/edit/projects/descriptors/interventions' },
	// 	{ key: 'images', path: '/edit/projects/descriptors/images' },
	// ] as const satisfies Readonly<(DashboardNavLink & { icon?: ComponentType<Icon> })[]>;
</script>

<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<svelte:fragment slot="items">
		<DashboardNavItem {...$link('/edit/projects/descriptors/types')}>
			{$t.items.types}
		</DashboardNavItem>
		<DashboardNavItem {...$link('/edit/projects/descriptors/interventions')}>
			{$t.items.interventions}
		</DashboardNavItem>
		<DashboardNavItem {...$link('/edit/projects/descriptors/images')}>
			{$t.items.images}
		</DashboardNavItem>
	</svelte:fragment>
</DashboardNav>

<style lang="scss">
</style>
