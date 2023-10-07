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
				types: 'Types d’organisation',
			},
			projects: {
				heading: 'Descripteurs de projet',
				button: 'Projets',
			},
		},
		en: {
			heading: 'Descriptors',
			items: {
				types: 'Organization types',
			},
			projects: {
				heading: 'Project descriptors',
				button: 'Projects',
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
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.projects.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link('/edit/projects/descriptors')}>
		{$t.projects.button}
		<ArrowRight class="button-icon" />
	</DashboardNavItem>
</DashboardNav>

<style lang="postcss">
</style>
