<script lang="ts">
	import { page } from '$app/stores';
	import DashboardNav, { setDashboard } from '$lib/components/DashboardNav.svelte';
	import DashboardNavItem from '$lib/components/DashboardNavItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { AlertTriangle, Eye, Users2 } from 'lucide-svelte';

	$: projectId = $page.params.projectId;

	setDashboard();

	const t = createTranslations({
		fr: {
			essentials: {
				heading: 'Essentiels',
				general: 'Général',
				gallery: 'Galerie',
				place: 'Lieu',
				exemplarity: 'Exemplarité',
			},
			complementaries: {
				heading: 'Compléments',
				timeline: 'Calendrier général',
				materials: 'Matériaux',
				contributions: 'Contributions',
			},
			settings: {
				heading: 'Paramètres',
				sharing: 'Partage des permissions',
				visibility: 'Visibilité & diffusion',
				danger: 'Zone à risque',
			},
		},
		en: {
			essentials: {
				heading: 'Essentials',
				general: 'Général',
				gallery: 'Gallery',
				place: 'Place',
				exemplarity: 'Exemplarity',
			},
			complementaries: {
				heading: 'Complementaries',
				timeline: 'Calendrier général',
				materials: 'Materials',
				contributions: 'Contributions',
			},
			settings: {
				heading: 'Settings',
				sharing: 'Sharing & permissions',
				visibility: 'Visibility & publication',
				danger: 'Danger zone',
			},
		},
	});
</script>

<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.essentials.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}`)}>
		{$t.essentials.general}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/place#dashboard-content`)}>
		{$t.essentials.place}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/exemplarity#dashboard-content`)}>
		{$t.essentials.exemplarity}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/gallery#dashboard-content`)}>
		{$t.essentials.gallery}
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.complementaries.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/contributions#dashboard-content`)}>
		{$t.complementaries.contributions}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/materials#dashboard-content`)}>
		{$t.complementaries.materials}
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/timeline#dashboard-content`)}>
		{$t.complementaries.timeline}
	</DashboardNavItem>
</DashboardNav>
<DashboardNav>
	<svelte:fragment slot="heading">
		{$t.settings.heading}
	</svelte:fragment>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/sharing#dashboard-content`)}>
		{$t.settings.sharing}
		<Users2 class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/publishing#dashboard-content`)}>
		{$t.settings.visibility}
		<Eye class="button-icon" />
	</DashboardNavItem>
	<DashboardNavItem {...$link(`/edit/projects/${projectId}/security#dashboard-content`)} danger>
		{$t.settings.danger}
		<AlertTriangle class="button-icon" />
	</DashboardNavItem>
</DashboardNav>

<style lang="postcss">
</style>
