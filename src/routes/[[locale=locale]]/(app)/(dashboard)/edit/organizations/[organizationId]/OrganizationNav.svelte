<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar, { setDashboard } from '$lib/components/Sidebar.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
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

<Sidebar>
	<svelte:fragment slot="heading">
		{$t.essentials.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}`)}>
		{$t.essentials.general}
	</SidebarItem>
</Sidebar>
<Sidebar>
	<svelte:fragment slot="heading">
		{$t.complementaries.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/members`)}>
		{$t.complementaries.members}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/projects`)}>
		{$t.complementaries.projects}
	</SidebarItem>
</Sidebar>
<Sidebar>
	<svelte:fragment slot="heading">
		{$t.settings.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/sharing`)}>
		{$t.settings.sharing}
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/visibility`)}>
		{$t.settings.visibility}
		<Shield class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/security`)} danger>
		{$t.settings.danger}
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</Sidebar>

<style lang="postcss">
</style>
