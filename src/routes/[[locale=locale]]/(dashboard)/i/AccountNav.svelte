<script lang="ts">
	import { page } from '$app/stores';
	import DashboardNav, { setDashboard } from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { Folders, Home, UserCog2, UserSquare2 } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Mon compte',
			home: 'Mon accueil',
			profile: 'Mon profil',
			collections: 'Collections',
			settings: 'Paramètres',
		},
		en: {
			heading: 'Mon compte',
			home: 'My home',
			profile: 'My profile',
			collections: 'Collections',
			settings: 'Settings',
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

<style lang="postcss">
</style>
