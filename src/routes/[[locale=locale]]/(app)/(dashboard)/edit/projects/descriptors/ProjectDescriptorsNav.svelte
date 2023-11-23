<script lang="ts">
	import Sidebar, { setDashboard } from '$lib/components/Sidebar.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { ArrowRight } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Descripteurs de projet',
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
			heading: 'Project descriptors',
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

<Sidebar>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors/types')}>
		{$t.items.types}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/interventions')}>
		{$t.items.interventions}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/indicators')}>
		{$t.items.indicators}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/ownerships')}>
		{$t.items.ownerships}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/implantations')}>
		{$t.items.implantation}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/levels')}>
		{$t.items.levels}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/images')}>
		{$t.items.images}
	</SidebarItem>
</Sidebar>
<Sidebar>
	<svelte:fragment slot="heading">
		{$t.organizations.heading}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors')}>
		{$t.organizations.button}
		<ArrowRight class="button-icon" />
	</SidebarItem>
</Sidebar>

<style lang="postcss">
</style>
