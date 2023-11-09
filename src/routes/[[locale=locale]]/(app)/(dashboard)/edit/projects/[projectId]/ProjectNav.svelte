<script lang="ts">
	import { page } from '$app/stores';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { AlertTriangle, Eye, Users2 } from 'lucide-svelte';

	$: projectId = $page.params.projectId;

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

<SidebarGroup>
	<svelte:fragment slot="heading">
		{$t.essentials.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}`)}>
		{$t.essentials.general}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/place#dashboard-content`)} aria-disabled>
		{$t.essentials.place}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/exemplarity#dashboard-content`)}>
		{$t.essentials.exemplarity}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/gallery#dashboard-content`)}>
		{$t.essentials.gallery}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{$t.complementaries.heading}
	</svelte:fragment>
	<SidebarItem
		{...$link(`/edit/projects/${projectId}/contributions#dashboard-content`)}
		aria-disabled
	>
		{$t.complementaries.contributions}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/materials#dashboard-content`)} aria-disabled>
		{$t.complementaries.materials}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/timeline#dashboard-content`)} aria-disabled>
		{$t.complementaries.timeline}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{$t.settings.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/sharing#dashboard-content`)} aria-disabled>
		{$t.settings.sharing}
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/publishing#dashboard-content`)} aria-disabled>
		{$t.settings.visibility}
		<Eye class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/security#dashboard-content`)} danger>
		{$t.settings.danger}
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
