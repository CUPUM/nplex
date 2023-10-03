<script lang="ts">
	import DashboardNav, { setDashboard } from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { ArrowRight } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Descripteurs',
			items: {
				types: 'Types de projet',
				interventions: 'Intervention',
				indicators: 'Indicateurs d’exemplarité',
				ownerships: 'Propriétaires',
				implantation: 'Modes d’implantation',
				levels: 'Étages de bâtiment',
				images: 'Images',
			},
			organizations: {
				heading: 'Descripteurs d’organisation',
				button: 'Organisations',
			},
		},
		en: {
			heading: 'Descriptors',
			items: {
				types: 'Project types',
				interventions: 'Interventions',
				indicators: 'Exemplarity indicators',
				ownerships: 'Ownerships',
				implantation: 'Implantation modes',
				levels: 'Building levels',
				images: 'Images',
			},
			organizations: {
				heading: 'Organization descriptors',
				button: 'Organizations',
			},
		},
	});
</script>

<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link('/edit/projects/descriptors/types')}>
		{$t.items.types}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/interventions')}>
		{$t.items.interventions}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/indicators')}>
		{$t.items.indicators}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/ownerships')}>
		{$t.items.ownerships}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/implantation')}>
		{$t.items.implantation}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/levels')}>
		{$t.items.levels}
	</DashboardNavItem>
	<DashboardNavItem {...$link('/edit/projects/descriptors/images')}>
		{$t.items.images}
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.organizations.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link('/edit/organizations/descriptors')}>
		{$t.organizations.button}
		<ArrowRight class="button-icon" />
	</DashboardNavItem>
</DashboardNav>

<style lang="scss">
</style>
