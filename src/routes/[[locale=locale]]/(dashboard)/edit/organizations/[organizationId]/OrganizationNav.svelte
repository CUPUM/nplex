<script lang="ts">
	import { page } from '$app/stores';
	import DashboardNav, { setDashboard } from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { AlertTriangle, Shield, Users2 } from 'lucide-svelte';

	$: orgId = $page.params.organizationId;

	setDashboard();

	const t = createTranslations({
		fr: {
			essentials: {
				heading: 'Essentiels',
				general: 'Général',
			},
			complementaries: {
				heading: 'Compléments',
				members: 'Membres',
				projects: 'Projets',
			},
			settings: {
				heading: 'Paramètres',
				sharing: 'Partage des permissions',
				visibility: 'Visibilité et diffusion',
				danger: 'Zone à risque',
			},
		},
		en: {
			essentials: {
				heading: 'Essentials',
				general: 'Général',
			},
			complementaries: {
				heading: 'Complementaries',
				members: 'Members',
				projects: 'Projects',
			},
			settings: {
				heading: 'Settings',
				sharing: 'Partage des permissions',
				visibility: 'Visibilité et diffusion',
				danger: 'Danger zone',
			},
		},
	});
</script>

<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.essentials.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}`)}>
		{$t.essentials.general}
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.complementaries.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}/members`)}>
		{$t.complementaries.members}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}/projects`)}>
		{$t.complementaries.projects}
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.settings.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}/sharing`)}>
		{$t.settings.sharing}
		<Users2 class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}/visibility`)}>
		{$t.settings.visibility}
		<Shield class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/organizations/${orgId}/security`)} danger>
		{$t.settings.danger}
		<AlertTriangle class="button-icon" />
	</DashboardNavItem>
</DashboardNav>

<style lang="postcss">
</style>
