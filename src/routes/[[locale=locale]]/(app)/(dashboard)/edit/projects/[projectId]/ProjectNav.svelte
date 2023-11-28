<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { DASHBOARD_MAIN_ID } from '$lib/components/Dashboard.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { AlertTriangle, Eye, Users2 } from 'lucide-svelte';

	$: projectId = $page.params.projectId;
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_essentials()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}`)}>
		<LangKey>{m.project_general()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/place#${DASHBOARD_MAIN_ID}`)} aria-disabled>
		<LangKey>{m.project_place()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/exemplarity#${DASHBOARD_MAIN_ID}`)}>
		<LangKey>{m.project_examplarity()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/gallery#${DASHBOARD_MAIN_ID}`)}>
		<LangKey>{m.project_gallery()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_complements()}</LangKey>
	</svelte:fragment>
	<SidebarItem
		{...$link(`/edit/projects/${projectId}/contributions#${DASHBOARD_MAIN_ID}`)}
		aria-disabled
	>
		<LangKey>{m.project_contributions()}</LangKey>
	</SidebarItem>
	<SidebarItem
		{...$link(`/edit/projects/${projectId}/materials#${DASHBOARD_MAIN_ID}`)}
		aria-disabled
	>
		<LangKey>{m.project_materials()}</LangKey>
	</SidebarItem>
	<SidebarItem
		{...$link(`/edit/projects/${projectId}/timeline#${DASHBOARD_MAIN_ID}`)}
		aria-disabled
	>
		<LangKey>{m.project_timeline()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_settings()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/sharing#${DASHBOARD_MAIN_ID}`)} aria-disabled>
		<LangKey>{m.project_sharing()}</LangKey>
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem
		{...$link(`/edit/projects/${projectId}/publishing#${DASHBOARD_MAIN_ID}`)}
		aria-disabled
	>
		<LangKey>{m.project_visibility()}</LangKey>
		<Eye class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/security#${DASHBOARD_MAIN_ID}`)} danger>
		<LangKey>{m.project_dangerZone()}</LangKey>
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
