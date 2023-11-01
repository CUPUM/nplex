<script lang="ts">
	import { page } from '$app/stores';
	import DashboardNav, { setDashboard } from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { ArrowRight, Folders, Home, UserCog2, UserSquare2 } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Mon compte',
			home: 'Mon accueil',
			profile: 'Mon profil',
			collections: 'Collections',
			settings: 'Paramètres',
			editor: {
				heading: 'Éditeur',
				projects: 'Projets',
				organizations: 'Organisations',
			},
		},
		en: {
			heading: 'Mon compte',
			home: 'My home',
			profile: 'My profile',
			collections: 'Collections',
			settings: 'Settings',
			editor: {
				heading: 'Editor',
				projects: 'Projects',
				organizations: 'Organizations',
			},
		},
	});
</script>

<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/i`)}>
		{$t.home}<Home class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/users/${$page.data?.user?.id}`)}>
		{$t.profile}<UserSquare2 class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/i/collections`)}>
		{$t.collections}<Folders class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/i/settings`)} danger>
		{$t.settings}
		<UserCog2 class="button-icon" />
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.editor.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/projects`)}>
		{$t.editor.projects}
		<ArrowRight class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/organizations`)}>
		{$t.editor.organizations}
		<ArrowRight class="button-icon" />
	</DashboardNavItem>
</DashboardNav>

<style lang="postcss">
</style>
