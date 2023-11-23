<script lang="ts">
	import Sidebar, { setDashboard } from '$lib/components/Sidebar.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { ArrowRight } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Descripteurs d’organisation',
			items: {
				types: 'Types d’organisation',
			},
			projects: {
				heading: 'Descripteurs de projet',
				button: 'Projets',
			},
		},
		en: {
			heading: 'Organization descriptors',
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

<Sidebar>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors/types')}>
		{$t.items.types}
	</SidebarItem>
</Sidebar>
<Sidebar>
	<svelte:fragment slot="heading">
		{$t.projects.heading}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors')}>
		{$t.projects.button}
		<ArrowRight class="button-icon" />
	</SidebarItem>
</Sidebar>

<style lang="postcss">
</style>
